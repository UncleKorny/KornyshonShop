const products = [
    {
      id: 1,
      name: 'firstitem',
      href: '/products/firstitem',
      price: '$256',
      description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
      options: '8 colors',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://images.deal.by/114739481_w640_h640_zubr-20-rublej.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
    },
    {
      id: 2,
      name: 'seconditem',
      href: '/products/seconditem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://images.deal.by/88451704_w640_h640_tarelka-dekorativnaya-zubr.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 3,
      name: 'thirditem',
      href: '/products/thirditem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 4,
      name: 'fourthitem',
      href: '/products/fourthitem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 5,
      name: 'fivethitem',
      href: '/products/fivethitem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 6,
      name: 'sixthitem',
      href: '/products/sixthitem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    {
      id: 7,
      name: 'seventhitem',
      href: '/products/seventhitem',
      price: '$32',
      description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
      options: 'Black',
      imageSrc: [
        {
          id: 1,
          name: 'Angled view',
          src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
          alt: 'Angled front view with bag zipped and handles upright.',
        },{
            id: 2,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-02.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },{
            id: 3,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-03.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
          },
        // More images...
      ],
      imageAlt: 'Front of plain black t-shirt.',
    },
    // More products...
  ]

export default products;