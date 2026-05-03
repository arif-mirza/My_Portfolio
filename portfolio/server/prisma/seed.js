require("dotenv").config({ path: "../.env" });
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// ─── Seed Data (migrated from static DB files) ───────────────

const projects = [
  {
    title: "ApplyMate: AI-Powered Auto Job Applicator",
    description:
      "Engineered a sophisticated Chrome extension that automates the job application process across LinkedIn and other major platforms. Built with advanced DOM manipulation techniques to interact with complex web structures and integrated AI algorithms to intelligently match user profiles with job requirements, significantly reducing application time.",
    tech: "JavaScript (ES6+), Chrome Extension API, DOM Manipulation, AI Integration, CSS3/Tailwind, Node.js, Web Scraping",
    githubUrl: "https://github.com/arif-mirza/ApplyMate",
    liveUrl: "https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar&hl=en-US",
    featured: true,
    type: "FEATURED",
    order: 1,
  },
  {
    title: "Full Stack Resume Analyzer with AI Integration",
    description:
      "Developed a full-stack Resume Analyzer web application that leverages AI to evaluate and score resumes based on job descriptions. Implemented features for users to upload resumes, receive instant feedback, and improve their applications using advanced AI algorithms.",
    tech: "HTML5, Tailwind CSS, React-JS, Context-API, Express.js, AOS, ReadPDF, OpenAI, Mongodb, Authentication",
    githubUrl: "https://github.com/arif-mirza/Resumex_Frontend",
    liveUrl: "https://mjresumex.vercel.app/",
    featured: true,
    type: "FEATURED",
    order: 2,
  },
  {
    title: "NexaVibe Full Stack Social Media Web Application",
    description:
      "Developed a full-stack social media web application enabling users to create profiles, share posts, and connect with others. Implemented features such as real-time updates, user authentication, and interactive UI for an engaging user experience.",
    tech: "HTML5, Tailwind CSS, React-JS, Context-API, Express.js, AOS, JWT, OpenAI, Mongodb, Authentication",
    githubUrl: "https://github.com/arif-mirza/",
    liveUrl: "https://nexxavibe.netlify.app/",
    featured: true,
    type: "FEATURED",
    order: 3,
  },
  {
    title: "Full Stack Classroom Notes Web Application",
    description:
      "Developed a classroom notes web application enabling users to view shared notes, create private notes, and allowing teachers to communicate effectively by posting messages directly within the app.",
    tech: "HTML5, CSS3, Material UI, React-JS, Context-API, YUP, AOS, Redux-Toolkit, Firebase, Authentication",
    githubUrl: "https://github.com/arif-mirza/Hackathons",
    liveUrl: "https://nexxavibe.web.app/",
    featured: true,
    type: "FEATURED",
    order: 4,
  },
  {
    title: "Full Stack eCommerce Store",
    description:
      "Developed a responsive e-commerce store with React and Redux Toolkit, offering a sleek design, intuitive navigation, and a seamless user shopping experience.",
    tech: "HTML5, CSS3, Bootstrap5, React-JS, Context-API, YUP, AOS, Redux-Toolkit, Firebase",
    githubUrl: "https://github.com/arif-mirza/WMD-B7-2024/tree/main/Assignment-14/social-media-app",
    liveUrl: "https://mjcollection.netlify.app/",
    featured: true,
    type: "FEATURED",
    order: 5,
  },
];

const works = [
  {
    title: "Full Stack E-Commerce Mobile App Frontend",
    info: "E-commerce mobile app with user registration, product catalog, cart, wishlist, checkout, payment, order tracking, and admin dashboard.",
    tech: "JavaScript, React-Native, Redux, Context-API, Native-Base, Node-JS, Express JS, Mongodb",
    githubUrl: "www.github.com",
    order: 1,
  },
  {
    title: "Full Stack Expense Tracker Mobile Application",
    info: "Manages data, handles business logic, and provides APIs for frontend interactions, including user authentication, product management, and search functionality.",
    tech: "Javascript, Node-JS, Express-JS, MongoDB (Aggregation, populate), React Native Cli",
    liveUrl: "mjsalarytracker.surge.sh",
    order: 2,
  },
  {
    title: "Registration Form",
    info: "Organize tasks, beautiful design, and track progress with a user-friendly interface for efficient forms.",
    tech: "React, Vite, Yup Validation, React Toastify",
    githubUrl: "https://github.com/arif-mirza/WMD-B7-2024/tree/main/Assignment-10/registration_form",
    order: 3,
  },
  {
    title: "Scientific Calculator",
    info: "Versatile calculator with arithmetic operations, backspace, and clear functionality, designed for seamless calculations.",
    tech: "HTML, CSS, Bootstrap5, Javascript",
    githubUrl: "https://github.com/arif-mirza/WMD-B7-2024",
    liveUrl: "mj-scientific-calculator.surge.sh",
    order: 4,
  },
  {
    title: "Quiz Application",
    info: "Developed an interactive quiz application with a user-friendly interface, supporting various question formats and real-time score tracking, ensuring an engaging learning experience.",
    tech: "Javascript, Node-JS, Express-JS, MongoDB",
    githubUrl: "https://github.com/arif-mirza/Javascript-Projects/tree/main/Project%209/Quiz%20App",
    order: 5,
  },
  {
    title: "Cryptocurrency Rate Tracker",
    info: "Built a dynamic cryptocurrency website allowing users to monitor real-time coin rates, analyze trends, and stay updated with the latest market data effortlessly.",
    tech: "HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, CoinGecko API, Axios, Bootstrap, Git, GitHub",
    githubUrl: "https://github.com/arif-mirza/Javascript-Projects/tree/main/project%204/crypto-rate%20website",
    order: 6,
  },
];

