<script setup>
import ProfilePhoto from './ProfilePhoto.vue'
import ProfileBio from './ProfileBio.vue'
import SkillsBox from '../WorkExperience/SkillsBox.vue'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-center">

    <div class="flex justify-center items-center">
      <ProfilePhoto /> </div>
      <ProfileBio />
  </div>

  <SkillsBox />
</template>
