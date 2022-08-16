import EnvConfig from '../config/EnvConfig';
import { IPaper } from '@src/interfaces/IPaper';
import axios from 'axios';

interface IPaperAndMsg {
  paper: IPaper[];
}
export const getPaperList = async (email: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${EnvConfig.LANTO_SERVER}paper`,
      headers: {
        'User-Email': email,
      },
    });
    if (response.status == 200) {
      const paperMsgData: IPaperAndMsg = response.data;
      return paperMsgData.paper;
    }
  } catch (e) {
    console.log(e);
  }
};
