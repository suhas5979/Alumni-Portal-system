
const illustration = {
  animated: true // set to false to use static SVG
};

const greeting = {
  username: "Suhas S Suryavanshi",
  title: "Hi all, I'm Suhas",
  subTitle:
    "A Full Stack Software Developer | Android Developer.",
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/drakosi99",
  // linkedin: "https://www.linkedin.com/in/",
  gmail: "contact@davidrakosi.com",
  // gitlab: "https://gitlab.com/",
  // facebook: "https://www.facebook.com/",
  medium: "https://medium.com/@davidrakosi",
  stackoverflow: "https://stackoverflow.com/users/13263979/drakosi",
  instagram: 'https://www.instagram.com/davidrakosi/',
  twitter: 'https://twitter.com/davidrakosi_',
  display: true // Set true to display this section, defaults to false
};


// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "GOVERNMENT COLLEGE OF ENGINEERING AMRAVATI",
      logo: require("../assets/images/gcoea-logo-2.jpg"),
      subHeader: "B TECH in COMPUTER SCIENCE AND ENGINEERING",
      duration: "August 2018 - April 2022",
      desc: ".....",
      descBullets: [
        "....."
      ]
    }
    // ,
    // {
    //   schoolName: "Stanford University",
    //   logo: require("./assets/images/stanfordLogo.png"),
    //   subHeader: "Bachelor of Science in Computer Science",
    //   duration: "September 2013 - April 2017",
    //   desc:
    //     "Ranked top 10% in the program. Took courses about Software Engineering, Web Security, Operating Systems, ...",
    //   descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    // }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Java", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Android",
      progressPercentage: "80%"
    },
    {
      Stack: "Web Development",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: true // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};



// const contactInfo = {
//   title: emoji("Contact"),
//   subtitle:
//     "Discuss a project or just want to say hi? My Inbox is open for all.",
//   number: "9168805979",
//   email_address: "suhassuryavanshi5979@gmail.com"
// };

// Twitter Section

const twitterDetails = {
  userName: "davidrakosi_", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

export {
  illustration,
  greeting,
  socialMediaLinks,
  educationInfo,
  techStack,
  twitterDetails
};
