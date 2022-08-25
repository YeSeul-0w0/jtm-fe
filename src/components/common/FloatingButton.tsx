import React, { useState } from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import RedeemIcon from '@mui/icons-material/Redeem';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

function FloatingButton() {
  const items = [
    { icon: <RedeemIcon />, name: '페이퍼 선물하기', path: '/paperGift' },
    {
      icon: <DescriptionIcon />,
      name: '페이퍼 만들기',
      path: '/createPaper/decideName',
    },
  ];

  const nv = useNavigate();

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
        position: 'absolute',
        marginBottom: '2rem',
        right: '15px',
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
