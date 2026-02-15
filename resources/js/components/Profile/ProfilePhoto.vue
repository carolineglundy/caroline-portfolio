<script setup>
import profileImg from '../../../images/closeProfilePhoto.jpg';
</script>

<template>
  <div class="border-[4px] border-black bg-[#D9C5A3] p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] inline-block w-full">

    <div class="border-[3px] border-black bg-white relative overflow-hidden aspect-square">
      <div class="absolute inset-0 z-10 opacity-30 pointer-events-none"
           style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 4px 4px;">
      </div>

      <img
        :src="profileImg"
        alt="Caroline"
        class="w-full h-full object-cover grayscale sepia contrast-125"
      />
    </div>

    <div class="text-center mt-4 italic font-black text-[11px] leading-tight tracking-tight uppercase">
      Pronouns: She/Her
    </div>
  </div>
</template>
