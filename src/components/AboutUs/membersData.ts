export interface IMember {
  name: string
  job: string
  photo: string
  bio: string[]
  contributions: string[]
  githubLink: string
}

export const membersData: IMember[] = [
  {
    name: 'Denis Goncharenko',
    job: 'state employee',
    photo: '/denis.jpg',
    bio: [
      '28 y.o., Khabarovsk, Russia',
      '2013 - 2018: student of Military Univercity in Moscow',
      '2018 - now: state employee',
      '2022 - now: RS School trainee frontend developer',
    ],
    contributions: [
      'Handle with signup and login users',
      'Implement validation inputs',
      "Handle with user's access token and anonymous session",
      "Implement my-profile page, handle with updating user's information, such as email, name, addresses and password change",
      'Implement personal carts, handle to add, remove & update products in cart',
      'Add custom descriptions to products',
      'Implement Slider',
      'Implement unit-tests',
      'Trello watcher',
      'No Tilt',
    ],
    githubLink: 'https://github.com/codestudent24',
  },
  {
    name: 'Artem',
    job: 'Looking for Job',
    photo: '/artem.jpg',
    bio: [
      '29 y.o., Samara, Russia',
      '2011 - 2016: student of Samara State Transport University',
      '2022 - now: RS School trainee frontend developer',
    ],
    contributions: [
      'Writing Components',
      'Creating API requests',
      'Trello watcher',
      'Layout of duplicate components',
      'project deployment',
    ],
    githubLink: 'https://github.com/TemaTut',
  },
  {
    name: 'Miras Suleimen',
    job: 'Looking for Job',
    photo: '/miras.jpg',
    bio: ['nfactorial Incubator 2023 alumni'],
    contributions: ['Product details page', 'routing', 'and more'],
    githubLink: 'https://github.com/TauAdam',
  },
]
