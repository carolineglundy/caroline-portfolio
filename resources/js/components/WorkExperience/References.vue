<script setup>
import { ref } from 'vue'
import toddPhoto from '../../../images/Todd_C.jpg';
import zackPhoto from '../../../images/Zack_A.jpg';
import annaPhoto from '../../../images/Anna_B.jpg';
const activeIndex = ref(0)

const testimonials = [
  {
    name: "Todd Chrissis",
    role: "Director of Software Engineering",
    company: "Vizient",
    linkedin: "https://www.linkedin.com/in/tchrissis/",
    quote: "Doesn't shy away from a challenge.",
    content: [
      "I have had the privilege of managing Caroline for the last couple of years and have gotten to see her grow in her role from an Associate Software Engineer to Staff level. She has become a full stack developer who doesn’t shy away from a challenge.",
      "Caroline’s calm demeanor and technical skills allow her to fit in on any team I put her on. She has grown from a mentee to a mentor in just a few short years. I’m thrilled I’ve had the opportunity to work with and get to know Caroline. She’s been a wonderful asset for multiple projects here at Vizient."
    ],
    image: toddPhoto
  },
  {
    name: "Zack Amis",
    role: "Lead Engineer",
    company: "Vizient",
    linkedin: "https://www.linkedin.com/in/zack-amis-87587817b/",
    quote: "I want a full team of people like her.",
    content: [
      "I had the privilege of watching Caroline transition from new associate to a full fledged staff level engineer. She consistently demonstrated a willingness to learn, an ability to find solutions, humbleness to ask for help when appropriate, and was always enjoyable to work with. As a team lead, I want a full team of people like her, and disappointed that she is no longer with my team.",
    ],
    image: zackPhoto
  },
  {
    name: "Anna Benefiel",
    role: "Senior Product Manager",
    company: "Vizient",
    linkedin: "https://www.linkedin.com/in/anna-benefiel/",
    quote: "Earning recognitions and a promotion for the quality of her work.",
    content: [
      "Caroline has been a high performing software developer at Vizient, earning recognitions and a promotion for the quality of her work and many contributions to her team. Wherever Caroline works in the future, she will find a way to add value and solve problems creatively. Along with her heads down productive nature, Caroline gets along well with all of her colleagues. Any company would be lucky to hire her."
    ],
    image: annaPhoto
  }
]
</script>

<template>
  <div class="my-24 max-w-4xl mx-auto min-w-0 w-full">
    <div class="bg-orange-400 border-[4px] border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">

      <div class="relative z-10">
        <p class="italic font-bold text-sm mb-4">"{{ testimonials[activeIndex].quote }}"</p>

        <div class="mb-8 max-w-3xl space-y-4">
          <p v-for="(paragraph, pIndex) in testimonials[activeIndex].content" :key="pIndex"
             class="text-xl md:text-2xl font-black leading-tight text-black">
            {{ paragraph }}
          </p>
        </div>

        <div class="mb-8 border-t-2 border-black/30 pt-4">
          <div class="flex items-center gap-2 mb-1">
      <p class="font-black uppercase text-sm leading-none">
        {{ testimonials[activeIndex].name }}
      </p>

      <a
        :href="testimonials[activeIndex].linkedin"
        target="_blank"
        class="bg-black text-white p-1 hover:bg-white hover:text-[#0077b5] transition-colors border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
        aria-label="View LinkedIn Profile"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>
    </div>
          <p class="mt-1 font-bold text-xs uppercase opacity-80 leading-tight">
            {{ testimonials[activeIndex].role }}
          </p>
          <p class="font-black text-xs uppercase text-white mt-1">
            {{ testimonials[activeIndex].company }}
          </p>
        </div>

        <div class="flex gap-4">
          <div v-for="(person, index) in testimonials" :key="index" @click="activeIndex = index"
               class="cursor-pointer transition-all duration-300 border-2 border-black overflow-hidden w-14 h-14"
               :class="[activeIndex === index ? 'scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'opacity-40 grayscale']">
            <img :src="person.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 right-0 w-8 h-8 bg-black"></div>
    </div>
  </div>
</template>
