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
    photo: 'assets/images/denis.jpg',
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
    job: '',
    photo: '',
    bio: [],
    contributions: [],
    githubLink: 'https://github.com/TemaTut',
  },
  {
    name: 'Miras',
    job: '',
    photo: '',
    bio: [],
    contributions: [],
    githubLink: 'https://github.com/TauAdam',
  },
]
