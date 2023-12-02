new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    gap: 10,
    breakpoints: {
      1199: {
        perView: 2
      },
      850: {
        perView: 1
      }
    }
  }).mount();
  