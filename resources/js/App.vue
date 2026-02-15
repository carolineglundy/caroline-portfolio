<script setup>
// IMPORTING COMPONENTS (The "Classes")
import Navbar from './components/Common/Navbar.vue'
import ExperienceTimeline from './components/WorkExperience/ExperienceContainr.vue'
import Footer from './components/Common/Footer.vue'
import ProfileSection from './components/Profile/ProfileContainer.vue'
import References from './components/WorkExperience/References.vue'
import BookReviewsPage from './components/BookRec/BookRecContainer.vue'
import EducationTimeline from './components/Education/EducationContainer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#E6E6D4] font-sans text-gray-900 pb-20 overflow-x-hidden">
    <div class="max-w-5xl mx-auto px-4 py-10 min-w-0 w-full">

      <Navbar class="mb-8" />

        <ProfileSection />

      <section id="work-experience">
        <ExperienceTimeline />
      </section>

       <References />

      <section id="education">
        <EducationTimeline />
      </section>

      <section id="book-recommendations">
        <BookReviewsPage />
      </section>

      <Footer />

    </div>
  </div>
</template>

<style>
/* Lock scroll when nav dropdown is open. No 100vh (avoids mobile chrome issues). scrollbar-gutter on html reserves space. */
body.nav-menu-open {
  overflow: hidden !important;
  touch-action: none;
}
</style>
