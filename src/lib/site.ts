export const site = {
  name: 'AD Beauty',
  owner: 'Anastasia Danitoiu',
  tagline: 'Beauty & aesthetics clinic in Evesham',
  url: 'https://anastasia.valentyn.studio',
  phone: '07455 340555',
  phoneHref: 'tel:+447455340555',
  email: 'adanitoiu@gmail.com',
  address: 'Worcester Beauty Clinic, Walker Hall, Evesham, United Kingdom, WR11 4RW',
  instagram: 'https://www.instagram.com/adbeauty_worcesterbeautyclinic/',
  facebook: 'https://www.facebook.com/ADbeautyevesham',
  // Set to a Treatwell URL when it is ready — the Book Now buttons become active links.
  bookingUrl: null as string | null,
  marquee: ['semi permanent Makeup', 'facial', 'HIFU', 'brows & waxing', 'IPL treatments'],
};

export const nav: { label: string; href: string; dropdown?: boolean }[] = [
  { label: 'About me', href: '/about' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];
