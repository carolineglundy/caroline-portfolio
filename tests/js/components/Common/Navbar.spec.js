import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '../../../../resources/js/components/Common/Navbar.vue';

function factory() {
  return mount(Navbar);
}

describe('Navbar', () => {
  beforeEach(() => {
    document.body.classList.remove('nav-menu-open');
  });

  afterEach(() => {
    document.body.classList.remove('nav-menu-open');
  });

  describe('rendering', () => {
    it('renders with dropdown closed and hamburger has aria-expanded false', () => {
      const wrapper = factory();
      const button = wrapper.find('button[aria-label="Open section menu"]');
      expect(button.attributes('aria-expanded')).toBe('false');
      const dropdown = wrapper.find('.nav-dropdown-container').findAll('a');
      expect(dropdown).toHaveLength(3);
      wrapper.unmount();
    });
  });

  describe('dropdown toggle', () => {
    it('opens dropdown and adds nav-menu-open to body when hamburger is clicked', async () => {
      const wrapper = factory();
      const button = wrapper.find('button[aria-label="Open section menu"]');
      await button.trigger('click');
      expect(button.attributes('aria-expanded')).toBe('true');
      expect(document.body.classList.contains('nav-menu-open')).toBe(true);
      wrapper.unmount();
    });
  });

  describe('section navigation', () => {
    it('closes dropdown and scrolls to section when a nav section link is clicked', async () => {
      const scrollIntoViewMock = vi.fn();
      document.getElementById = vi.fn((id) =>
        id === 'work-experience' ? { scrollIntoView: scrollIntoViewMock } : null
      );
      const wrapper = factory();
      const button = wrapper.find('button[aria-label="Open section menu"]');
      await button.trigger('click');
      expect(document.body.classList.contains('nav-menu-open')).toBe(true);
      const workLink = wrapper.find('a[href="#work-experience"]');
      await workLink.trigger('click');
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
      expect(document.body.classList.contains('nav-menu-open')).toBe(false);
      wrapper.unmount();
    });
  });

  describe('cleanup', () => {
    it('removes nav-menu-open from body when component is unmounted', async () => {
      const wrapper = factory();
      const button = wrapper.find('button[aria-label="Open section menu"]');
      await button.trigger('click');
      expect(document.body.classList.contains('nav-menu-open')).toBe(true);
      wrapper.unmount();
      expect(document.body.classList.contains('nav-menu-open')).toBe(false);
    });
  });
});
