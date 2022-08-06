import React, { useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import RedeemIcon from '@mui/icons-material/Redeem';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

function FloatingButton() {
  const items = [
    { icon: <RedeemIcon />, name: 'gift', path: '/' },
    {
      icon: <DescriptionIcon />,
      name: 'paper',
      path: '/createPaper/decideName',
    },
  ];

  const nv: any = useNavigate();

  const [click, setClick] = useState<boolean>(false);

  const onClose = () => {
    setClick(false);
  };

  const onOpen = () => {
    setClick(true);
  };

  return (
    <SpeedDial
      ariaLabel="button"
      direction="up"
      icon={<SpeedDialIcon />}
      onClose={onClose}
      onOpen={onOpen}
      open={click}
      FabProps={{
        color: 'default',
        size: 'small',
      }}
      style={{
        position: 'fixed',
        marginBottom: '2rem',
        right: 0,
        bottom: 0,
      }}
    >
      {items.map(item => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          id={item.name}
          onClick={() => {
            nv(item.path);
          }}
        />
      ))}
    </SpeedDial>
  );
}

export default FloatingButton;
