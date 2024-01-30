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
      color: "#6495ED",
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
      color: "#9CACFF",
      icon: <Restaurant />,
    },
    technology: {
      color: "#9DBFDC",
      icon: <Language />,
    },
    other: {
      color: "#E0F0FE",
      icon: <CardGiftcardIcon/>,
    },
  };
  export default aidStyles