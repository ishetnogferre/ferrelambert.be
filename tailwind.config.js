module.exports = {
  content: [
    './templates/**/**/*.twig',
    './templates/**/**/*.html',
    './src/scripts/**/*.js',
  ],
  /*safelist: [
    {
      pattern: '',
      variants: '' 
    }
  ],
  */
  theme: {
    fontFamily: {
      sans: ['Titillium Web', 'sans-serif'],
      serif: ['serif'],
    },
    extend: {
      borderWidth: {
        3: '3px',
        5: '5px',
        28: '28px'
      },
      colors: {
        fl: {
          'dark': '#131313',
          'light': '#fdfdfd',
          'pastel-blue': '#91dccf',
          'pastel-purple': '#bb92d4'
        }
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14'
      },
      gridColumnEnd: {
        14: '14'
      },
      gridTemplateColumns: {
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
      },
      height: {
        '75vh': '75vh'
      },
      minHeight: theme => ({
      ...theme('height')
      }),
      spacing: {
        96: '24rem',
        100: '25rem',
        120: '30rem',
        128: '32rem',
        136: '34rem'
      },
      zIndex: {
        'd1': '-1',
        60: '60',
        70: '70',
        80: '80',
        90: '90'
      }
    }
  },
  variantOrder: [
    'first',
    'last',
    'odd',
    'even',
    'visited',
    'checked',
    'group-hover',
    'group-focus',
    'hover',
    'focus',
    'focus-visible',
    'active',
    'disabled',
  ],
  plugins: []
}