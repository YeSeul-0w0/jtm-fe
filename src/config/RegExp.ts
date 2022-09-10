export const nickNameTest =
  // eslint-disable-next-line no-misleading-character-class
  /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
// /^[a-zA-Z0-9가-힣ㄱ-ㅎ`~!@#$%^&*()-_=+\ufe0f\u20e3|[\u00a9\u00ae\u203c\u2049\u2122\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23e9-\u23f3\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618]|\u261d(?:\ud83c[\udffb-\udfff])?|[\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u265f\u2660\u2663\u2665\u2666\u2668\u267b\u267e\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26ce\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f7\u26f8]|\u26f9(?:\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?|\ufe0f\u200d[\u2640\u2642]\ufe0f)?|[\u26fa\u26fd\u2702\u2705\u2708\u2709]|[\u270a-\u270d](?:\ud83c[\udffb-\udfff])?|[\u270f\u2712\u2714\u2716\u271d\u2721\u2728\u2733\u2734\u2744\u2747\u274c\u274e\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27a1\u27b0\u27bf\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299]|\ud83c(?:[\udc04\udccf\udd70\udd71\udd7e\udd7f\udd8e\udd91-\udd9a]|\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\uddf4\ud83c\uddf2|\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\uddf6\ud83c\udde6|\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\uddfc\ud83c[\uddeb\uddf8]|\uddfd\ud83c\uddf0|\uddfe\ud83c[\uddea\uddf9]|\uddff\ud83c[\udde6\uddf2\uddfc]|[\ude01\ude02\ude1a\ude2f\ude32-\ude3a\ude50\ude51\udf00-\udf21\udf24-\udf84]|\udf85(?:\ud83c[\udffb-\udfff])?|[\udf86-\udf93\udf96\udf97\udf99-\udf9b\udf9e-\udfc1]|\udfc2(?:\ud83c[\udffb-\udfff])?|[\udfc3\udfc4](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udfc5\udfc6]|\udfc7(?:\ud83c[\udffb-\udfff])?|[\udfc8\udfc9]|\udfca(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udfcb\udfcc](?:\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?|\ufe0f\u200d[\u2640\u2642]\ufe0f)?|[\udfcd-\udff0]|\udff3(?:\ufe0f\u200d\ud83c\udf08)?|\udff4(?:\u200d\u2620\ufe0f|\udb40\udc67\udb40\udc62\udb40(?:\udc65\udb40\udc6e\udb40\udc67|\udc73\udb40\udc63\udb40\udc74|\udc77\udb40\udc6c\udb40\udc73)\udb40\udc7f)?|[\udff5\udff7-\udfff])|\ud83d(?:[\udc00-\udc40]|\udc41(?:\ufe0f\u200d\ud83d\udde8\ufe0f)?|[\udc42\udc43](?:\ud83c[\udffb-\udfff])?|[\udc44\udc45]|[\udc46-\udc50](?:\ud83c[\udffb-\udfff])?|[\udc51-\udc65]|[\udc66\udc67](?:\ud83c[\udffb-\udfff])?|\udc68(?:\u200d(?:[\u2695\u2696\u2708]\ufe0f|\u2764\ufe0f\u200d\ud83d(?:\udc8b\u200d\ud83d)?\udc68|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d(?:\udc66(?:\u200d\ud83d\udc66)?|\udc67(?:\u200d\ud83d[\udc66\udc67])?|[\udc68\udc69]\u200d\ud83d(?:\udc66(?:\u200d\ud83d\udc66)?|\udc67(?:\u200d\ud83d[\udc66\udc67])?)|[\udcbb\udcbc\udd27\udd2c\ude80\ude92])|\ud83e[\uddb0-\uddb3])|\ud83c[\udffb-\udfff](?:\u200d(?:[\u2695\u2696\u2708]\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3]))?)?|\udc69(?:\u200d(?:[\u2695\u2696\u2708]\ufe0f|\u2764\ufe0f\u200d\ud83d(?:\udc8b\u200d\ud83d)?[\udc68\udc69]|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d(?:\udc66(?:\u200d\ud83d\udc66)?|\udc67(?:\u200d\ud83d[\udc66\udc67])?|\udc69\u200d\ud83d(?:\udc66(?:\u200d\ud83d\udc66)?|\udc67(?:\u200d\ud83d[\udc66\udc67])?)|[\udcbb\udcbc\udd27\udd2c\ude80\ude92])|\ud83e[\uddb0-\uddb3])|\ud83c[\udffb-\udfff](?:\u200d(?:[\u2695\u2696\u2708]\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddb0-\uddb3]))?)?|[\udc6a-\udc6d]|\udc6e(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\udc6f(?:\u200d[\u2640\u2642]\ufe0f)?|\udc70(?:\ud83c[\udffb-\udfff])?|\udc71(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\udc72(?:\ud83c[\udffb-\udfff])?|\udc73(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udc74-\udc76](?:\ud83c[\udffb-\udfff])?|\udc77(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\udc78(?:\ud83c[\udffb-\udfff])?|[\udc79-\udc7b]|\udc7c(?:\ud83c[\udffb-\udfff])?|[\udc7d-\udc80]|[\udc81\udc82](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\udc83(?:\ud83c[\udffb-\udfff])?|\udc84|\udc85(?:\ud83c[\udffb-\udfff])?|[\udc86\udc87](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udc88-\udca9]|\udcaa(?:\ud83c[\udffb-\udfff])?|[\udcab-\udcfd\udcff-\udd3d\udd49-\udd4e\udd50-\udd67\udd6f\udd70\udd73]|\udd74(?:\ud83c[\udffb-\udfff])?|\udd75(?:\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?|\ufe0f\u200d[\u2640\u2642]\ufe0f)?|[\udd76-\udd79]|\udd7a(?:\ud83c[\udffb-\udfff])?|[\udd87\udd8a-\udd8d]|[\udd90\udd95\udd96](?:\ud83c[\udffb-\udfff])?|[\udda4\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa-\ude44]|[\ude45-\ude47](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\ude48-\ude4a]|\ude4b(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\ude4c(?:\ud83c[\udffb-\udfff])?|[\ude4d\ude4e](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\ude4f(?:\ud83c[\udffb-\udfff])?|[\ude80-\udea2]|\udea3(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udea4-\udeb3]|[\udeb4-\udeb6](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udeb7-\udebf]|\udec0(?:\ud83c[\udffb-\udfff])?|[\udec1-\udec5\udecb]|\udecc(?:\ud83c[\udffb-\udfff])?|[\udecd-\uded2\udee0-\udee5\udee9\udeeb\udeec\udef0\udef3-\udef9])|\ud83e(?:[\udd10-\udd17]|[\udd18-\udd1c](?:\ud83c[\udffb-\udfff])?|\udd1d|[\udd1e\udd1f](?:\ud83c[\udffb-\udfff])?|[\udd20-\udd25]|\udd26(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udd27-\udd2f]|[\udd30-\udd36](?:\ud83c[\udffb-\udfff])?|\udd37(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udd38\udd39](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|\udd3a|\udd3c(?:\u200d[\u2640\u2642]\ufe0f)?|[\udd3d\udd3e](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\udd40-\udd45\udd47-\udd70\udd73-\udd76\udd7a\udd7c-\udda2\uddb0-\uddb4]|[\uddb5\uddb6](?:\ud83c[\udffb-\udfff])?|\uddb7|[\uddb8\uddb9](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\uddc0-\uddc2\uddd0]|[\uddd1-\uddd5](?:\ud83c[\udffb-\udfff])?|\uddd6(?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\uddd7-\udddd](?:\u200d[\u2640\u2642]\ufe0f|\ud83c[\udffb-\udfff](?:\u200d[\u2640\u2642]\ufe0f)?)?|[\uddde\udddf](?:\u200d[\u2640\u2642]\ufe0f)?|[\udde0-\uddff])]{2,8}$/;
export const emailTest =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
export const passwordTest =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*?[`~#?!@$%^&*-])[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,15}$/;
// ^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$
