<script setup>
import BasicCard from '../Common/BasicCard.vue'
import vizientLogo from '../../../images/vizientLogo.jpg';
import tpLogo from '../../../images/tpLogo.jpg';
import codefiLogo from '../../../images/codefiLogo.jpg';

const experiences = [
  {
    year: '2024 - Present',
    logo: tpLogo,
    title: 'Full-Stack Engineer',
    company: 'Trainingpeaks',
    website: 'https://www.trainingpeaks.com',
    details: [
    'Build and maintain full-stack features across the ecommerce and billing platform using C# /.NET, React, Tailwind CSS, and AWS, ensuring reliability and scalability in production environments.',
    'Conceptualised and architected a custom integration tool connecting the payments platform to the core web app. Intuitive features like this led the platform to over $1,000,000 USD in total transactions in the first year post beta.',
    'Excel in implementing rapid promotion solutions, including a recent 90-days free opt-out trial targeted at former subscribers. This initiative successfully re-engaged over 100 high-value users at a critical quarter deadline.',
    'Resolved complex billing challenges for a global audience, including pre-billing logic and scheduled subscription start dates, while managing the full lifecycle of subscriptions for millions of users through Stripe, Zuora, and Braintree.',
    'Boosted checkout conversion by 15% through A/B testing with Eppo, experimenting with express payment options (Apple Pay, Google Pay), layout optimisations, promo code UX changes, and promotion dialog variations.',
    ]
  },
  {
    year: '2022 - 2024',
    logo: vizientLogo,
    title: 'Software Engineer',
    company: 'Vizient',
    website: 'https://www.vizientinc.com/',
    details: [
    'Optimised a high scale categorization system serving 90% of U.S. hospital groups, leveraging Laravel and Vue.js to improve API response times and deliver enterprise grade features.',
    'Engineered the front end integration of a custom LLM categorization engine, architecting reactive Vue.js components to transform unstructured AI-generated insights into readable data for hospital administrators.',
    'Coordinated production deployments, enhanced change request execution with the Azure Portal, and achieved $442,000 yearly savings using CI/CD pipelines.',
    'Managed complex data mapping between back-end Laravel services and AI-driven categorization outputs, ensuring 100% accuracy in the presentation of mission-critical healthcare supply chain information.',
    ]
  },
  {
    year: '2023 - 2023',
    logo: codefiLogo,
    title: 'Coding Coach',
    company: 'Codefi Code Labs Bootcamp',
    website: 'https://codefiworks.com/',
    details: [
    'Facilitated interactive coding exercises and projects, involving HTML, CSS, Javascript/Typescript and Angular promoting hands-on learning and practical web development.',
    ]
  }
]
</script>

<template>
  <div class="mt-12 mb-24 max-w-6xl mx-auto min-w-0 w-full px-4 sm:px-6">
    <h2 class="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16 italic underline decoration-orange-500 decoration-8 break-words min-w-0">
      Work Experience
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
      <BasicCard
        v-for="(exp, index) in experiences"
        :key="index"
        :year="exp.year"
        :logo="exp.logo"
        :title="exp.title"
        :subtitle="exp.company"
        :website="exp.website"
        :details="exp.details"
      />
    </div>
  </div>
</template>
