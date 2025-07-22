import type { ThemeOptions } from '@mui/material/styles';


export const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: '#F5F3EE', // Quase branco
    },
    primary: {
      main: '#317873', // Verde
      contrastText: '#FFFFFF', // Branco
    },
    secondary: {
      main: '#D6AE7B', //Salmao
      contrastText: '#D6AE7B', //Salmao
    },
    text: {
      primary: '#317873', // verde
    },
  },
  typography: {
    fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
    fontWeightRegular: 500,
    h1: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    h2: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    h3: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    h4: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    h5: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    h6: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 700,
      color: '#317873',
    },
    body1: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      color: '#317873',
    },
    body2: {
      fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
      fontWeight: 500,
      color: '#317873',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#317873',
          color: '#FFFFFF',
        },
        outlinedSecondary: {
          borderColor: '#D6AE7B',
          color: '#D6AE7B',
        },
      },
    },
  },
};




// export const themeOptions: ThemeOptions = {
//   palette: {
//     mode: 'light',
//     primary: {
//       main: #E0BE9A,
//       light: #FFF8F1,
//       dark: #A2672D,
//     },
//     secondary: {
//       main: #5B4D43,
//     },
//     // text: {
//     //   primary: '#5B4D43',
//     //   secondary: '#E0BE9A',
//     // },
//     // background: {
//     //   default: '#FFF8F1',
//     //   paper: '#FFF8F1',
//     // },
//   },
//   typography: {
//     fontFamily: '"Helvetica", "Arial", "sans-serif", "Fahkwang"',
//     allVariants: {
//       color: '#A2672D'
//     },
//   },
// };