const experiences = [
  {
    label: "Software Developer Intern",
    title: "Software Developer Intern",
    companyName: "Sitenative Solutions",
    companyUrl: "https://sitenative.com/",
    duration: "2 Month Internship",
    description: `<li><span class='fw-bold'>Team-Based Project Development:</span> Collaborated with a development team to build a real-world web platform, gaining practical experience in teamwork, code collaboration, and project planning.</li>
<li><span class='fw-bold'>LayoffProof.ai Project:</span> Contributed to the development of <a href="https://layoffproof.ai/" target="_blank" rel="noopener noreferrer"><span class='span-link'>LayoffProof.ai</span></a> platform, a tool designed to help professionals enhance their career stability through AI-powered insights and resources.</li>
<li><span class='fw-bold'>Practical Development Experience:</span> Worked on implementing features, debugging issues, and improving the functionality of the platform while following modern development practices.</li>`,
    order: 1,
  },
  {
    label: "ICodeGuru",
    title: "Programming Student & Community Member",
    companyName: "iCodeGuru",
    companyUrl: "https://icode.guru/",
    duration: "2024 - Present",
    description: `<li><span class='fw-bold'>Collaborative Learning:</span> Participating in international programming community where I collaborate with global students and developers to improve problem-solving and coding skills.</li>
<li><span class='fw-bold'>Programming Practice and Challenges:</span> Regularly practicing coding problems, algorithms, and logical challenges to strengthen programming fundamentals and analytical thinking.</li>
<li><span class='fw-bold'>Team-Based Learning Environment:</span> Working with international teams, sharing knowledge, discussing solutions, and learning modern programming approaches through community sessions.</li>`,
    order: 2,
  },
  {
    label: "SMIT",
    title: "Web and Mobile Application Development",
    companyName: "SMIT",
    companyUrl: "",
    duration: "Dec 2024 - completed",
    description: `<li><span class="fw-bold">Comprehensive Training in Web Development:</span> Acquired skills in HTML, CSS, JavaScript, and modern front-end frameworks like React, enabling the creation of responsive and dynamic web applications.</li>
<li><span class="fw-bold">Mobile Application Development Expertise:</span> Learned to develop cross-platform mobile applications using React Native, focusing on user-friendly interfaces and seamless performance.</li>
<li><span class="fw-bold">Back-End Development Skills:</span> Gained experience in server-side technologies such as Node.js and Express.js, including database integration and API development.</li>
<li><span class="fw-bold">Project-Based Learning:</span> Completed hands-on projects that demonstrate proficiency in both web and mobile application development, showcasing the ability to deliver full-stack solutions.</li>
<br/>
<h5 class="skill-name fw-bold">Courses</h5>
<ul class="tab-list-02" style="color: #9fa2ab; padding-left: 1.5rem;">
  <li>Web Development</li>
  <li>Mobile Application Development</li>
</ul>`,
    order: 3,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // ── Upsert Admin User ─────────────────────────────────────
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@1234", 12);

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "arifmirza3332@gmail.com" },
    update: {},
    create: {
      name: process.env.ADMIN_NAME || "Muhammad Arif Mirza",
      email: process.env.ADMIN_EMAIL || "arifmirza3332@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user created/found: ${admin.email}`);

  // ── Seed Projects ──────────────────────────────────────────
  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.title.substring(0, 8) }, // pseudo — see note below
      update: project,
      create: project,
    });
  }

  // Simple approach: delete & recreate to avoid complex upsert logic
  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: projects });
  console.log(`✅ Seeded ${projects.length} projects`);

  // ── Seed Works ─────────────────────────────────────────────
  await prisma.work.deleteMany();
  await prisma.work.createMany({ data: works });
  console.log(`✅ Seeded ${works.length} works`);

  // ── Seed Experiences ───────────────────────────────────────
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({ data: experiences });
  console.log(`✅ Seeded ${experiences.length} experiences`);

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
