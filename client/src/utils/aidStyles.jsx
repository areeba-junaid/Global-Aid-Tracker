import {
    LocalHospital,
    Restaurant,
    GppMaybe,
    School,
    Language,
  } from "@mui/icons-material";
  import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
const aidStyles = {
    health: {
      color: "#B2BEB5",
      icon: <LocalHospital  />,
    },
    education: {
      color: "#ADD8E6",
      icon: <School />,
    },
    emergency: {
      color: "#98AFC7",
      icon: <GppMaybe />,
    },
    food: {
      color: "#D3D3D3",
      icon: <Restaurant />,
    },
    technology: {
      color: "#D3D3D3",
      icon: <Language />,
    },
    other: {
      color: "#FF7E1",
      icon: <CardGiftcardIcon/>,
    },
  };
  export default aidStyles