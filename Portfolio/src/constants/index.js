import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  python,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  avian,
  chatbot,
  girlscript,
  carrent,
  jobit,
  tripguide,
  classroom,
  threejs,
} from "../assests";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Database Engineer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Python",
    icon: python,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Avian Experience",
    icon: avian,
    iconBg: "#383E56",
    date: "January 2023 - September 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Maintain and update website content on a periodic basis. Builds, designs, and maintains content management websites and applications. Hands-on experience with dynamic and mobile-responsive Web.",
    ],
  },
  {
    title: "Python Developer",
    company_name: "Vision-chatbot",
    icon: chatbot,
    iconBg: "#E6DEDD",
    date: "April 2022 - December 2022",
    points: [
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Monitored performance and conveyed constructive feedback. Defined, planned, and implemented development projects.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Girl Script Foundation",
    icon: girlscript,
    iconBg: "#383E56",
    date: "August 2021 - February 2022",
    points: [
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Created pages for the website called Alumini Connect using HTML, CSS, and JavaSCript and React. Hands-on experience in using Git and GitHub effectively for collabration and version control. Contributed in real wrold open-source projects.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Ayush proved me wrong.",
    name: "Krish Patel",
    designation: "Operation Head",
    company: " Swiss Pack",
    image:
      "https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw=",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Ayush does.",
    name: "Vedang Bhatt",
    designation: "Manager",
    company: "Sai automotive",
    image:
      "https://media.istockphoto.com/id/1430286027/photo/information-technology-businessman-working-on-computer-in-office-for-digital-app-software.webp?b=1&s=170667a&w=0&k=20&c=YFwXXbAFfDtX7-2iNcbH6N-ttS3CcnMt7rlUlwIXZ2g=",
  },
  {
    testimonial:
      "After Ayush optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Ulka Patel",
    designation: "Project Manager",
    company: "Sailord",
    image:
      "https://media.istockphoto.com/id/1396146741/photo/businesswoman-in-las-condes-santiago-de-chile.webp?b=1&s=170667a&w=0&k=20&c=7VjWQk433JtCZ9Sv-h1ZF3i4OSuB9xhB-n54CPOwLdA=",
  },
  {
    testimonial:
      "I wanted to thank you for your hard work and dedication to the team. Your leadership and ability to constantly push the bar motivates the entire department and doesn’t go unnoticed.",
    name: "Srushti Patel",
    designation: "Team Lead",
    company: "Axon Technologies",
    image:
      "https://media.istockphoto.com/id/1369508766/photo/beautiful-successful-latin-woman-smiling.jpg?s=1024x1024&w=is&k=20&c=AzqHGt31gTv2CY9bF0VGinj49Nuld3YpEDInC2V7R9k=",
  },
];

const projects = [
  {
    name: "Google Classroom",
    description:
      "Formulated APIs and Designed database for backend functionality of Google classroom using Nodejs,ExpressJs and GraphQL.Implemented JWT token for verification and giving permission for role of teachers and students.",
    tags: [
      {
        name: "NodeJs",
        color: "blue-text-gradient",
      },
      {
        name: "ExpressJs",
        color: "green-text-gradient",
      },
      {
        name: "GraphQL",
        color: "pink-text-gradient",
      },
    ],
    image: classroom,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
