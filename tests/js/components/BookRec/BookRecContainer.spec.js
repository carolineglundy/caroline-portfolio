import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import BookRecContainer from '../../../../resources/js/components/BookRec/BookRecContainer.vue';

vi.mock('axios');

function factory() {
  return mount(BookRecContainer);
}

describe('BookRecContainer', () => {
  beforeEach(() => {
    vi.mocked(axios.post).mockReset();
  });

  describe('rendering', () => {
    it('renders the form and disables submit button when input is empty', () => {
      const wrapper = factory();
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('input').attributes('placeholder')).toContain('Project Hail Mary');
      const btn = wrapper.find('button[type="submit"]');
      expect(btn.attributes('disabled')).toBeDefined();
      expect(btn.text()).toBe('Get recommendations');
      wrapper.unmount();
    });
  });

  describe('submit validation', () => {
    it('does not call API when form is submitted with empty input', async () => {
      const wrapper = factory();
      await wrapper.find('form').trigger('submit.prevent');
      expect(axios.post).not.toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('API success', () => {
    it('displays recommendations with correct Unity Books link href on successful response', async () => {
      vi.mocked(axios.post).mockResolvedValue({
        data: {
          recommendations: [
            { title: 'The Martian', author: 'Andy Weir' },
          ],
        },
      });
      const wrapper = factory();
      await wrapper.find('input').setValue('Project Hail Mary');
      await wrapper.find('form').trigger('submit.prevent');
      await vi.waitFor(() => {
        expect(wrapper.text()).toContain('The Martian');
        expect(wrapper.text()).toContain('Andy Weir');
      });
      const link = wrapper.find('a[href*="unitybooks.co.nz"]');
      expect(link.attributes('href')).toContain(encodeURIComponent('The Martian'));
      wrapper.unmount();
    });
  });

  describe('API error', () => {
    it('shows error message and re-enables submit button after API failure', async () => {
      vi.mocked(axios.post).mockRejectedValue(new Error('Network error'));
      const wrapper = factory();
      await wrapper.find('input').setValue('Some book');
      await wrapper.find('form').trigger('submit.prevent');
      await vi.waitFor(() => {
        expect(wrapper.find('p.font-semibold').text()).toBeTruthy();
        expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
      });
      wrapper.unmount();
    });



    it('displays fallback recommendations and backend error when API returns 200 with error + recommendations', async () => {
      vi.mocked(axios.post).mockResolvedValue({
        data: {
          recommendations: [
            { title: 'Dune', author: 'Frank Herbert' },
            { title: "The Hitchhiker's Guide to the Galaxy", author: 'Douglas Adams' },
          ],
          error: 'Recommendation limit reached. Here are some picks to try.',
        },
      });
      const wrapper = factory();
      await wrapper.find('input').setValue('Some book');
      await wrapper.find('form').trigger('submit.prevent');
      await vi.waitFor(() => {
        expect(wrapper.text()).toContain('Dune');
        expect(wrapper.text()).toContain('Frank Herbert');
        expect(wrapper.text()).toContain('Recommendation limit reached. Here are some picks to try.');
      });
      const link = wrapper.find('a[href*="unitybooks.co.nz"]');
      expect(link.attributes('href')).toContain(encodeURIComponent('Dune'));
      wrapper.unmount();
    });
  });
});
