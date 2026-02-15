import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import axios from 'axios';
import BasicCard from '../../../../resources/js/components/Common/BasicCard.vue';

vi.mock('axios');

function factory(props = {}, overrides = {}) {
  const defaults = {
    props: {
      id: 1,
      title: 'Test Role',
      subtitle: 'Test Company',
      details: ['Point one', 'Point two'],
      ...props,
    },
    ...overrides,
  };
  return mount(BasicCard, defaults);
}

describe('BasicCard', () => {
  beforeEach(() => {
    vi.mocked(axios.post).mockResolvedValue({});
    vi.mocked(axios.delete).mockResolvedValue({});
  });

  describe('rendering', () => {
    it('renders title, subtitle, and details from props', () => {
      const wrapper = factory();
      expect(wrapper.find('h3').text()).toBe('Test Role');
      expect(wrapper.text()).toContain('Test Company');
      expect(wrapper.text()).toContain('Point one');
      expect(wrapper.text()).toContain('Point two');
      wrapper.unmount();
    });
  });

  describe('flip behavior', () => {
    it('toggles to back face when card is clicked and shows details', async () => {
      const wrapper = factory();
      const card = wrapper.find('.relative.w-full.h-full');
      await card.trigger('click');
      expect(wrapper.find('.rotate-y-180').exists()).toBe(true);
      expect(wrapper.text()).toContain('Point one');
      wrapper.unmount();
    });
  });

  describe('emits', () => {
    it('emits remove with id when remove button is clicked and isBook is true', async () => {
      const wrapper = factory({ isBook: true, id: 42, rating: 5 });
      await wrapper.find('.relative.w-full.h-full').trigger('click');
      const removeBtn = wrapper.find('button.text-orange-500');
      await removeBtn.trigger('click');
      expect(wrapper.emitted('remove')).toHaveLength(1);
      expect(wrapper.emitted('remove')[0]).toEqual([42]);
      wrapper.unmount();
    });
  });

  describe('add comment (API)', () => {
    it('posts comment, emits refresh, and clears input when POST is clicked', async () => {
      const wrapper = factory({ isBook: true, id: 5, rating: 4, comments: [] });
      await wrapper.find('.relative.w-full.h-full').trigger('click');
      const input = wrapper.find('input[placeholder="ADD A THOUGHT..."]');
      await input.setValue('My comment');
      const postBtn = wrapper.find('button.bg-orange-500');
      await postBtn.trigger('click');
      expect(axios.post).toHaveBeenCalledWith('/api/comments', { book_id: 5, comment: 'My comment' });
      expect(wrapper.emitted('refresh')).toHaveLength(1);
      expect(input.element.value).toBe('');
      wrapper.unmount();
    });
  });
});
