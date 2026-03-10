import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#080a0f", surface: "#0d1018", surfaceAlt: "#111520",
  border: "#18202e", borderHover: "#243040",
  accent: "#29a8ff", accentDim: "#1a6ea8", accentGlow: "rgba(41,168,255,0.10)",
  pink: "#e91ea7", pinkDim: "#9c1470", pinkGlow: "rgba(233,30,167,0.09)",
  gold: "#d0d8e8", goldDim: "#6b7a8f", goldGlow: "rgba(208,216,232,0.07)",
  text: "#dce6f5", textMuted: "#56677a", textDim: "#2e3d52",
};

const ICON_NAV = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAYAAABe3VzdAAALtElEQVR4nI2Ye3AV133Hv+ecvbt7r3SvpCsJCSQRAUIGYUMBxxCwKxsbW3VqQsd2p3bdxE2ToZ5M6zaTSaeeTiGdPib/JJk2bus4zaOuPQ0krlOc0tDJwLVjDCYg8xLvh650dSVd6T733n2dc379QxLBPAy/f3Z2z+7v9znf3++c3+4y3KFt376d79+/n6dSKQ1Az11/4csvdJ05e+a384WirSty14kTJzIDvzOwLgjl48VC6aQI8IvDhw9P387PrYzdZpz39/fzVCqlANDcA599cVt3Ziy92SvVntAVudGs8mQyqIfjVL/589GHvrLlrvfP2fXRJRM0jRr3M6Gp3lWcfiak3nfs4LHMtfH7+/vFx8HeDvCqbfvTbUsvT48NuHnnMywvNyScSLSlZKOlWoeojATTVBYnMPKtd51jX3kguvLMA2J5j21GUTZckYs5mKhzkLdqTs0MD0hBu1GhvWeOHz93u7i3AmQAMDAwsHj+/Plby+XylsLk9LrmnGW1FWJo9WJoRhyKaYyjWB4yxmKBDI0rKvdPr1hf+PYX9Xf3WCFf3MPa5Cd5T7EBdS1EhClWwXS0hrFGB2MNThDI4LDruntc19156dKlC7Ox6U4ABQDV29v748bGxicJBKE5OqsNsruWRKxmFLUrfyAc/cNXm9/5zZ5Y18sPqGVynV4iO3lzZJTl2TtySL/jnRxrrUU/vZ6WNrKE+SyLit/P227svD2JEWPaqLo1aK3huu6/ZTKZLwAwAMjbAg4MDFiu66p0Ov2qMIznQQTGGZhtkG1asHjEcaN699pS5/hT02ueWhYuWBiDSVUeMId5iGkTCUQpZEqftSbSP247uvt962KXKKsBx6/ZnucxJglsNryU8u83btz417t27TIA+Hei4NXxJd1LnhCm8Qw0bXYpSEooRA2LJaw62KaNOmahK0xipdeJu2sd1K4SyJsuOxHL4Ih1BZcwgXJQRc1zUQmq8EmSDRM2j2Q09E/LFfe1fH7i0C0BbnLOt2zZ8nQ0Gn24VCr9clV84Vtf3/Wd0v80/NXqQlweTeG0PsbTLMuKOhCKIoYQETPCTDOCJI+jzY9jXJQwLvPwvQDSl1oqpS2KsC5qFmuxWD/C7+FLZXLVysk/O/7i57Z1H0+fe8ZxnHvz+fyeixcvfh8zK5quB2QAKJlMJlpaWiYT8YRlmSY4564Hta8v2zr0587mL7cYCZ6Hg+M6jYN0Hh/yNMaMIgJDwjAFYnUxFKYLUIGGqQx06iasoUW4XyzDKtGNBhbDmJyir7O3Xx1qn+yzSNwvpYIXePA8r6qUmpfNZmtzPDcAtrW11UWj0bOKU1sIibgRMyzTAtMcibyBVX4n1vOlWBnpRjOPo0Q1nNQjeJ/OYzCSRqHBhz1FWKu6sZHdhd8wutHE6zGlSzgaXsIBeRaDYhjFeh+KK4RSokpeaDOTC410Zmxs+Wwd3hxwZdvKuun6wvnVfMn8JteS71nnHc54IzGCDwmhBCyPo91L4B7VifuMpVgZ+QRaeSPyuoyzyKKbWtHBm5EXVZzUI3jPPYVBuowxswzPChFyCYsMgBiYxuRmeXdy1C4ZR+T54U2Z1t5dGArmeIzri/KuyF16P72rFpmdeC58KPS9Hz14MHq+p1nH/zAC8fgojSOIgrl1IYZlEXu9IbQHDVgmurApfi/WiXtxmobxH8H/YohGkBY5OKIKyUIEygOToG7RCZ/kW5Os+Mpn1ab807FNB/85shtBeFr14WkNfO0qzw2AAMC0Ri1modL0CWN15aHSzmN7f3KyP3dqxJr49AfuIO2v7Mfx6lFMYRx+TGCiMYJSywgYOrHaeBKH5SmkjAuoZPKoOAVoHaIl0o7VjY/g0cbN2FD/SdZLi15ie+0zC1bcvarc1MXdsglR1oR+ACncGrBit2sjhKqYHJeTFkZ9zwQg/r3haMOqefejj5Ziqd6KrDeKU6Uj+GX2TYzUTiAOGz4snGuLoThhIS4tOFqhq64Pjy36HFYl16Mr1g2DR5BjCr8Yf78RgBhp4JH6pIWqy8AIaseDO/TXUh+jYNpMEg9AZUPhbFyzkYpgAFRuXod/qtWEIsWUBrjuwKLFy1BpaMLFQ9sgwxCFGHBuno3JMocsKLh+Gff1PYEV6z6PKdfBJCcIThDMRJaaQwBqLMqZiGs4QsEgEHaArsnwjYCtrdDVMlNVg3C5nlgxCg4AI60JWW7iYNwAyIRSIYSpkZ4COBgYAY4lcLmtAYVsBKygIYhhIgYcTSpIz4QQEQCMERHyAVcAMB4lQ9cTaoLACIpxMdeL6aaAKQCLAFSZxIgdohI1eX9/v3HFLPJoYgEYn32UBESUo5CwwAjgRKhaHJfbLBRjEXAicCIUYiYuNgvIKgGMAMZARKh5RP39/cZUDNy3JTwuIcDoep4bF8mDOzS/9Ir2mUSOO7zIA3k6lZJLnm6r2ZEauBUFGAcIYDHAt2fUY0SoRTgqLQCiAkkiMAIKFqDigGYAGANIQQcuSsl51dFUSrY8/6zrCBcmFBgxfd3LzEz6PmI7QAC01hKh8vUKlu169tENX+zY95ffd50cuc4UeV4JvnQRAFDXeNAMCASgZndXBkBzBp8DvvLh+2W41WlynRzN/9mLP3xs9eI/bswdWRIoXxMpANDX8X1EwZkhxom65msoCYQhBZXi2yf8pFUtpKHLkyArBiZMMMMEwEGBC8bYrAP6de+k2XTKEFSR0OUpkAxAMmDar6JUqW7Q7es2NBpaOaFHTCuAMYVfz+3mNTjDyBSFnlSVSYx1D1j+5BXEzv0fDB2CPAeMcYDzGamrRXDGQCCQVkAIkFaznZ5D+1XIUg66MgVNeqbKVIhqzcP04s0w6xuELo5LkoEE43dQgyAwcJtDGzKfgZpO56ic+6lnN++zePS7hmVHWVgjCn2mvQrpoDYzY8YAGUKWXBhBbabeACDwoN0ykfQZIjbBrGM6qDpUP++PaGSw341Et3JhLWCkZ1J8XY6vB5xp0DJ4LvT8rSFyh533XnuTAfjq9m9270/v/bBotq53m3o0a2glZtYZjHOwGUJABVDlSRjXpB2Mg9n1jIgkVSYZv3iA88mLvwqD8tH8wd07AXyp6YHnH5OhfzfT/n/fTkECgPOZiUPITBy6vL3f/uqqf/j86GT2D35yfOT+WnHKME7/I7F4q5Cdq4Dlm5WQoU+MxQACI0VahYppyQHiAIPWKpCXDpns+NsGHz4MVZ6E1/vogzreea7xU898wIn+M/nuD753Afj59Rxzit1gPT09VkdHh8pmJ75htXT/SY4l4CUWgEVi2sgMMj46eE5PjL9cA3Ym+tY/nKDy6831lqq03ydKj/8t6g/8K5Jn/kuOFytGJYz8nbgy9IoAnqLOhS/orjU9YfsKUrUi5/lhRN0cZDH7jd4li/4ilUpxAMHHKQgA6OjoUKlUSnZ3dzuYPIsEAXVTUYTz71GqbxPX65+1WUNnp41IF//e1iIamsEiNjcLV06HE5f+xZg4/Qw37XVEZaAyUQpf2tesQm8ByhM2L2d05PIhsrInuJDejEQK06lUSt6M52M/OxcuXNhomtHfIqZ/j2n1sNBhjMAhmxZCd65BOG85dO5Srv7Ej5LzFiwUMggPHPrg4MZ1a9d+2040fCl9fkhWlzxSEz0bEiJ7Emz4V2D5YTBoKB4pEhd7oNnrWof7stmsi+tXyK0UnLsxnU4XALwB4I2Fvb2LTGF+BqR+VxTSn4pMX0TEikNGk61MmCFpxQiMsH2fofa8ZGkZahiWNjIfJsTwAbBaASRMaMN8T3P+htD6rdGRkbFbxL+tgteOz3Xfq78menqWrwanJ6GDrUzrFRE7hlgsBsepDZ45M7RmxYp7XovH657L5abguw7AxFmIyJua0c6x4eEPr/EvZo9XP5LuVME5IwBzu/vV/zQXLpweBDDY19f3N54nHxZaP++6bm+t5rwMgHle7XXOsYhIV4mJ72jdviebOVK7ZtJi1q+6MeRH7f8Bjgsr9i3RVa8AAAAASUVORK5CYII=";
const ICON_FAV = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAYCAYAAACbU/80AAAIJUlEQVR4nIWWe2wc1RXGv3vvzO7Mvp31I36tk8VOYsdArCBBcY0poIZCKK8GAWpUKW1VUCu1RaVSFSQTUYkKVVWrllZqBVKgTUtDWyACEiRSG4jzAJLgJE7sOIntjb32ete79u7szM7cR/9IUB2I4fvvXl2d8zvnO9K5BMuor6+P9vf304GBAQlAfnp/f99jtemhkTuRdW8SWfcfXYGugxMrUttzorAizxf/c2516SB2Tjifvt+yZQvLZDJkYGBAAFCfzUOWA1iqO/oebigPZ24jWX63v4DemOWvj1WCyDj5vx0IDv3wLn5zwTQNTNMc8n771KK/sr8UrLw9EZ8ZxO78whfFvhoAAYDt27c3jafGN+UuZu/1Z0Vv3AqEm8pRhBwd87zkpjHPjnoX/nJixbmnri+0zmwkSZrUVlLT50fGbyHln8ecYc0UQ95/Pe7tqVQq+0+ePJm5nEMtB0ABqGQy2RqJRIbDkbBGyxJtuThaijHH77E9oRJ7aWf88M/W+RK9PXzN7HqWsN6VQ6vec0669U74pz2kQyya7neLhnvD6cgsO2tkYDkWrJI1vG3btmt37NihvgxABoPBuurq6k90Xa9TOoH0Qca0sPL8sr/LaUnfN3/9fde5zSFT+eASDkPpKOmuPOqfSL1cdfD9CZnZ6Dpue85eECbXGJUEHvf+nU6nH/xSC/bt2xd84403os8//3wmmUje2MTiT0Lhm2N0FppPJ0HDRJD6kVDV6HISanWlWo0EZulH2nlM8DmU3DIsx4aPM9VJEmSBOb9KeTN/mt41PX37M7evKZfLFw4dOmR/FoAAQF1dXaCxsXEwEgq3MkUHFkz+wo5Pvr6ygzX+4Si5ID5QI+QIzqlJLUfLhkcMw48QM5ApzsNzOKKuodbIetnD2skttIM2ySr5T3Jky79WH28zKmRrybE7iqXiq5OTkw992u2lAKqqqioaDUfHPV3GQkYAhs+AbhFszDejR65FJ2uGj+oYwywOqBF8qF/AXNBCdc5AD9aim67DKlqDgrTwoRjDfpxSJ4LTRPkUiq4FSECT5L2p6eneqwLU1NSEAtHQyN2iq36UT42e0dNRxujKvFhUYS9Amt1qbOAt6CZt6KQtACGYojm0yBp4TOI4nUR/ZQjHcAEXtSxsWkGcxVAR7ulN/PqgNEjzW/zjfYtTuW+oywDaUv8TWkJexIzojd1KHrMSf76Obt35fXLvU37T/PGAfVCe16foqEzhTXEM9awam8O9+Da7By+q17DXPoApexaLWgE+wrBKX6VuCdxEpp3p7+0O7Xn55/jRK6+ydxNO9n1+uV4CAFcA6ExXTHKVqo1AqlgI7xRzTzz0xw/CZvgnmxdPyY+Lh/FhoR+ji0dhxzlGAy7OmvU4a9uwCmWYZQNfWbkFN1ffgRtj3WSlrxY1zOzf/RJxT26KBOdKBrQZJd0lOa8ASDO/YpKIcyGBrI8pAOTN6jmjLh6E57ShWa1BgmzDrsHHMV7YC8vUcLzegD2mwSsuYF3iW3io93dwOccYJTitPEzljgYBkE+qFJn1BHQFqZYDCAZrpW2NyFRA4mJAsj6AjNYGeLqaoOJoENKD7lcohgJgOYFFU8NIYwylixRMCBTCARxskHBtoXTNT6RQqsBMCQCno4oVChKa+v9e+RzAMIBrFDCtOyiZNtsDyI11VcVIjEA4BFAaqAnMmxR+KVH0Uww3RYBjFLpQyJoUQ7UUosRANEB6UpU723N4FuqcWSFUc6HLKwHo0gNqMpKCiKKyUUCZP9PT0MxGd25OVSw1Q0pkVudIBwhsRsAk4GoEsxEKlwFUAbZOkA4Asz6ONCyV5vOgLzz+6MO1qMsRmzvKA1VULF2KV3QAA7UKLWMQdlHFxOltr/G2J0pnDkd4Q7eihFLqM0BJI4gUAAEU1OUK1KXBlgKqyCHyaaK4B2nlUZ7P/np8wwO/MMsZJStlCUqXtwDoUIQeNtXCDFlo6U7M130V2txoxaekH1YeklIQqaAqZYAwKCEgXQ4lJUAopGOB59IQCzMA8wFQZK4sKtnOO+PwBEJ2AWB64GoWKAAE2CFByDFRzM0XRw/9vTB24NZI5223+91SUQWiEkaYS+FJxV0FSgFRAc+lAeGBEArFXSWlEMqs8qCbgJ0fC4Vq1lSG3rnPnjzxunCsKQIcWK4DCgBGz0/c32HUxyb2/tZ+8Ok/bxorjH/HGd5LiQSVbT2UrPkaoOmAUoDgkFZBQHpMQQGajxA7z8iJtxhG+uExM2KH6n8pgb8unh1+2Izm2exc3rqcT1zFgktOlqZOq2vvfzRlx1bH86FmKL0W/rPvFuWh11/myY07Q6beR43gXVRxRY0go4orZYQJHxt8xT719otabvwx2bhhs9e2oRZeZWtA2VuDZPZIeujMjcAWBuwWy8zAJQivro5Z2cmSVpiKr/CFwRs3wO39gcLK9igLN1Rh5yMFEo/CV0yd4ZnxZ3zluecc3d+kivkS37YrorJjQZIZlfrkRzBmhkF4BZ5Q05cK3H3FEC73JVPJ5MYo0Yp3Uu49onjlDuYPBlV1EpWGLojJo149n9F0M3xkcPDATd3dPadKhbl1M74m+Bo7KJ04DJUbhxReGpr5mqB0VzqVGrxss/oygM/pmvU3NJNK4R549gNEyW74g0YkEoUQ8uTxe3/TdcObT467rts4n50DuLNACNsPX+iVkh7fmz//8Rd+Sr9IpLe3VwPAll62tl/X1dra+lxnZ+eZZPKaZwFg/fr1v29vbz9V39j4dMPatWs/E+dzMZbqfwTCELaXzlvqAAAAAElFTkSuQmCC";
const ICON_LOGIN = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwCAYAAAChS3wfAAAXcUlEQVR4nM2ae3Bdx33fP7/dc+4L9+LBNwmRoEiQlizKlimKlqwH3Ei2JKuRbNm047rNq5166mmaSdtk0rRTxZ2xU9duM/U4kzSKGye241hqbEsWFTeyI0Gm3oIoUpREkeYDIAEQBAFc3Iv7Omd3f/3jXpCQLMq0pMx0/8DjnD27+/vsb3+/756z8A9TZNeuXXZoaCh61UURPnr7R99z0w03bVl6efGPT975yS233Xzz9bcM3pJd+tyStszbPtC3s61du3aZ06dPy/DwsFu8qKrm0//809tnK7O3zS/Mf6iyUN3eqreatmWeCkn4jb2H9x7cefnO/r6Vy78aYv++RqteTFrpK3j9EZ4HW2daj+0b3VdebO+uu+4yjzzyiBkeHg5AeMuDfqvPv57Rz/6vZ+O7H79751xj7hcr9eptC436trSZINVAoZFhmSuRI8OR5MSuJ8ZH/s9VA++5ZnN2w+MiMJ9tUIubJBmHs57gw5T18rDx+v20Fh4eOTgyubT/oaEh+1ZgvBkAsmvXLgNw7733+sWLD9/157lvnXjimvna/O3zjeottXrtkqSWYMqO7krM8lbRdYWsEcQ0Q+LmdEFOyvSde8uv3L91zdar+uulJzb7FZIrlEwqPiS4MJ+tm/li09SLnjSjaAjzRtlDygO24X745Et7f7J0YENDQ9Hw8LB2YOg/FICz5Ytf/GLX4cOHr51fmL+jUlu4udaob04WmkSznmXlrK5t9vhloYsCMSJiANPUhIkwG8Z1zpyOq7c/Vz74wNbVW69asZB56jL69eJojRiEgKqq+kQdVdviTK4m06W6rZRSklzAq2+h8jSp7tam/8HzLz6/783Y8PMAEEAfeuihnt27d98wNzd3e6VS+eDCwsKGpNLEzDn6Khld1+z1q0LRFCQbjLE2EisiQkNbnAwzzJg6y9J8eIYj5snoxWuZ43FWcsVa7X9uZT1Pv10mg3Yt681ySiYPCklwhOBdMzip2AanMwt6urAQVYsJaVFIg1Pn3PPe+x+kafpgrVZ7dnR0tMUFeMGFAjCAbtiw4T39/f0PrFixYq2q0mw2qVQqYfWpXLisssasdt3GGoNaMNZSD03mQ+N4GtLv/DA6kD+aP/OvsnEhrKoVpFcL8jG78/73mq3rpnU+c48+edk+HTMvN0Zbzrh4bej701/hhkORjT6ZN9kr+0zRhqAE7zAqLMSJHi+Vw5E1ZS1rLUoaLZx3pGlKrVb75vj4+D8FLODfyLALBWABv2HDhpuMMQ+pahrHseTzedPVVTA2ExMFQ2kh1nXzJQpVM99qNO6eq1W/8dfs2Q/AyvjXro+3/e/36aVuu2yMtrCGbtuFU48goDCjFT3ox2t7kpcWDjLxXx6f2//HANexZuWVuStvzfWU/jWlaMeJ0jwT2XmZDzVa9QZJM9HUOfXOpSJivfd/PzExcfPbDmDjxo1DmUzmkRACqupUVQATR7FkclmiQkwUx2oxjWD10VT97kvHlh//5eo1t/Saro/02K61kbG0cJKQoooXEAWCqImw5CQmoxEN10wTTfe9Ek//zde27z2UaHJzvVq/pdVsra83arhGKiHxhBBQNKhqEBExxtgkSX44OTn5gbcVwNDQkBw7dmy9tfZua+37rLV5gBACoqgGFQAbWTLZLF2FAnEmJtaILc1VbF1YxWB9BevSXro0izdKIo7QWaaRCnFo66ZK3GSsq8yh4mkOZMYZC9O0mk1qtRqtJEFDAAQRUGkLLBHBOe9Vw9Pe+69s3br1noWFBRkZGXG8QSy4EACG1+TYTZsu3SLiP2gMdwhybUtcwYnXnMYSqenMSvDGWI2zsYScUZuNbLfmZX2rj221dWyr9zOQLqNAW/RVoiZHCzPsK47zQvYEY2GaamPBh7pTkiAhKEbEGDESBFqkOA3aRTYYZJ8q31MxD4yO/mTveex8XQgX5AFf+tKXVoyMjFxy4sSJF/fs2TO39OFNF20e/Ijfcc9c1LjiWXNU56K6UQMZiYgwaFDQgLUWm4mQnEWyli5y9Ld6uWxhLUnGc6A4yUk9Q7VRI9QdJB4NigIihiCQBofzni7NsjmsdO+XbdG0m/ud/zn9nf++dJJ27dpVnJubu6FarUbOueGRkZH580E4HwABGBwczKxcufJP+vv7f1FVl9dqtVNJkvwoSZL7KpXK8P79+08D7F/7lb9Zbkp3vuLG/UsyYZ/lKC/JBKejKiGGOLJtGKqgihFDlI3QjJCowzmHJAFaSjjr3oIGSIPHO0eXz7JJV7FTNrPDbGaTWe1W2Z5o0k9/aPup3/rbL9z+26Ufh5d3NpvNjyRJcluSJBsbjQaNRmOqVqv9zvj4+F/yOjHhjQDosmXLuru7u09FUZSP4zgUi0VTLBax1pKm7jSJPDwzPfvAlyof/bXLsgO/UA9JsGDS4DgdKrwcxnlWj/KiGWcqquIzShRZImNBAyEElvX1Ua/Xma9UsdaCQuo8PvV0uQybdCU7zCZ22M1cbNdQNDkQCKIhqDdfrz3837679mUtFQp3BvFbnEtpNBq0Wq3gnEuNMVnn3BcmJiZ+F4gA91pDzwtg9erVXfl8/mAURf2otgOdkRDHMfl83mazOUKqLD+VYUftIi6PBhiIV1EyBSIMAjh1nPFVDvoJRvQoL8hJTsUVXEaxsWF5bxvAXLmCukAhjbk4rGgbHQ2yya6haPKIQEBpkTDl5ngxGePp9DAv5U9T7/G4kOJcqiEEL4gxIsZrcJ20+NmJiYnPvh6A6PWsXyy5XM53aEgqQUOMZIKxSZK4JEm8yLwaa2WmS+xhJnhw4Xk2NpaxzW5gW2aADR0Yq6I+1kR9XKeXMBuqvJJOMJIcY68Zo5xt4uopW2or2Gk2syMaZHO0lm7J05YHbaPP+HkOtk6wNz3GwTDOqbhKsxQgS9AkBLQ9aSJiHMEkpOSIEURUNTmfjW8IYNEVnFEG/EpMUzkezxDHUYRCCEGDD96IKF0ilXzKvtYpXmhM0tN6noHGci6z618FY4XtYaXt4RrdStnXeGlukoy3XJrrp2TzCELAk5AyF2ocTsZ5PjnKS/4kk3aeet6jWVDbHlvwAVUVEbFiBB8Cy1yBS+hnf+Yk9dCEN0iDbwhgdHQ0bN64yTXF855oUD9RvYqHWwem/6Two29mTHSLGLnEWhulIcUGixVDyCuaV+Z8ylxrkgONCR5sPs+GxnK2RevZltnIQGYNJVOg1/RwrXZDJCiCF2VeaxyTaQ6YSQ4kxxnTSaq5JiEDIVIUxSiItgNoJzWiQct137r/xtZl9pfl/Z/yGQm/F3+LWrOBebMAgIAQBKUVC3HPSi5xl9bHjn31t2DotzcPnLwuRHy4JxT/WVkqfWWtkzc5yUoWawxaUHxhEcYpDrROUUz2099czju6Bri2dAUb7ToADvkxnkxe4pX0JKdsmbptkORa+GxbLEnHaK+eBV8nDU777WqMmj1V6l9dZpb9cN/JfeO3X/Qb/2JZrv9Tx8108EE7Qc603iyADoYA2Ty2q5/QcjHLKTEzXD02Ko8E9JGndj60PmT0zu9WfuCfaj5rj6XHSDQha7NkJIc1QigEQpfQjGAi22Ci+BOKjQHeEV9D0MDT/hkezR/CNJT52XmSpAXa1gAaAvVQJ/UpfbaPGwrXcVPxhvDB7husNMNdW56++uGxu8aMfFbs6SLLB3v6sR4o/2zTfiYARRBVWrFlvqeHZqPHMLM6wJT84eDuzHf6v+B9cY3Z1rON9c2dzPkyB2oHeGx+mJHqk4y3juE0JWvzRBIR5SzLVyzDq4DvodLbS1CPmS/Rm+nGZpXZ2WlUIfVNWq5BISpxedcOrl9+I9f3DrGlMEjO5sAY9kw/XASirz3ytQhoSs9Kt9DTSzWdRec78/cWAHggNQh1q5woBKYRVgNToO/61K3+Nz/7ITf+CUu2OzAbN7HSxfq+6/knF93ArckMr1ReYO/soxyYfZSKO0MIgWazSZrCjPWMF4WgwmzZ0ag3iSJQVXxwrM0PctWaD7Jj5T9isPtSuqIiiaYc0QSRJoWoxEwjFwB3vGPLdMbH4wXldDOcXfgibz4LKKBGoW6Vybwyp8IigcUyU4y1q9dQznQB7cH74DBdJdb03cCdg7fRf/w7fOO5f0MhX8SHQPBQzRumihEhCAuRwbdCe4PTAfDRHZ/j8nXvp5bOc1JTlDqRibGmgBVLNY6Zrtr2IDZuhGGYzoS4uwBnNKAdBCJy3h3hhcQAFaBplalcoOKDTdMBC1McmhwRgPKyvlrcA7Uo3+5WPaoBHxzOt4jjFtVSvp2oVTtchYWs5Ux3jhA89YwgrfaAVRXBMFfMcDhfx2cCkcljTISIwYhBsBJFUO7OpgCz3f0KUMlHejqnzKZtAAIE1fO+Tj8fgHNpQ0gFSGzQ01mlngTjSy3DLIx0qpwuRmnSBXVj21FXLaqKakwIEVGcp3wmbm/8l3SxkI2YKXUAxLbTrel0q8x1Zcj0FPDOYkyMiDm7pVGByMCZQq6j7NrvR2dskstkodo819lbEkIBiFVoSeBMxtPMGaC3ffPK9q/JOJVaHloa2oOks1HHoCpEWagUMsi5VYmqUssYzpRyaHA04sVJOlenXMxiSuDSGCOmfefcbYyFct54gMOdywuxyJmc0qz5s5VF5FXy9+cC0OmLRDwztoWLAvT2wiiMdAhM55RGARI15zpd/CuAzUM5Z896QHsBKLWsYaY7R/CeRsaQO+u07UqzOUOaB29BRF+tZkQwBuYz+qrL1YwhRA5vUpY8cd5t/wVI4XYHjiDzJkGlGflGOQIkPnhvxF13+dPS0IUMOO87HrBoJGhQTB4amU5rnbuCUostZ7otwVsakZB/jV6bzUI9D2oVRM5iVQUkgEIjE/zQ0FA03TphAanYQMu0MCY92054k0qwHbOQRBA8Xuu0UBLJ93RFC6BP/uHHGwC1L30sbrmA+joSxYiNwZi2hggCMbhIliyBNoTEKtUsqG/P8qvGKVCPhDQD2n7vBdoOsLgU9R5CoF4Zty8ODzuGf+wAEuuMIyGDI1IVFAy8RSUIqIZ2xyHo9Nzmud/9/OeXnzx89Lb0zNjHDp167hfKpbUauUakUfYcBBtBO2J3TH6tJy79X19zp2M0tJWoOtQlqEtRn6I+FQ1BVx349l8OXPXu3c3cqvtGfvzQj5zG9Uzw4Dse0AH3FgCoIoJ4J8ElSHCZW7cc+/YLf3/g2maQFfPTpyj3TsD6CiFtQJw7a7zYGDEGE/dB8GftWTT3Vf6genbZnIUVPNoKhGYV9QH1CbSNB+/EO4drNgYyueJnCrH7zAeufs/B0cpPtNy7mqxPrEBop93zi8GfuQRA2ikkeDRtYoLPT9b0joXsRcym6nMzRzRKmlaSmmirhrgW2LYHSJRpa3mbISQNfjoW6Wu6e/W/odUgNGqExgIaOgBc0gYQPKpCZW7OT1PS/OAO05+MX5LN5fBJE1wii+0vSYM/5QoX4gEdNwpofZ4QZ5i45E5nciUJx0fUECJZDEzetd3NJaiJEBshxmJsTEgabbfu1FUUgm+L7QBoWDLC9s+Q1AnNStsDgm+7vipytq5g1FsfFbSy/BK/YC4LNqkaqc0aTZuvA/yny8/OAooH8epSTecmgs1kgy0utxISkbSFd65pkBpoXwdVO3H4lBBcW7SYGE3qZ4fTXgoG9Smh2UJDIPh2qj5bB0Fb9fbstxoo2pYWi7XUA5Km3p2B1lrTnI+Melx9Prh61QU/bztUX7vafj4AinQZKzb4NKhLjXct48pTkCZ7acx9z4T0W2Fg5+9Fue5fda2aEw2RAMg5YaPBtd12McW3w0obQKM9uxJSEOlI5fZz7aC7NJ9rOyBi0DiHjTKxXvmxj/tHvx75w4/9kpr4FpPJDxDljAYPEIsxBOfeVAyAduL+sk/dZ4yG7bRqo1qfu08Wpr77rhd//PQwuDKw0iV3l2YPb2vFxe0uKqmoF9Jm28VfpaqXzK8EcAmhUWkD8YsfcM657dknOy6PjSGbU5zDzB2vh8bCH5/4i3+/h+DgyMgjQE/vuz54vS+u/HCIw60haCV17tvGmCc6Df8UiDcCEACOHz/ydeDrm3N9g+Wn7j4JNAGGga/c9ZniC6P+hhPjP/hQ69Ds8vlmKtO5iwgDVyFrtiKFXsWnATHaTuadfLg4p8ERkiYaPCYsUavKIgiPsUquZFCMVk8Rjj5LdPwJoupk1Iy7d6x8942f7VooP3jV4aeevRfmy/v/7gHggdxKims2XNk6cvToOUX0OuVCdIAF/JHOaQxVjX7z3/3+1VOz1Tu/+0L99ulEN8+ueCdNrWGPPkhX5WncvvtD2r1OdWCHjQbfZ6ON2zH5Eku9wXTU4KLFBkVEz34rRMDkS1aCxx95Cv/KI2pO7A1xc86qzVFe/96sbL76/cyNv7966vB//tFVdzy3LE3va4bo+/Wrbzsw/aefXpieHlm08dWu+HMC8IDZtWuXPDs8vOKaa2/cbde888oZ28fMQkLLxsFOjwX/8rDNVk5KKxIkwsjsKO7kgUbriW/8XzP0me9nI27KRtlPthWVGhRM8MG3t42Y4Iyono0SmEiax0f+SA8/NhsdffTj1th3mGyXDSZG0yb22JOkrXpg/eUhKa6IjIm3W9fc3j177Pd7H/yD/zoB/xGGLAyfdyPU4XxBxQBh/fr1m40xP8HG6vPLXVJYYV3XKmPWvRPb1UuYeFH12DPo6cP7zMLp/5FtsvskzAKsLXJtYc2WPblsxnf39lqTJEwP/mPSa38dfErukS+zfOJxvI2ZnBgnSVNq4+Ob5+EowEVdXK6F3l8JpXX/UvsvL+qGK9F8t7jxl5GZY2Rq0yGqTyfiGhnn/V9PTJz6FK/zIeS15YKlMIBzLi0UChhBaEyRb0wRyodJykfw66/EbtwB77wJbS30aNq8vDn5yhjf+4NngHp+2QYWF7eGEGw2b8zkgaeTqWPHhLCyODc6aOLMBu9D+3sokM/l/HyzybJ339afbBt6N8VVWyWTi00UI1OHhQN/S2b6EKZVUQ0+qBgjNjKqIb5Qmy7UAwRgYGCgxxjzLWPMTTaKIlVFg1fxzmvwxud6jV99KWHje2H1O9pvhaozh3zlzD3RC/dNFRqTX87m8nSXSj6bK0Rz5eqf73/+mV8H2L7j6r8rFfMfaDUb/tTUlE1aLZdueO+/ZfDanbbQd4ftXlGiXkbHnkPGnsHMjCo+CdgYjLUiBm1/bzygqp+bmJj4Nm3PfcMDEhfqAQowOjpaBm4dGBi4FLgT+Jgx5grJ5CNUsa4W7OjjqmNPii+uCb7/CiPrt2+1G6/4T0E8uuePkFyh3aB6IhvnuUctu1B79XWZ9sEHkLYWsPadN37Z9q5Dxw+g+7/nzamXMI2yqJigUTaSTMEKSghhKgT3feBb4+Pjw0uMfkPjfx4AS4uMjo6+DHwO+PymTZveh/efMMbcbmw8QJRFQ0BqpzV6ebeGQw/5sGKrukKfxcbtr32dz+SCC3y888Jy5zV6TggrGCvm5R965sbUlE8YQlDirCFbNEYwwfs0ePewqv4V8MDExMTMkjH+1KGOtxOAAmZoaMgMDw+7o0ePPgY8tnr16v9QLBZvBP9JEbnZZHJ9kAfvMNMvuUhRyeRFOq/DUufw6puLjQafqvfSUYkGg1eO7gFjROK8EWOMhoAG/6LCPc65e0+dOvXyknHZxaYu1Pg3CwAgdI6nSgeGDA8P16ampu4H7t+wYcPaOI5vE5FfAoZsrtiJF+0DTc650Gq1Qpr6s8EqTZMINBhjzrZrcl22DcefIej3vfffnJiYGOZcZO+8gCRwAe7+dgJYLAr44eFhFgcNMDY2Ngn8GfBnAwMDlwAfBj4qIlcaY4z3PtNoNHDOzS82lCRJGTBxHBtp7wmawftHReSvvPe7Jycnz7xm3P9fHJY+b7uvc4hZLr744uvy+fyvishAtVr9C+CBsbGxMsCmTZtWRlF0ey6X+3ilUnkxTdOvjY+PLz3+utTFL+gc8IWU/wdLrDwNADAn5QAAAABJRU5ErkJggg==";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Inter:wght@300;400;500;600&display=swap');
  @font-face {
    font-family: 'Counter-Strike';
    font-style: normal;
    font-weight: 400;
    src: local('Counter-Strike'), url('https://fonts.cdnfonts.com/s/63408/cs_regular.woff') format('woff');
  }

  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
  :focus{outline:none}
  :focus-visible{outline:2px solid ${C.accent};outline-offset:2px}
  body{background:${C.bg};color:${C.text};font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
  .df{font-family:'Counter-Strike','Inter',sans-serif;letter-spacing:.06em;font-weight:400}
  .mn{font-family:'JetBrains Mono',monospace}
  @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pu{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes dr{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
  .fi{animation:fi .4s ease forwards}
  .pu{animation:pu 2s infinite}
  .ni{display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:6px;cursor:pointer;transition:all .2s;color:${C.textMuted};font-size:12px;font-weight:500;letter-spacing:.01em;border:1px solid transparent;white-space:nowrap;overflow:hidden}
  .ni:hover{background:${C.surfaceAlt};color:${C.text}}
  .ni.ac{background:${C.accentGlow};color:${C.accent};border-color:rgba(41,168,255,.2)}
  .mc{background:rgba(13,16,24,.82);border:1px solid ${C.border};border-radius:8px;padding:20px;transition:border-color .2s;backdrop-filter:blur(8px)}
  .mc:hover{border-color:rgba(41,168,255,.18)}
  .btn{padding:10px 20px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.06em;text-transform:uppercase;border:none;font-family:'Inter',sans-serif}
  .bp{background:${C.accent};color:${C.bg}}.bp:hover{background:#45baff}
  .bg{background:transparent;color:${C.textMuted};border:1px solid ${C.border}}.bg:hover{border-color:${C.accent};color:${C.accent};background:${C.accentGlow}}
  .tg{display:inline-flex;align-items:center;padding:3px 8px;border-radius:3px;font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase}
  .ta{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .td{background:${C.pinkGlow};color:${C.pink};border:1px solid rgba(233,30,167,.22)}
  .tg2{background:${C.goldGlow};color:${C.gold};border:1px solid rgba(208,216,232,.2)}
  .tb{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .sl{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${C.textDim};margin-bottom:12px}
  .inp{background:rgba(17,21,32,.85);border:1px solid ${C.border};color:${C.text};border-radius:5px;padding:10px 14px;font-size:13px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;width:100%;backdrop-filter:blur(4px)}
  .inp:focus{border-color:${C.accent}}
  .inp option{background:${C.surfaceAlt}}
  .pb{height:3px;border-radius:2px;background:${C.border};overflow:hidden}
  .pf{height:100%;border-radius:2px;background:linear-gradient(90deg,${C.accent},${C.pink})}
  table{width:100%;border-collapse:collapse}
  th{text-align:left;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.textDim};padding:8px 12px;border-bottom:1px solid ${C.border}}
  td{padding:11px 12px;border-bottom:1px solid ${C.border};font-size:13px;color:${C.textMuted}}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:${C.surfaceAlt};color:${C.text}}
  hr.dv{border:none;border-top:1px solid ${C.border};margin:16px 0}
  .tradingview-widget-container{width:100%;border-radius:8px;overflow:hidden}
  .tradingview-widget-copyright{font-size:11px;color:${C.textDim};padding:6px 0}
  .tradingview-widget-copyright .blue-text{color:${C.accent};text-decoration:none}
  .tradingview-widget-copyright .trademark{color:${C.textDim}}
`;

const IC = ({ n, s = 16, c = "currentColor" }) => {
  const p = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    intel: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    edu: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    comm: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    acct: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    chart: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    admin: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 1 1-14.14 14.14A10 10 0 0 1 19.07 4.93z"/></>,
    journal: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    coach: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.96-3.1A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.96-3.1A2.5 2.5 0 0 0 14.5 2Z"/></>,
    trend: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    cal: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

const EqChart = ({ data, color = C.accent, h = 60 }) => {
  const w = 300, mn = Math.min(...data), mx = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / (mx - mn || 1)) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }} preserveAspectRatio="none">
      <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <path d={`M ${pts.split(" ")[0]} L ${pts} L ${w},${h} L 0,${h} Z`} fill="url(#eg)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" style={{ strokeDasharray: 1000, animation: "dr 2s ease forwards" }}/>
    </svg>
  );
};

const Radial = ({ val, max = 100, label, color = C.accent }) => {
  const r = 28, cx = 36, cy = 36, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth="3"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(val / max) * circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill={color} fontFamily="JetBrains Mono" fontSize="13">{val}</text>
      </svg>
      <span style={{ fontSize: 10, color: C.textDim, letterSpacing: ".08em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
};

const BgSVG = () => (
  <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rg1" cx="65%" cy="20%" r="65%"><stop offset="0%" stopColor="#29a8ff" stopOpacity=".13"/><stop offset="100%" stopColor="#080a0f" stopOpacity="0"/></radialGradient>
      <radialGradient id="rg2" cx="10%" cy="60%" r="45%"><stop offset="0%" stopColor="#29a8ff" stopOpacity=".07"/><stop offset="100%" stopColor="#080a0f" stopOpacity="0"/></radialGradient>
      <filter id="gw"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="1200" height="700" fill="#060810"/>
    <rect width="1200" height="700" fill="url(#rg1)"/>
    <rect width="1200" height="700" fill="url(#rg2)"/>
    <g stroke="#29a8ff" strokeOpacity=".18" strokeWidth=".7" fill="none">
      <line x1="120" y1="80" x2="280" y2="140"/><line x1="280" y1="140" x2="420" y2="60"/><line x1="420" y1="60" x2="560" y2="120"/>
      <line x1="560" y1="120" x2="680" y2="40"/><line x1="680" y1="40" x2="820" y2="100"/><line x1="820" y1="100" x2="960" y2="30"/>
      <line x1="960" y1="30" x2="1100" y2="90"/><line x1="120" y1="80" x2="200" y2="220"/><line x1="280" y1="140" x2="360" y2="250"/>
      <line x1="420" y1="60" x2="480" y2="210"/><line x1="560" y1="120" x2="600" y2="270"/><line x1="680" y1="40" x2="720" y2="190"/>
      <line x1="820" y1="100" x2="860" y2="240"/><line x1="960" y1="30" x2="1000" y2="170"/><line x1="1100" y1="90" x2="1120" y2="220"/>
      <line x1="200" y1="220" x2="360" y2="250"/><line x1="360" y1="250" x2="480" y2="210"/><line x1="480" y1="210" x2="600" y2="270"/>
      <line x1="600" y1="270" x2="720" y2="190"/><line x1="720" y1="190" x2="860" y2="240"/><line x1="860" y1="240" x2="1000" y2="170"/>
      <line x1="1000" y1="170" x2="1120" y2="220"/><line x1="120" y1="80" x2="360" y2="250"/><line x1="280" y1="140" x2="480" y2="210"/>
      <line x1="50" y1="160" x2="120" y2="80"/><line x1="50" y1="160" x2="200" y2="220"/>
    </g>
    <g stroke="#29a8ff" strokeOpacity=".45" strokeWidth=".9" fill="none">
      <line x1="420" y1="60" x2="680" y2="40"/><line x1="560" y1="120" x2="820" y2="100"/><line x1="480" y1="210" x2="720" y2="190"/>
    </g>
    <g fill="#29a8ff">
      <circle cx="120" cy="80" r="2.5" opacity=".7"/><circle cx="280" cy="140" r="2" opacity=".6"/>
      <circle cx="420" cy="60" r="3" opacity=".85"/><circle cx="560" cy="120" r="2" opacity=".6"/>
      <circle cx="680" cy="40" r="3.5" opacity=".9" filter="url(#gw)"/><circle cx="820" cy="100" r="2" opacity=".6"/>
      <circle cx="960" cy="30" r="2.5" opacity=".7"/><circle cx="1100" cy="90" r="2" opacity=".5"/>
      <circle cx="200" cy="220" r="2" opacity=".5"/><circle cx="360" cy="250" r="2.5" opacity=".55"/>
      <circle cx="480" cy="210" r="2" opacity=".5"/><circle cx="600" cy="270" r="2" opacity=".5"/>
      <circle cx="720" cy="190" r="2.5" opacity=".55"/><circle cx="860" cy="240" r="2" opacity=".5"/>
      <circle cx="50" cy="160" r="1.5" opacity=".4"/>
    </g>
    <g fill="#29a8ff" filter="url(#gw)">
      <circle cx="420" cy="60" r="4" opacity=".3"/><circle cx="680" cy="40" r="5" opacity=".3"/><circle cx="960" cy="30" r="3" opacity=".35"/>
    </g>
  </svg>
);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <BgSVG/>
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,.78)" }}/>
      <div className="fi" style={{ position: "relative", zIndex: 1, width: "min(380px,92vw)", padding: "clamp(24px,5vw,40px)", background: "rgba(13,16,24,.93)", border: `1px solid ${C.border}`, borderRadius: 10, backdropFilter: "blur(16px)", boxShadow: "0 0 60px rgba(41,168,255,.07)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {/* Icon + wordmark on same row, centred */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:8 }}>
            <img src={ICON_LOGIN} alt="Fortitude" style={{ width:54, height:54, objectFit:"contain", filter:"drop-shadow(0 0 7px rgba(41,168,255,0.32))" }}/>
            <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize: 34, fontWeight: 300, letterSpacing: ".06em", color: C.text }}>FORTITUDE</div>
          </div>
          <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize: 10, color: C.text, letterSpacing: ".16em", textTransform: "uppercase", marginTop: 4 }}>Market Intelligence Platform</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input className="inp" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}/>
          <input className="inp" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && onLogin()}/>
        </div>
        <button className="btn bp" style={{ width: "100%", padding: 12 }} onClick={onLogin}>Access Platform</button>
        <div style={{ textAlign: "center", marginTop: 14, display: "flex", justifyContent: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: C.textDim, cursor: "pointer" }}>Forgot password?</span>
          <span style={{ fontSize: 12, color: C.accent, cursor: "pointer" }}>Create Account</span>
        </div>
        <div style={{ marginTop: 22, padding: 12, background: C.surfaceAlt, borderRadius: 6, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.textDim, textAlign: "center", lineHeight: 1.7 }}>Fortitude is an educational platform. Content does not constitute financial advice.</p>
        </div>
      </div>
    </div>
  );
};


// ── TradingView Economic Calendar Widget ──────────────────────────────────────
const TVCalendarWidget = ({ height = 600 }) => {
  const container = useRef();
  useEffect(() => {
    if (!container.current) return;
    const existing = container.current.querySelector('script');
    if (existing) existing.remove();
    const widgetDiv = container.current.querySelector('.tradingview-widget-container__widget');
    if (widgetDiv) widgetDiv.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.textContent = JSON.stringify({
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: height,
      locale: "en",
      importanceFilter: "1",
      countryFilter: "us",
    });
    container.current.appendChild(script);
  }, []);
  return (
    <div className="tradingview-widget-container" ref={container} style={{ width:"100%", minHeight:height }}>
      <div className="tradingview-widget-container__widget" style={{ width:"100%", height:"100%" }}/>
    </div>
  );
};

// ── TradingView News Widget ───────────────────────────────────────────────────
const TVNewsWidget = () => {
  const container = useRef();
  useEffect(() => {
    if (!container.current) return;
    // Remove any existing script to prevent duplicates on re-render
    const existing = container.current.querySelector('script');
    if (existing) existing.remove();

    const widgetDiv = container.current.querySelector('.tradingview-widget-container__widget');
    if (widgetDiv) widgetDiv.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    // Must use textContent not innerHTML for script config
    script.textContent = JSON.stringify({
      displayMode: "adaptive",
      feedMode: "all_symbols",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      width: "100%",
      height: 450,
    });
    container.current.appendChild(script);
  }, []);

  return (
    <div style={{ marginTop:14 }}>
      <div className="sl" style={{ marginBottom:10 }}>Market News Feed</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <div className="tradingview-widget-container" ref={container} style={{ width:"100%",minHeight:450 }}>
          <div className="tradingview-widget-container__widget" style={{ width:"100%",height:"100%" }}/>
        </div>
        <div style={{ padding:"6px 16px",borderTop:`1px solid ${C.border}` }}>
          <a href="https://www.tradingview.com/news/top-providers/tradingview/" rel="noopener nofollow" target="_blank" style={{ fontSize:11,color:C.accent,textDecoration:"none" }}>Top stories</a>
          <span style={{ fontSize:11,color:C.textDim }}> by TradingView</span>
        </div>
      </div>
    </div>
  );
};

// ── Trading Sessions World Map — FMF Edition ──────────────────────────────────
// Fortitude Market Framework: AMD model with DST-aware session + killzone engine.
// All times computed in UTC. DST shifts for US (EDT/EST) and UK (BST/GMT) are
// detected dynamically via isUSDST() / isUKDST() — defined below getSession().
// Cape Town SAST (UTC+2, no DST) used as calibration reference only.
// ════════════════════════════════════════════════════════════════════════════════
// FMF SESSION ENGINE — Fortitude Market Framework (Authoritative Implementation)
// ════════════════════════════════════════════════════════════════════════════════
//
// CALIBRATION REFERENCE: Cape Town, South Africa (SAST = UTC+2, no DST).
// Used for human-QA of session times only. Must never override user timezones.
//
// CANONICAL FX SESSION ANCHORS (fixed UTC — OTC liquidity windows, not exchange):
//   Tokyo  (Accumulation):  00:00 – 09:00 UTC  (JST = UTC+9, no DST ever)
//   London (Manipulation):  07:00 – 16:00 UTC  (FIXED canonical — OTC FX)
//   NY     (Distribution):  13:00 – 22:00 UTC  (FIXED canonical — OTC FX)
//
// IMPORTANT: FX session UTC anchors are intentionally NOT DST-shifted.
// They represent OTC liquidity activity windows, not clock-based exchange hours.
// Source: BabyPips canonical FX session model (industry standard).
//
// NYSE EQUITY ANCHOR (DST-aware, NY-local exchange hours):
//   09:30 – 16:00 New York local → 13:30–20:00 UTC (EDT) / 14:30–21:00 UTC (EST)
// Used for equity indices / futures instruments only.
//
// DST RULES (programmatic — never hard-coded by year):
//   United States: 2nd Sunday March 02:00 EST → 1st Sunday November 02:00 EDT
//   United Kingdom: last Sunday March 01:00 UTC → last Sunday October 01:00 UTC
//   Japan: no DST, JST = UTC+9 always.
//
// TRANSITION MISMATCH WINDOWS (computed per-date, not approximated):
//   March:   US switches 2nd Sunday March; UK switches last Sunday March
//            → ~2 weeks where US is EDT but UK is still GMT
//   Oct/Nov: UK reverts last Sunday October; US reverts 1st Sunday November
//            → ~1 week where UK is GMT but US is still EDT
// ════════════════════════════════════════════════════════════════════════════════

/**
 * AUTHORITATIVE DST detection using IANA timezone database via Intl.
 * Delegates entirely to the browser/engine tz database — handles all edge cases,
 * leap years, and historical rule changes without any arithmetic approximation.
 *
 * Method: compare the UTC offset of the test date against a known-winter date
 * (mid-January). If the offset is larger (less negative / more positive), DST active.
 *
 * @param {Date} d - the date to test
 * @param {string} tz - IANA timezone name ('America/New_York' or 'Europe/London')
 * @returns {boolean} true if DST (summer time) is active on date d in timezone tz
 */
function _isDST(d, tz) {
  // Get UTC hour offset for the test date and a mid-January reference in the same year.
  // Intl.DateTimeFormat is the authoritative bridge to the IANA tz database.
  const getUTCOffset = (dt) => {
    const utcH   = dt.getUTCHours();
    const localH = parseInt(
      new Intl.DateTimeFormat("en", { timeZone: tz, hour: "numeric", hour12: false }).format(dt),
      10
    );
    // Normalise to handle midnight edge (24→0)
    const diff = ((localH - utcH) + 24) % 24;
    // Convert to signed offset: offsets > 12 are actually negative (e.g. UTC-5 = 24-5=19 → -5)
    return diff > 12 ? diff - 24 : diff;
  };
  const jan15 = new Date(Date.UTC(d.getUTCFullYear(), 0, 15, 12, 0)); // mid-Jan, noon UTC
  return getUTCOffset(d) > getUTCOffset(jan15);
}

/** Returns true if date d is in US Daylight Saving Time (EDT = UTC-4). */
const isUSDST = (d) => _isDST(d, "America/New_York");

/** Returns true if date d is in UK British Summer Time (BST = UTC+1). */
const isUKDST = (d) => _isDST(d, "Europe/London");

/**
 * Compute NYSE equity session UTC boundaries for a given date.
 * NYSE core hours: 09:30–16:00 New York local.
 * Returns decimal UTC hours.
 *
 * @param {Date} d
 * @returns {{ open: number, close: number, isDST: boolean }}
 */
function getNYSEWindow(d) {
  const dst = isUSDST(d);
  // EDT = UTC-4 → add 4h; EST = UTC-5 → add 5h
  const offset = dst ? 4 : 5;
  return {
    open:  9.5  + offset,  // 09:30 NY-local → 13:30 UTC (EDT) or 14:30 UTC (EST)
    close: 16.0 + offset,  // 16:00 NY-local → 20:00 UTC (EDT) or 21:00 UTC (EST)
    isDST: dst,
  };
}

/**
 * Compute all FMF session windows and killzones for a given Date.
 *
 * FX SESSIONS — canonical UTC anchors (FIXED — not DST-shifted):
 *   Asia    00:00–09:00 UTC  (Tokyo JST, no DST)
 *   London  07:00–16:00 UTC  (OTC FX canonical)
 *   NY      13:00–22:00 UTC  (OTC FX canonical)
 *
 * KILLZONES (derived from fixed FX anchors):
 *   London KZ:     07:00–09:00 UTC  (first 2h — Asian range sweep)
 *   NY KZ:         13:00–15:00 UTC  (first 2h — institutional entries)
 *   LDN–NY Overlap: 13:00–16:00 UTC (NY open until London closes — peak liquidity)
 *   London Close:  15:00–16:00 UTC  (final 1h — position closeout)
 *
 * NYSE EQUITY anchor (DST-aware, for index/equity instruments):
 *   13:30–20:00 UTC (EDT) / 14:30–21:00 UTC (EST)
 *
 * DST metadata is provided for the UI banner only — it does not shift FX anchors.
 *
 * @param {Date} d
 * @returns {object} window boundaries in UTC decimal hours + DST metadata
 */
function getFMFWindows(d) {
  const ukDST = isUKDST(d);
  const usDST = isUSDST(d);
  const nyse  = getNYSEWindow(d);

  // ── FX canonical anchors — FIXED UTC (OTC liquidity, not clock-based) ────
  const FX = {
    asia:   { open:  0, close:  9 },   // 00:00–09:00 UTC always
    london: { open:  7, close: 16 },   // 07:00–16:00 UTC always
    ny:     { open: 13, close: 22 },   // 13:00–22:00 UTC always
  };

  // ── FMF Killzones (derived from fixed FX anchors) ─────────────────────────
  const KZ = {
    ldnKZ:    { open:  7, close:  9  },  // London open KZ — first 2h
    nyKZ:     { open: 13, close: 15  },  // NY open KZ — first 2h
    overlap:  { open: 13, close: 16  },  // LDN–NY peak liquidity
    ldnClose: { open: 15, close: 16  },  // London close KZ — final 1h
  };

  // ── Market-local times (for display / instrument-specific logic) ──────────
  // London local = UTC + (0 or +1 for BST)
  // NY local = UTC - (4 EDT or 5 EST)
  const localLdn = {
    open:  FX.london.open  + (ukDST ? 1 : 0),   // 08:00 BST or 07:00 GMT
    close: FX.london.close + (ukDST ? 1 : 0),   // 17:00 BST or 16:00 GMT
  };
  const localNY = {
    open:  FX.ny.open  - (usDST ? 4 : 5),       // 09:00 EDT or 08:00 EST
    close: FX.ny.close - (usDST ? 4 : 5),        // 18:00 EDT or 17:00 EST
  };

  return {
    // FX sessions (fixed UTC)
    asia:      FX.asia,
    london:    FX.london,
    ny:        FX.ny,
    // FMF killzones (fixed UTC)
    ldnKZ:     KZ.ldnKZ,
    nyKZ:      KZ.nyKZ,
    overlap:   KZ.overlap,
    ldnClose:  KZ.ldnClose,
    // NYSE equity window (DST-aware UTC)
    nyse,
    // Market-local for display
    localLdn, localNY,
    // DST metadata (UI banner only — does NOT affect FX anchor values)
    ukDST, usDST,
    // Mismatch window: both DSTs differ
    dstMismatch: ukDST !== usDST,
  };
}

/**
 * Classify a trade timestamp into an FMF AMD session label.
 * Uses fixed canonical FX UTC anchors. Per-date DST booleans used for
 * the DST-specific killzone labels only (LDN/NY KZ are fixed anchor-derived).
 *
 * Priority order (most specific first — killzones > sessions):
 *   LDN–NY Overlap+NY KZ → LDN–NY Overlap+LDN KZ → London Close →
 *   LDN–NY Overlap → NY Open Window → London Open Window →
 *   Asia → London → New York → Asia Pre-Market → Off-Hours
 *
 * @param {string|Date} timeStr - ISO timestamp string or Date object
 * @returns {string} FMF session label
 */
function getSession(timeStr) {
  if (!timeStr) return "Unknown";
  const d = new Date(timeStr);
  if (isNaN(d)) return "Unknown";

  const w   = getFMFWindows(d);
  const utc = d.getUTCHours() + d.getUTCMinutes() / 60;

  const inR = (open, close) => utc >= open && utc < close;

  // Killzones first (highest specificity)
  if (inR(w.overlap.open,  w.overlap.close)  && inR(w.nyKZ.open,  w.nyKZ.close))  return "NY Open Window";
  if (inR(w.overlap.open,  w.overlap.close)  && inR(w.ldnKZ.open, w.ldnKZ.close)) return "London Open Window";
  if (inR(w.ldnClose.open, w.ldnClose.close))                                      return "London Close";
  if (inR(w.overlap.open,  w.overlap.close))                                       return "LDN–NY Overlap";
  if (inR(w.nyKZ.open,     w.nyKZ.close))                                          return "NY Open Window";
  if (inR(w.ldnKZ.open,    w.ldnKZ.close))                                         return "London Open Window";
  // Broad sessions
  if (inR(w.asia.open,     w.asia.close))                                          return "Asia";
  if (inR(w.london.open,   w.london.close))                                        return "London";
  if (inR(w.ny.open,       w.ny.close))                                            return "New York";
  // Pre-market / off-hours
  if (utc >= 22)                                                                    return "Asia Pre-Market";
  return "Off-Hours";
}

// ── QA Self-test (runs once on load, logs to console, never throws) ───────────
// Test cases: SAST (UTC+2) calibration reference per authoritative spec.
// Both DST active (BST+EDT): London 09:00–18:00 SAST, NY 15:00–00:00 SAST
// Both standard (GMT+EST):   London 09:00–18:00 SAST, NY 15:00–00:00 SAST
// Note: FX anchors are fixed UTC so SAST conversion is always UTC+2.
(() => {
  const assert = (label, got, expected) => {
    if (got !== expected) console.warn(`[FMF QA] FAIL ${label}: got "${got}" expected "${expected}"`);
  };
  // Trade during LDN–NY overlap + NY KZ (13:30 UTC → NY Open Window)
  assert("NY KZ at 13:30 UTC",      getSession("2026-06-15T13:30:00Z"), "NY Open Window");
  // Trade during London KZ (07:30 UTC → London Open Window)
  assert("LDN KZ at 07:30 UTC",     getSession("2026-06-15T07:30:00Z"), "London Open Window");
  // Trade during LDN–NY overlap non-KZ (14:00 UTC → LDN–NY Overlap)
  assert("Overlap at 14:00 UTC",    getSession("2026-06-15T14:00:00Z"), "LDN–NY Overlap");
  // Trade during London Close KZ (15:30 UTC → London Close)
  assert("LDN Close at 15:30 UTC",  getSession("2026-06-15T15:30:00Z"), "London Close");
  // Trade in Asia session (03:00 UTC → Asia)
  assert("Asia at 03:00 UTC",       getSession("2026-06-15T03:00:00Z"), "Asia");
  // Trade in NY session outside KZ (18:00 UTC → New York)
  assert("NY session at 18:00 UTC", getSession("2026-06-15T18:00:00Z"), "New York");
  // Trade off-hours (22:30 UTC → Asia Pre-Market)
  assert("Pre-market at 22:30 UTC", getSession("2026-06-15T22:30:00Z"), "Asia Pre-Market");
})();


const TradingSessionsMap = () => {
  const [now, setNow] = useState(new Date());
  const svgRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── DST-aware city clocks via IANA timezones ──────────────────────────────
  // Intl.DateTimeFormat handles all DST transitions automatically per locale rules.
  const getCityTime = (tzName) => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: tzName,
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false,
    });
    return fmt.format(now);
  };

  // ── Compute live FMF windows for current time ─────────────────────────────
  const fmf = getFMFWindows(now);

  // ── Exchange open/close UTC hours (DST-aware where applicable) ────────────
  // Tokyo Stock Exchange (TSE):  09:00–15:30 JST = 00:00–06:30 UTC (no DST)
  // London Stock Exchange (LSE): 08:00–16:30 London local
  //   → BST (UTC+1): 07:00–15:30 UTC  |  GMT (UTC+0): 08:00–16:30 UTC
  // New York Stock Exchange (NYSE): 09:30–16:00 NY local
  //   → EDT (UTC-4): 13:30–20:00 UTC  |  EST (UTC-5): 14:30–21:00 UTC
  const EXCHANGE = {
    tse:  { open: 0,                        close: 6.5                        },  // 00:00–06:30 UTC always
    lse:  { open: fmf.ukDST ? 7   : 8,     close: fmf.ukDST ? 15.5 : 16.5   },  // DST-aware
    nyse: { open: fmf.usDST ? 13.5 : 14.5, close: fmf.usDST ? 20   : 21     },  // DST-aware
  };

  // ── Helper: format decimal UTC hour as HH:MM ─────────────────────────────
  const fmtUTC = (h) => `${String(Math.floor(h)).padStart(2,"0")}:${h % 1 === 0.5 ? "30" : "00"}`;

  // ── Session definitions ───────────────────────────────────────────────────
  // Each session has:
  //   fxOpen/fxClose  — canonical OTC FX liquidity window (fixed UTC)
  //   exOpen/exClose  — actual exchange open/close (DST-aware UTC)
  //   openUTC/closeUTC — used for clock card "is session open" state (FX window)
  const SESSIONS = [
    {
      id: "tokyo", label: "Tokyo", region: "Asia",
      tz: "Asia/Tokyo",
      exchange: "Tokyo Stock Exchange",
      exchangeShort: "TSE",
      openUTC: fmf.asia.open, closeUTC: fmf.asia.close,       // FX: 00:00–09:00 UTC
      fxOpen: fmf.asia.open,  fxClose: fmf.asia.close,
      exOpen: EXCHANGE.tse.open, exClose: EXCHANGE.tse.close,  // TSE: 00:00–06:30 UTC
      localExOpen: "09:00", localExClose: "15:30",              // JST always
    },
    {
      id: "london", label: "London", region: "Europe",
      tz: "Europe/London",
      exchange: "London Stock Exchange",
      exchangeShort: "LSE",
      openUTC: fmf.london.open, closeUTC: fmf.london.close,    // FX: 07:00–16:00 UTC
      fxOpen: fmf.london.open,  fxClose: fmf.london.close,
      exOpen: EXCHANGE.lse.open, exClose: EXCHANGE.lse.close,  // LSE: 07/08–15:30/16:30 UTC
      localExOpen: "08:00", localExClose: "16:30",              // always London local
    },
    {
      id: "newyork", label: "New York", region: "Americas",
      tz: "America/New_York",
      exchange: "New York Stock Exchange",
      exchangeShort: "NYSE",
      openUTC: fmf.ny.open, closeUTC: fmf.ny.close,            // FX: 13:00–22:00 UTC
      fxOpen: fmf.ny.open,  fxClose: fmf.ny.close,
      exOpen: EXCHANGE.nyse.open, exClose: EXCHANGE.nyse.close, // NYSE: 13:30/14:30–20/21 UTC
      localExOpen: "09:30", localExClose: "16:00",              // always NY local
    },
  ];

  // ── Killzone definitions — derived from live FMF windows ─────────────────
  const LIQUIDITY_WINDOWS = [
    {
      id: "ldnKZ", label: "London Open Window",
      open: fmf.ldnKZ.open, close: fmf.ldnKZ.close,
      color: "#e91ea7",
      desc: "Asian range sweep · Stop hunts · First directional move",
    },
    {
      id: "overlap", label: "LDN–NY Overlap",
      open: fmf.overlap.open, close: fmf.overlap.close,
      color: "#29a8ff",
      desc: "Highest global liquidity · XAUUSD priority · Institutional flow",
      gold: true,
    },
    {
      id: "nyKZ", label: "New York Open Window",
      open: fmf.nyKZ.open, close: fmf.nyKZ.close,
      color: "#e91ea7",
      desc: "Macro data reactions · Institutional entries · Trend continuation",
    },
    {
      id: "ldnClose", label: "London Close",
      open: fmf.ldnClose.open, close: fmf.ldnClose.close,
      color: "#d0d8e8",
      desc: "Position closing · Liquidity spikes · Reversals",
    },
  ];

  // ── Helper: format seconds into h/m/s string ──────────────────────────────
  const fmtSecs = (secs) => {
    const abs = Math.abs(secs);
    const h   = Math.floor(abs / 3600);
    const m   = Math.floor((abs % 3600) / 60);
    const s   = Math.floor(abs % 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  };

  // ── Compute live state for a session card ─────────────────────────────────
  const getState = (s) => {
    const utc     = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    const isOpen  = utc >= s.openUTC && utc < s.closeUTC;
    const span    = (s.closeUTC - s.openUTC) * 3600;
    const elapsed = (utc - s.openUTC) * 3600;
    const remain  = (s.closeUTC - utc) * 3600;
    const tillOpn = ((s.openUTC - utc + 24) % 24) * 3600;
    const pct     = isOpen ? Math.min(100, (elapsed / span) * 100) : 0;
    const color   = isOpen ? C.accent : C.pink;
    return { isOpen, pct, color, cityTime: getCityTime(s.tz), countdown: isOpen ? fmtSecs(remain) : fmtSecs(tillOpn) };
  };

  // ── Compute live state for a killzone row ────────────────────────────────
  const getKZState = (kz) => {
    const utc    = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    const isLive = utc >= kz.open && utc < kz.close;
    // Format open/close as HH:MM UTC
    const fmtH = (h) => `${String(Math.floor(h)).padStart(2,"0")}:${String(Math.round((h%1)*60)).padStart(2,"0")}`;
    return { isLive, openStr: fmtH(kz.open), closeStr: fmtH(kz.close) };
  };

  // ── DST state banner text ─────────────────────────────────────────────────
  const dstBanner = (() => {
    const parts = [];
    if (fmf.ukDST)  parts.push("UK BST");
    else            parts.push("UK GMT");
    if (fmf.usDST)  parts.push("US EDT");
    else            parts.push("US EST");
    if (fmf.dstMismatch) parts.push("⚠ DST mismatch");
    return parts.join(" · ");
  })();

  const utcTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(now) + " UTC";

  // ── Active session label ─────────────────────────────────────────────────
  const activeFMFPhase = (() => {
    const utc = now.getUTCHours() + now.getUTCMinutes() / 60;
    const activeKZ = LIQUIDITY_WINDOWS.find(kz => utc >= kz.open && utc < kz.close);
    if (activeKZ) return { label: activeKZ.label, color: C.accent };
    if (utc >= fmf.london.open && utc < fmf.london.close) return { label: "London Session", color: C.accent };
    if (utc >= fmf.ny.open     && utc < fmf.ny.close)     return { label: "New York Session", color: C.accent };
    if (utc >= fmf.asia.open   && utc < fmf.asia.close)   return { label: "Asia Session", color: C.accent };
    if (utc >= 22) return { label: "Asia Pre-Market", color: C.textDim };
    return { label: "Off-Hours", color: C.textDim };
  })();

  // ── D3 world map ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;

    // Load D3 and world topojson dynamically
    const loadMap = async () => {
      try {
        // Load D3
        if (!window.d3) {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js";
            s.onload = resolve; s.onerror = reject;
            document.head.appendChild(s);
          });
        }
        // Load topojson
        if (!window.topojson) {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js";
            s.onload = resolve; s.onerror = reject;
            document.head.appendChild(s);
          });
        }

        // Fetch world topology
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        const world = await res.json();

        const d3 = window.d3;
        const svg = d3.select(svgRef.current);
        const W = 900, H = 460;

        svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");

        // Natural Earth projection — zoomed in, centred on Atlantic (shows all 3 trading cities well)
        const projection = d3.geoNaturalEarth1()
          .scale(W / 4.2)
          .center([20, 20])
          .translate([W / 2, H / 2]);

        const path = d3.geoPath().projection(projection);
        const countries = topojson.feature(world, world.objects.countries);
        const borders   = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

        // Clear previous renders
        svg.selectAll("*").remove();

        // Ocean
        svg.append("rect").attr("width", W).attr("height", H)
          .attr("fill", "rgba(8,10,20,0.0)");

        // Graticule (lat/lon grid lines)
        const graticule = d3.geoGraticule()();
        svg.append("path").datum(graticule)
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "#18202e")
          .attr("stroke-width", "0.4")
          .attr("opacity", "0.6");

        // Equator line
        const equator = { type: "LineString", coordinates: [[-180,0],[180,0]] };
        svg.append("path").datum(equator)
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "#243040")
          .attr("stroke-width", "0.8");

        // Land fill
        svg.append("g").selectAll("path")
          .data(countries.features)
          .enter().append("path")
          .attr("d", path)
          .attr("fill", "#111520")
          .attr("stroke", "#18202e")
          .attr("stroke-width", "0.5");

        // Country borders
        svg.append("path").datum(borders)
          .attr("d", path)
          .attr("fill", "none")
          .attr("stroke", "#18202e")
          .attr("stroke-width", "0.3");

        // Session pins — project [lng, lat] to screen coords
        const cities = [
          { id:"tokyo",   lng: 139.69, lat: 35.69 },
          { id:"london",  lng: -0.12,  lat: 51.50 },
          { id:"newyork", lng: -74.00, lat: 40.71 },
        ];

        cities.forEach(city => {
          const [cx, cy] = projection([city.lng, city.lat]);
          if (!cx || !cy) return;

          // Store projected coords on session objects for React overlay
          const sess = SESSIONS.find(s => s.id === city.id);
          if (sess) { sess._cx = cx; sess._cy = cy; }

          // Glow ellipse
          svg.append("ellipse")
            .attr("id", `glow-${city.id}`)
            .attr("cx", cx).attr("cy", cy)
            .attr("rx", 38).attr("ry", 22)
            .attr("fill", "transparent")
            .attr("stroke", "#29a8ff")
            .attr("stroke-width", "0.8")
            .attr("opacity", "0.3")
            .attr("stroke-dasharray", "3,3");

          // Pin dot
          svg.append("circle")
            .attr("id", `pin-${city.id}`)
            .attr("cx", cx).attr("cy", cy)
            .attr("r", 4)
            .attr("fill", "#0d1018")
            .attr("stroke", "#29a8ff")
            .attr("stroke-width", "1.5");

          // City label
          svg.append("text")
            .attr("id", `label-${city.id}`)
            .attr("x", cx).attr("y", cy - 10)
            .attr("text-anchor", "middle")
            .attr("font-size", "9")
            .attr("fill", "#56677a")
            .attr("font-family", "Inter,sans-serif")
            .attr("font-weight", "600")
            .text(city.id === "newyork" ? "New York" : city.id === "london" ? "London" : "Tokyo");
        });

        setMapReady(true);
      } catch (err) {
        console.error("Map load failed:", err);
        setMapReady(false);
      }
    };

    loadMap();
  }, []); // Only run once on mount

  // ── Update pin colours every second based on session state ──────────────────
  useEffect(() => {
    if (!mapReady || !window.d3) return;
    const d3 = window.d3;
    const svg = d3.select(svgRef.current);

    SESSIONS.forEach(s => {
      const st = getState(s);
      const color = st.isOpen ? C.accent : C.pink;

      svg.select(`#glow-${s.id}`)
        .attr("stroke", color)
        .attr("fill", st.isOpen ? `${color}15` : "transparent")
        .attr("opacity", st.isOpen ? "0.8" : "0.3")
        .attr("stroke-dasharray", st.isOpen ? "none" : "3,3")
        .attr("stroke-width", st.isOpen ? "1.2" : "0.6");

      svg.select(`#pin-${s.id}`)
        .attr("fill", st.isOpen ? color : "#0d1018")
        .attr("stroke", color)
        .attr("r", st.isOpen ? 5 : 3.5)
        .style("filter", st.isOpen ? `drop-shadow(0 0 6px ${color}cc)` : "none");

      svg.select(`#label-${s.id}`)
        .attr("fill", st.isOpen ? color : C.textDim);
    });
  }, [now, mapReady]);

  return (
    <div className="mc" style={{ padding:"14px 18px", marginBottom:14 }}>

      {/* Header row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div className="sl" style={{ marginBottom:0 }}>Trading Sessions</div>
          {/* Active FMF Phase badge */}
          <span style={{
            fontSize:9, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase",
            padding:"2px 8px", borderRadius:3,
            background:`${activeFMFPhase.color}18`, color:activeFMFPhase.color,
            border:`1px solid ${activeFMFPhase.color}40`,
          }}>
            {activeFMFPhase.label}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:9, color:C.textDim, fontWeight:500 }}>{dstBanner}</span>
          <span className="mn" style={{ fontSize:11, color:C.textDim }}>{utcTime}</span>
        </div>
      </div>

      {/* Session clock cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:10, marginBottom:14 }}>
        {SESSIONS.map(s => {
          const st = getState(s);
          const utcNow = now.getUTCHours() + now.getUTCMinutes() / 60;
          const exIsOpen = utcNow >= s.exOpen && utcNow < s.exClose;
          return (
            <div key={s.id} style={{
              padding:"12px 14px", borderRadius:7,
              border:`1px solid ${st.isOpen ? st.color + "55" : st.color + "33"}`,
              background: st.isOpen ? `${st.color}0a` : `${st.color}05`,
              transition:"all .3s"
            }}>
              {/* City name + FX status */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <span style={{
                    width:6, height:6, borderRadius:"50%", background:st.color,
                    display:"inline-block", flexShrink:0,
                    boxShadow: st.isOpen ? `0 0 8px ${st.color}` : "none",
                    animation: st.isOpen ? "pu 2s infinite" : "none",
                    opacity: st.isOpen ? 1 : 0.45,
                  }}/>
                  <span style={{ fontSize:13, fontWeight:600, color:st.isOpen ? st.color : C.textMuted }}>
                    {s.label}
                  </span>
                </div>
                <span style={{ fontSize:9, letterSpacing:".1em", fontWeight:700, color:st.isOpen ? st.color : C.pink, textTransform:"uppercase", opacity:st.isOpen ? 1 : 0.7 }}>
                  {st.isOpen ? "FX OPEN" : "FX CLOSED"}
                </span>
              </div>

              {/* Live city clock */}
              <div className="mn" style={{ fontSize:22, lineHeight:1, marginBottom:6, letterSpacing:".04em", color:st.isOpen ? st.color : C.textDim }}>
                {st.cityTime}
              </div>
              {/* Exchange hours row */}
              <div style={{
                padding:"6px 8px", borderRadius:4, marginBottom:6,
                background: exIsOpen ? `${st.color}12` : "rgba(0,0,0,.2)",
                border:`1px solid ${exIsOpen ? st.color + "40" : C.border}`,
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                <div>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:".06em", color: exIsOpen ? st.color : C.textDim }}>
                    {s.exchangeShort}
                  </span>
                  <span style={{ fontSize:9, color:C.textDim, marginLeft:5 }}>
                    {s.localExOpen}–{s.localExClose} local · {fmtUTC(s.exOpen)}–{fmtUTC(s.exClose)} UTC
                  </span>
                </div>
                <span style={{ fontSize:9, fontWeight:700, color: exIsOpen ? st.color : C.textDim, opacity: exIsOpen ? 1 : 0.5 }}>
                  {exIsOpen ? "● OPEN" : "CLOSED"}
                </span>
              </div>
              {/* FX liquidity window */}
              <div style={{ fontSize:9, color:C.textDim, marginBottom:6, opacity:.7 }}>
                FX liquidity: <span className="mn">{fmtUTC(s.fxOpen)}–{fmtUTC(s.fxClose)} UTC</span>
              </div>
              {/* Progress bar — FX window */}
              {st.isOpen && (
                <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden", marginBottom:4 }}>
                  <div style={{
                    width:`${st.pct}%`, height:"100%",
                    background:`linear-gradient(90deg,${st.color}70,${st.color})`,
                    borderRadius:2, transition:"width 1s linear"
                  }}/>
                </div>
              )}
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:9, color:C.textDim }}>{st.isOpen ? "FX closes in" : "FX opens in"}</span>
                <span className="mn" style={{ fontSize:9, color:st.isOpen ? st.color : C.textDim }}>{st.countdown}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FMF Killzones panel */}
      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
          <div style={{ fontSize:10, fontWeight:600, color:C.textMuted, letterSpacing:".08em", textTransform:"uppercase" }}>
            Key Liquidity Windows
          </div>
          <div style={{ fontSize:9, color:C.textDim }}>Fixed UTC anchors · OTC FX liquidity windows</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:8 }}>
          {LIQUIDITY_WINDOWS.map(kz => {
            const kzs = getKZState(kz);
            return (
              <div key={kz.id} style={{
                padding:"10px 12px", borderRadius:6, position:"relative",
                border:`1px solid ${kzs.isLive ? C.accent + "50" : C.border}`,
                background: kzs.isLive ? "rgba(41,168,255,0.06)" : "rgba(13,16,24,.4)",
                transition:"all .3s",
              }}>
                {kzs.isLive && (
                  <span style={{
                    position:"absolute", top:8, right:8,
                    width:5, height:5, borderRadius:"50%", background:C.accent,
                    animation:"pu 1.5s infinite", boxShadow:`0 0 6px ${C.accent}`,
                  }}/>
                )}
                {kz.gold && (
                  <span style={{ position:"absolute", top:6, right:kzs.isLive ? 22 : 8, fontSize:8, fontWeight:700, color:C.gold, letterSpacing:".08em" }}>GOLD ★</span>
                )}
                <div style={{ fontSize:11, fontWeight:600, color:C.text, marginBottom:3 }}>{kz.label}</div>
                <div className="mn" style={{ fontSize:11, color:kzs.isLive ? C.accent : C.textDim, marginBottom:4 }}>
                  {kzs.openStr}–{kzs.closeStr} <span style={{ fontFamily:"inherit", fontSize:9, color:C.textDim }}>UTC</span>
                </div>
                <div style={{ fontSize:9, color:C.textMuted, lineHeight:1.6 }}>{kz.desc}</div>
                {kzs.isLive && (
                  <div style={{ fontSize:9, fontWeight:700, color:C.accent, marginTop:4, letterSpacing:".06em" }}>● ACTIVE NOW</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* D3 World Map */}
      <div style={{ borderRadius:6, overflow:"hidden", background:"rgba(6,8,16,.7)", border:`1px solid ${C.border}`, position:"relative", marginBottom:14 }}>
        {!mapReady && (
          <div style={{ padding:"40px", textAlign:"center", fontSize:12, color:C.textDim }}>Loading map…</div>
        )}
        <svg ref={svgRef} style={{ width:"100%", height:"auto", display: mapReady ? "block" : "none" }}/>
      </div>

      {/* Session overview — below the map, secondary reference */}
      <div style={{
        display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:10,
      }}>
        {[
          { term:"Asia", utc:"00:00–09:00", text:"Lower volatility. Ranges tend to consolidate overnight. Provides the liquidity pools that London and New York trade against." },
          { term:"London", utc:"07:00–16:00", text:"Highest volume globally. Major directional moves and breakouts most frequently originate here. Peak institutional participation." },
          { term:"New York", utc:"13:00–22:00", text:"Overlaps with London for the first three hours, driving peak global liquidity. Key US data releases and trend continuation or reversal." },
        ].map(({ term, utc, text }) => (
          <div key={term} style={{
            padding:"12px 14px", borderRadius:6,
            background:"rgba(13,16,24,.4)", border:`1px solid ${C.border}`,
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
              <span style={{ fontSize:12, fontWeight:600, color:C.text }}>{term}</span>
              <span className="mn" style={{ fontSize:10, color:C.textDim }}>{utc} UTC</span>
            </div>
            <p style={{ margin:0, fontSize:11, color:C.textMuted, lineHeight:1.7 }}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ setPage }) => {
  const eq = [100,98,102,107,105,110,108,115,112,118,116,122,120,125,128,124,130,135,132,138];
  const revenge    = computeRevengeScore(TRADE_DATA);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability([100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130]);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const pdiMeta    = pdiLabel(pdi);

  // ── User location clock ─────────────────────────────────────────────────────
  const [userClock, setUserClock] = useState({ city: null, tz: null, time: "", loading: true });
  const [clockNow, setClockNow] = useState(new Date());

  useEffect(() => {
    // Tick every second
    const t = setInterval(() => setClockNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Detect city + timezone from IP via ipapi.co (free, no key required)
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        setUserClock(prev => ({
          ...prev,
          city: data.city || data.country_name || "Your Location",
          tz: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          loading: false,
        }));
      })
      .catch(() => {
        // Fallback: use browser timezone if IP lookup fails
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const city = tz.split("/").pop().replace(/_/g, " ");
        setUserClock(prev => ({ ...prev, city, tz, loading: false }));
      });
  }, []);

  // Format live time in user's detected timezone
  const userTime = userClock.tz
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: userClock.tz,
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }).format(clockNow)
    : "";

  const userDate = userClock.tz
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: userClock.tz,
        weekday: "short", day: "numeric", month: "short",
      }).format(clockNow)
    : "";

  return (
    <div className="fi">
      <div className="dash-header" style={{ marginBottom: 20, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
        <div>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize: 28, fontWeight: 300, marginBottom: 6 }}>Market Intelligence Dashboard</h1>
          <p style={{ color: C.textMuted, fontSize: 13 }}>Structured analysis. Probabilistic framing. Institutional methodology.</p>
        </div>
        {/* User location clock */}
        <div className="dash-header-clock" style={{
          flexShrink:0, textAlign:"right",
          padding:"10px 16px", borderRadius:8,
          border:`1px solid ${C.border}`,
          background:"rgba(13,16,24,.7)",
          backdropFilter:"blur(8px)",
          minWidth:160,
        }}>
          {userClock.loading ? (
            <div style={{ fontSize:11, color:C.textDim }}>Locating…</div>
          ) : (
            <>
              <div className="mn" style={{ fontSize:22, color:C.text, letterSpacing:".04em", lineHeight:1, marginBottom:3 }}>
                {userTime}
              </div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text, marginBottom:1 }}>
                {userClock.city}
              </div>
              <div style={{ fontSize:10, color:C.textDim }}>{userDate}</div>
            </>
          )}
        </div>
      </div>

      {/* Main two-column layout: content left, calendar right */}
      <div className="dash-grid" style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) 300px", gap:14, alignItems:"start" }}>

        {/* LEFT COLUMN — sessions, stats, PDI, analyses, update, news */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <TradingSessionsMap/>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12 }} className="stats-grid">
            {[{l:"Analyses Completed",v:"47",s:"This month",c:C.accent},{l:"Current Tier",v:"FMF Owner",s:"Full access",c:C.accent},{l:"Course Progress",v:"68%",s:"FMF Course",c:C.gold},{l:"Community Posts",v:"12",s:"Contributions",c:C.textMuted}].map(m=>(
              <div key={m.l} className="mc">
                <div className="sl">{m.l}</div>
                <div className="mn" style={{ fontSize:24,color:m.c,fontWeight:400,lineHeight:1.1 }}>{m.v}</div>
                <div style={{ fontSize:11,color:C.textDim,marginTop:4 }}>{m.s}</div>
              </div>
            ))}
          </div>

          {/* PDI summary banner */}
          <div className="mc pdi-banner" style={{ display:"flex",alignItems:"center",gap:18,padding:"14px 20px",borderColor:pdiMeta.color,background:`linear-gradient(90deg,rgba(13,16,24,.92),${pdiMeta.color}08)`,cursor:"pointer" }} onClick={()=>setPage("behavioral")}>
            <div style={{ textAlign:"center",flexShrink:0 }}>
              <svg width="54" height="54" viewBox="0 0 54 54">
                <circle cx="27" cy="27" r="22" fill="none" stroke={C.border} strokeWidth="3"/>
                <circle cx="27" cy="27" r="22" fill="none" stroke={pdiMeta.color} strokeWidth="3"
                  strokeDasharray={`${(pdi/100)*2*Math.PI*22} ${2*Math.PI*22}`}
                  strokeLinecap="round" transform="rotate(-90 27 27)"
                  style={{ filter:`drop-shadow(0 0 6px ${pdiMeta.color}70)` }}/>
                <text x="27" y="32" textAnchor="middle" fill={pdiMeta.color} fontFamily="JetBrains Mono" fontSize="13">{pdi}</text>
              </svg>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4 }}>Performance Discipline Index</div>
              <div style={{ fontSize:14,color:pdiMeta.color,fontWeight:500,marginBottom:4 }}>{pdiMeta.label}</div>
              <div className="pdi-meta-row" style={{ display:"flex",gap:14 }}>
                {[{l:"Risk",v:riskCons.score,c:riskConsLabel(riskCons.score).color},{l:"Revenge",v:revenge.score,c:revengeLabel(revenge.score).color},{l:"Overtrade",v:overtrading.score,c:overtradingLabel(overtrading.score).color},{l:"Equity",v:equity.score,c:equityLabel(equity.score).color}].map(s=>(
                  <div key={s.l} style={{ fontSize:11,color:C.textDim }}>{s.l} <span className="mn" style={{ color:s.c }}>{s.v}</span></div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
              {revenge.flags.sizeEscalation>0&&<span className="tg td">Size Flag</span>}
              {revenge.flags.rapidReentry>0&&<span className="tg td">Re-entry Flag</span>}
              <span className="pdi-chevron" style={{ fontSize:18,color:C.textDim,marginLeft:8 }}>›</span>
            </div>
          </div>

          <div className="analyses-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12 }}>
            <div className="mc">
              <div className="sl">Recent Analyses</div>
              {[{a:"EURUSD",tf:"H4",d:"22 Feb",t:"Bearish",tc:"td"},{a:"BTCUSD",tf:"D1",d:"21 Feb",t:"Transitional",tc:"tg2"},{a:"US500",tf:"H1",d:"20 Feb",t:"Bullish",tc:"ta"},{a:"XAUUSD",tf:"H4",d:"19 Feb",t:"Range-bound",tc:"tg2"}].map((r,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                    <span className="mn" style={{ color:C.accent,fontSize:13,width:64 }}>{r.a}</span>
                    <span className="tg ta">{r.tf}</span>
                  </div>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span className={`tg ${r.tc}`}>{r.t}</span>
                    <span style={{ fontSize:11,color:C.textDim }}>{r.d}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mc">
              <div className="sl">Platform Activity</div>
              <EqChart data={eq}/>
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:10 }}>
                <span style={{ fontSize:11,color:C.textDim }}>Analyses over 20 days</span>
                <span style={{ fontSize:11,color:C.accent }}>+38% activity</span>
              </div>
            </div>
          </div>

          <div className="mc" style={{ borderLeft:`3px solid ${C.accent}` }}>
            <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10 }}>
              <div>
                <div className="sl">Latest Market Update</div>
                <div style={{ fontSize:17,color:C.text,fontWeight:600,fontFamily:"Inter,sans-serif",letterSpacing:".01em" }}>DXY Compression Phase — Structural Context</div>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <span className="tg ta">Admin</span>
                <span style={{ fontSize:11,color:C.textDim,lineHeight:2.2 }}>23 Feb 2026</span>
              </div>
            </div>
            <p style={{ color:C.textMuted,lineHeight:1.8,fontSize:13 }}>DXY continues to exhibit compression between 103.40 and 104.20. Structural bias remains indeterminate until a confirmed break with sufficient momentum. Watch for liquidity sweep below 103.40 as a potential institutional positioning mechanism.</p>
          </div>

          <TVNewsWidget/>
        </div>

        {/* RIGHT COLUMN — Economic Calendar, full height sticky */}
        <div className="dash-cal-mobile" style={{ position:"sticky", top:0 }}>
          <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", backdropFilter:"blur(8px)" }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <IC n="cal" s={13} c={C.accent}/>
                <span style={{ fontSize:11, fontWeight:600, color:C.text, letterSpacing:".06em", textTransform:"uppercase" }}>Economic Calendar</span>
              </div>
              <span onClick={()=>window.__fortitudeNav&&window.__fortitudeNav("calendar")} style={{ fontSize:10, color:C.accent, cursor:"pointer", letterSpacing:".04em" }}>Full view →</span>
            </div>
            <TVCalendarWidget height={900}/>
          </div>
        </div>

      </div>


    </div>
  );
};

const Intelligence = () => {
  const [step, setStep] = useState("upload");
  const [asset, setAsset] = useState("forex");
  const [tf, setTf] = useState("H4");
  const [thesis, setThesis] = useState("");
  const [img, setImg] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const run = () => { if(!img) return; setAnalyzing(true); setTimeout(()=>{setAnalyzing(false);setStep("result");},2200); };
  if(step==="result") return (
    <div className="fi">
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
        <button className="btn bg" style={{ padding:"7px 14px" }} onClick={()=>setStep("upload")}>← New Analysis</button>
        <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
          <span className="tg ta">{asset.toUpperCase()}</span><span className="tg tb">{tf}</span>
        </div>
      </div>
      {img&&<div style={{ marginBottom:20,borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,maxHeight:200 }}><img src={img} alt="chart" style={{ width:"100%",maxHeight:200,objectFit:"cover",display:"block",opacity:.85 }}/></div>}
      <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:22,fontWeight:300,marginBottom:4 }}>Fortitude Market Framework Analysis</div>
      <p style={{ color:C.textDim,fontSize:12,marginBottom:20 }}>Generated {new Date().toLocaleString()} — Educational interpretation only</p>
      <hr className="dv"/>
      {[{t:"Market Structure Assessment",c:C.accent,b:"Current structural bias presents as transitional. Price action has demonstrated a sequence of lower highs since the most recent swing high, however a prior higher low remains intact on the selected timeframe. This creates structural ambiguity that should not be resolved through assumption. A confirmed break above the most recent lower high would shift bias toward bullish continuation."},{t:"Liquidity & Order Flow Context",c:C.accent,b:"Equal lows are present at the base of the most recent consolidation range, representing a probable stop cluster for long positions initiated at that level. Inducement behavior is visible on the immediate left side of current price — a shallow push designed to trigger premature directional entries."},{t:"Risk Architecture Consideration",c:C.gold,b:"Logical invalidation resides below the most recent structural low. Volatility context is compressive — expansion has not been confirmed. This environment does not favor directional commitment. Asymmetric risk definition is possible only if structure confirms at the referenced invalidation boundary."},{t:"Scenario Mapping",c:C.accent,b:"Primary Scenario: Structural continuation requires a break above the most recent lower high with closing price confirmation.\n\nSecondary Scenario: Failure case involves continuation below the equal lows. Should that occur, the structural framework shifts to bearish continuation."},{t:"Behavioral Discipline Reminder",c:C.textMuted,b:"Markets operate within probabilistic frameworks, not deterministic outcomes. The disciplined practitioner identifies structural conditions, defines risk parameters, and executes only when probability and asymmetry align."}].map((s,i)=>(
        <div key={i} style={{ marginBottom:22 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
            <span style={{ width:3,height:18,background:s.c,borderRadius:2,display:"inline-block" }}/>
            <span style={{ fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:s.c }}>{i+1}. {s.t}</span>
          </div>
          {s.b.split("\n\n").map((p,j)=><p key={j} style={{ color:C.textMuted,lineHeight:1.85,fontSize:13,paddingLeft:13,marginBottom:8 }}>{p}</p>)}
        </div>
      ))}
      <div style={{ background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:16 }}>
        <div style={{ display:"flex",gap:10 }}><IC n="alert" s={13} c={C.textDim}/><p style={{ color:C.textDim,fontSize:12,lineHeight:1.7 }}>This analysis is educational in nature and reflects structural interpretation, not financial advice. Markets are probabilistic. Risk management remains the user's responsibility.</p></div>
      </div>
    </div>
  );
  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Market Intelligence</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Upload a chart for institutional-grade structural analysis using the Fortitude Market Framework.</p>
      </div>
      <div className="mc" style={{ marginBottom:14,display:"flex",flexWrap:"wrap",alignItems:"center",gap:10,padding:"10px 14px" }}>
        <IC n="shield" s={14} c={C.accent}/>
        <span style={{ fontSize:12,color:C.textMuted }}>Analysis quota:</span>
        <div style={{ flex:1,maxWidth:200 }}><div className="pb"><div className="pf" style={{ width:"40%" }}/></div></div>
        <span className="mn" style={{ fontSize:12,color:C.accent }}>2 / 5 today</span>
        <span className="tg ta" style={{ marginLeft:"auto" }}>FMF Owner</span>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12 }}>
        <div>
          <div className="sl">Chart Upload</div>
          <div onClick={()=>document.getElementById("fi").click()} className="upload-zone" style={{ border:`1px dashed ${C.borderHover}`,borderRadius:8,background:"rgba(17,21,32,.7)",backdropFilter:"blur(6px)",cursor:"pointer",transition:"all .2s",padding:img?0:48,textAlign:"center" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=C.borderHover}>
            <input id="fi" type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setImg(ev.target.result);r.readAsDataURL(f);}}}/>
            {img?(<div style={{ position:"relative" }}><img src={img} alt="chart" style={{ width:"100%",borderRadius:8,display:"block",maxHeight:260,objectFit:"cover" }}/><button className="btn bg" style={{ position:"absolute",top:8,right:8,padding:"4px 10px",fontSize:11 }} onClick={e=>{e.stopPropagation();setImg(null);}}>Remove</button></div>):(<><IC n="upload" s={22} c={C.textDim}/><div style={{ marginTop:10,color:C.textMuted,fontSize:13 }}>Drop chart image here</div><div style={{ marginTop:4,color:C.textDim,fontSize:11 }}>PNG · JPG · JPEG</div></>)}
          </div>
        </div>
        <div>
          <div className="sl">Analysis Parameters</div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {[["Asset Class",<select className="inp" value={asset} onChange={e=>setAsset(e.target.value)}>{["forex","crypto","indices","commodities","equities"].map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}</select>],["Timeframe",<select className="inp" value={tf} onChange={e=>setTf(e.target.value)}>{["M1","M5","M15","M30","H1","H4","D1","W1","MN"].map(o=><option key={o}>{o}</option>)}</select>],["Optional Thesis",<textarea className="inp" value={thesis} onChange={e=>setThesis(e.target.value)} placeholder="Describe your structural observation..." style={{ resize:"vertical",minHeight:80 }}/>]].map(([label,el])=>(
              <div key={label}><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>{label}</label>{el}</div>
            ))}
            <button className="btn bp" onClick={run} disabled={!img||analyzing} style={{ opacity:!img?.5:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
              {analyzing?<><span className="pu" style={{ width:7,height:7,borderRadius:"50%",background:C.bg,display:"inline-block" }}/>Analysing...</>:<><IC n="intel" s={14} c={C.bg}/>Run FMF Analysis</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLATFORM COLUMN MAPS — normalise any broker CSV to unified trade schema
// ═══════════════════════════════════════════════════════════════════════════════
const PLATFORM_MAPS = {
  mt4: {
    label: "MetaTrader 4 / 5",
    detect: h => h.some(c => /ticket/i.test(c)) && h.some(c => /open.?time/i.test(c)),
    map: row => {
      const profit = parseFloat(row["Profit"] || row["profit"] || 0);
      const openTime = row["Open Time"] || row["open time"] || "";
      const closeTime = row["Close Time"] || row["close time"] || "";
      const type = (row["Type"] || row["type"] || "").toLowerCase();
      const size = parseFloat(row["Size"] || row["size"] || row["Volume"] || 1);
      const openPrice = parseFloat(row["Open Price"] || row["open price"] || 0);
      const closePrice = parseFloat(row["Close Price"] || row["close price"] || 0);
      const sl = parseFloat(row["S/L"] || row["s/l"] || row["SL"] || 0);
      const tp = parseFloat(row["T/P"] || row["t/p"] || row["TP"] || 0);
      const riskPips = sl > 0 ? Math.abs(openPrice - sl) : null;
      const rewardPips = tp > 0 ? Math.abs(tp - openPrice) : null;
      const rr = riskPips && rewardPips ? parseFloat((rewardPips / riskPips).toFixed(2)) : null;
      return {
        id: row["Ticket"] || row["ticket"],
        instrument: row["Item"] || row["Symbol"] || row["item"] || "UNKNOWN",
        type: type.includes("buy") ? "Long" : type.includes("sell") ? "Short" : type,
        size,
        openPrice,
        closePrice,
        openTime,
        closeTime,
        profit,
        win: profit > 0,
        r: rr,
        commission: parseFloat(row["Commission"] || 0),
        swap: parseFloat(row["Swap"] || 0),
      };
    }
  },
  ctrader: {
    label: "cTrader",
    detect: h => h.some(c => /position.?id/i.test(c)) && h.some(c => /direction/i.test(c)),
    map: row => {
      const net = parseFloat(row["Net Profit"] || row["net profit"] || row["Gross Profit"] || 0);
      const direction = (row["Direction"] || row["direction"] || "").toLowerCase();
      const entryPrice = parseFloat(row["Entry Price"] || row["entry price"] || 0);
      const exitPrice = parseFloat(row["Exit Price"] || row["exit price"] || 0);
      const sl = parseFloat(row["Stop Loss"] || row["stop loss"] || 0);
      const riskPips = sl > 0 ? Math.abs(entryPrice - sl) : null;
      const rewardPips = riskPips ? Math.abs(exitPrice - entryPrice) : null;
      const rr = riskPips && rewardPips ? parseFloat((rewardPips / riskPips).toFixed(2)) : null;
      return {
        id: row["Position ID"] || row["position id"],
        instrument: row["Symbol"] || row["symbol"] || "UNKNOWN",
        type: direction.includes("buy") ? "Long" : "Short",
        size: parseFloat(row["Quantity"] || row["quantity"] || 1),
        openPrice: entryPrice,
        closePrice: exitPrice,
        openTime: row["Entry Time"] || row["entry time"] || "",
        closeTime: row["Exit Time"] || row["exit time"] || "",
        profit: net,
        win: net > 0,
        r: rr,
        commission: parseFloat(row["Commission"] || 0),
        swap: parseFloat(row["Swap"] || 0),
      };
    }
  },
  tradovate: {
    label: "Tradovate",
    detect: h => h.some(c => /accountid/i.test(c)) || (h.some(c => /action/i.test(c)) && h.some(c => /pnl/i.test(c))),
    map: row => {
      const pnl = parseFloat(row["pnl"] || row["PnL"] || row["Net PnL"] || 0);
      const action = (row["action"] || row["Action"] || "").toLowerCase();
      return {
        id: row["id"] || row["orderId"],
        instrument: row["contractId"] || row["symbol"] || "UNKNOWN",
        type: action.includes("buy") ? "Long" : action.includes("sell") ? "Short" : action,
        size: parseFloat(row["qty"] || row["quantity"] || 1),
        openPrice: parseFloat(row["price"] || 0),
        closePrice: parseFloat(row["exitPrice"] || row["price"] || 0),
        openTime: row["timestamp"] || row["date"] || "",
        closeTime: row["exitTimestamp"] || row["timestamp"] || "",
        profit: pnl,
        win: pnl > 0,
        r: null,
        commission: parseFloat(row["commission"] || row["Commission"] || 0),
        swap: 0,
      };
    }
  },
  tradingview: {
    label: "TradingView",
    detect: h => h.some(c => /cum\.?\s*profit/i.test(c)) || (h.some(c => /date.*time/i.test(c)) && h.some(c => /profit/i.test(c))),
    map: row => {
      const profit = parseFloat(row["Profit"] || row["profit"] || 0);
      const type = (row["Type"] || row["type"] || "").toLowerCase();
      return {
        id: row["Trade #"] || row["#"] || Math.random().toString(36).slice(2),
        instrument: row["Symbol"] || row["symbol"] || "UNKNOWN",
        type: type.includes("long") ? "Long" : type.includes("short") ? "Short" : type,
        size: parseFloat(row["Qty"] || row["qty"] || row["Contracts"] || 1),
        openPrice: parseFloat(row["Price"] || row["Entry Price"] || 0),
        closePrice: parseFloat(row["Exit Price"] || row["Price"] || 0),
        openTime: row["Date/Time"] || row["Entry Time"] || "",
        closeTime: row["Exit Date/Time"] || row["Exit Time"] || row["Date/Time"] || "",
        profit,
        win: profit > 0,
        r: null,
        commission: parseFloat(row["Commission"] || 0),
        swap: 0,
      };
    }
  },
  custom: {
    label: "Custom / Other Broker",
    detect: () => false,
    map: row => row, // passthrough — manual mapping UI handles this
  }
};

// ── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return { headers: [], rows: [] };
  // Handle quoted fields
  const splitLine = line => {
    const result = []; let cur = ""; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQ = !inQ; }
      else if (line[i] === ',' && !inQ) { result.push(cur.trim()); cur = ""; }
      else { cur += line[i]; }
    }
    result.push(cur.trim());
    return result;
  };
  const headers = splitLine(lines[0]);
  const rows = lines.slice(1).filter(l => l.trim()).map(l => {
    const vals = splitLine(l);
    return headers.reduce((obj, h, i) => ({ ...obj, [h]: vals[i] || "" }), {});
  });
  return { headers, rows };
}

// ── Auto-detect platform from headers ────────────────────────────────────────
function detectPlatform(headers) {
  for (const [key, map] of Object.entries(PLATFORM_MAPS)) {
    if (key !== "custom" && map.detect(headers)) return key;
  }
  return null;
}

// ── Normalise parsed rows into unified trade objects ──────────────────────────
function normaliseTrades(rows, platform) {
  const mapFn = PLATFORM_MAPS[platform]?.map;
  if (!mapFn) return [];
  return rows.map((row, i) => {
    try {
      const t = mapFn(row);
      return {
        id: t.id || i + 1,
        instrument: (t.instrument || "UNKNOWN").toUpperCase(),
        type: t.type || "Unknown",
        size: isNaN(t.size) ? 1 : t.size,
        openPrice: t.openPrice || 0,
        closePrice: t.closePrice || 0,
        openTime: t.openTime || "",
        closeTime: t.closeTime || "",
        profit: isNaN(t.profit) ? 0 : t.profit,
        win: t.win,
        r: t.r,
        commission: isNaN(t.commission) ? 0 : t.commission,
        swap: isNaN(t.swap) ? 0 : t.swap,
        session: getSession(t.openTime),
      };
    } catch { return null; }
  }).filter(Boolean);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ASSESSMENT ENGINE — all metrics computed from actual trade data
// ═══════════════════════════════════════════════════════════════════════════════
function assessTrades(trades) {
  if (!trades.length) return null;
  const wins = trades.filter(t => t.win);
  const losses = trades.filter(t => !t.win);
  const winRate = (wins.length / trades.length) * 100;
  const grossProfit = wins.reduce((a, t) => a + t.profit, 0);
  const grossLoss = Math.abs(losses.reduce((a, t) => a + t.profit, 0));
  const netPnL = trades.reduce((a, t) => a + t.profit, 0);
  const profitFactor = grossLoss > 0 ? parseFloat((grossProfit / grossLoss).toFixed(2)) : grossProfit > 0 ? 999 : 0;

  // Average RR (only trades with r value)
  const rrTrades = trades.filter(t => t.r !== null && t.r !== undefined);
  const avgRR = rrTrades.length ? parseFloat((rrTrades.reduce((a, t) => a + (t.r || 0), 0) / rrTrades.length).toFixed(2)) : null;
  const expectancy = avgRR !== null ? parseFloat(((winRate / 100) * avgRR - (1 - winRate / 100)).toFixed(3)) : null;

  // Equity curve
  let equity = 0;
  const equityCurve = trades.map(t => { equity += t.profit; return parseFloat(equity.toFixed(2)); });

  // Max drawdown
  let peak = 0, maxDD = 0, runningDD = 0;
  equityCurve.forEach(v => {
    if (v > peak) { peak = v; runningDD = 0; }
    else { runningDD = peak - v; if (runningDD > maxDD) maxDD = runningDD; }
  });
  const maxDDPct = peak > 0 ? parseFloat(((maxDD / peak) * 100).toFixed(2)) : 0;

  // Session breakdown
  const sessions = {};
  trades.forEach(t => {
    const s = t.session;
    if (!sessions[s]) sessions[s] = { trades: 0, wins: 0, profit: 0 };
    sessions[s].trades++;
    if (t.win) sessions[s].wins++;
    sessions[s].profit += t.profit;
  });
  const sessionStats = Object.entries(sessions).map(([name, s]) => ({
    name, trades: s.trades,
    winRate: parseFloat(((s.wins / s.trades) * 100).toFixed(1)),
    profit: parseFloat(s.profit.toFixed(2)),
  })).sort((a, b) => b.profit - a.profit);

  // Revenge trading
  const avgSize = trades.reduce((a, t) => a + t.size, 0) / trades.length;
  const revengeFlags = [];
  for (let i = 1; i < trades.length; i++) {
    const prev = trades[i - 1], cur = trades[i];
    const dt = prev.openTime && cur.openTime
      ? (new Date(cur.openTime) - new Date(prev.openTime)) / 60000 : null;
    if (!prev.win) {
      if (cur.size > avgSize * 1.4) revengeFlags.push({ tradeId: cur.id, type: "Size escalation", instrument: cur.instrument, detail: `${cur.size.toFixed(2)}x vs avg ${avgSize.toFixed(2)}x` });
      if (dt !== null && dt < 30 && cur.instrument === prev.instrument) revengeFlags.push({ tradeId: cur.id, type: "Rapid reentry", instrument: cur.instrument, detail: `${Math.round(dt)}min after loss on same pair` });
    }
  }

  // Loss clusters (3+ losses in 90min)
  const lossClusterFlags = [];
  for (let i = 0; i < losses.length - 2; i++) {
    const t1 = losses[i], t3 = losses[i + 2];
    if (!t1.openTime || !t3.openTime) continue;
    const span = (new Date(t3.openTime) - new Date(t1.openTime)) / 60000;
    if (span <= 90) lossClusterFlags.push({ start: t1.openTime, count: 3, span: Math.round(span) });
  }

  // Overtrading — flag days with >2x average daily trades
  const byDay = {};
  trades.forEach(t => { const d = (t.openTime || "").slice(0, 10); if (d) byDay[d] = (byDay[d] || 0) + 1; });
  const dayVals = Object.values(byDay);
  const avgPerDay = dayVals.reduce((a, b) => a + b, 0) / (dayVals.length || 1);
  const overtradingDays = Object.entries(byDay).filter(([, c]) => c > avgPerDay * 2).map(([date, count]) => ({ date, count, avg: parseFloat(avgPerDay.toFixed(1)) }));

  // Risk consistency
  const sizes = trades.map(t => t.size);
  const sizeAvg = sizes.reduce((a, b) => a + b, 0) / sizes.length;
  const sizeStd = Math.sqrt(sizes.reduce((a, b) => a + Math.pow(b - sizeAvg, 2), 0) / sizes.length);
  const riskConsistency = Math.max(0, Math.round(100 - (sizeStd / sizeAvg) * 100));

  // Revenge score
  const revengeScore = Math.min(100, Math.round(
    (revengeFlags.filter(f => f.type === "Size escalation").length * 25) +
    (revengeFlags.filter(f => f.type === "Rapid reentry").length * 20) +
    (lossClusterFlags.length * 15)
  ));

  // Discipline Index
  const equityStability = Math.max(0, Math.round(100 - (maxDDPct * 1.5)));
  const overtradingScore = Math.min(100, overtradingDays.length * 20);
  const pdi = Math.round(
    riskConsistency * 0.30 +
    (winRate) * 0.25 +
    (100 - revengeScore) * 0.20 +
    (100 - overtradingScore) * 0.15 +
    equityStability * 0.10
  );

  return {
    summary: { totalTrades: trades.length, winRate: parseFloat(winRate.toFixed(1)), netPnL: parseFloat(netPnL.toFixed(2)), profitFactor, avgRR, expectancy, maxDDPct, grossProfit: parseFloat(grossProfit.toFixed(2)), grossLoss: parseFloat(grossLoss.toFixed(2)) },
    equityCurve,
    sessionStats,
    behavioral: { revengeFlags, lossClusterFlags, overtradingDays, riskConsistency, revengeScore, overtradingScore, equityStability, pdi },
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// JOURNAL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// BROKER CONNECT — Live sync UI components
// ═══════════════════════════════════════════════════════════════════════════════

const BROKER_TYPES = [
  {
    id: "mt5", label: "MetaTrader 5", short: "MT5",
    logo: "M", color: "#29a8ff",
    desc: "Most popular forex & CFD platform. Enter your account number, investor password and broker server.",
    fields: [
      { key: "login",      label: "Account Number",        type: "text",     placeholder: "e.g. 12345678" },
      { key: "serverName", label: "Broker Server",         type: "text",     placeholder: "e.g. ICMarkets-Live01" },
      { key: "password",   label: "Investor Password",     type: "password", placeholder: "Read-only investor password" },
    ],
    note: "Use your investor (read-only) password, not your master password.",
  },
  {
    id: "mt4", label: "MetaTrader 4", short: "MT4",
    logo: "M", color: "#29a8ff",
    desc: "Legacy MetaTrader platform. Same connection process as MT5.",
    fields: [
      { key: "login",      label: "Account Number",    type: "text",     placeholder: "e.g. 12345678" },
      { key: "serverName", label: "Broker Server",     type: "text",     placeholder: "e.g. Pepperstone-Live01" },
      { key: "password",   label: "Investor Password", type: "password", placeholder: "Read-only investor password" },
    ],
    note: "Use your investor (read-only) password, not your master password.",
  },
  {
    id: "ctrader", label: "cTrader", short: "cT",
    logo: "C", color: "#e91ea7",
    desc: "Secure OAuth2 connection — you log in via cTrader's own page. Fortitude never sees your cTrader password.",
    fields: [], // OAuth flow — no fields needed
    oauth: true,
    note: "You will be redirected to cTrader to authorise access.",
  },
  {
    id: "tradovate", label: "Tradovate", short: "TV",
    logo: "T", color: "#d0d8e8",
    desc: "US futures platform. Enter your Tradovate username and password.",
    fields: [
      { key: "username", label: "Username", type: "text",     placeholder: "Tradovate username" },
      { key: "password", label: "Password", type: "password", placeholder: "Tradovate password" },
    ],
    isDemo: true, // show demo toggle
    note: "Credentials are encrypted and stored securely. Never shared.",
  },
];

const STATUS_META = {
  idle:        { label: "Idle",        color: "#56677a" },
  syncing:     { label: "Syncing…",    color: "#29a8ff", pulse: true },
  live:        { label: "Live",        color: "#29a8ff", pulse: true },
  error:       { label: "Error",       color: "#e91ea7" },
  paused:      { label: "Paused",      color: "#d0d8e8" },
  CONNECTING:  { label: "Connecting…", color: "#29a8ff", pulse: true },
  CONNECTED:   { label: "Connected",   color: "#29a8ff" },
  DISCONNECTED:{ label: "Disconnected",color: "#56677a" },
  ERROR:       { label: "Error",       color: "#e91ea7" },
};

// Simulated connected accounts (in production: fetched from broker-sync-service)
const MOCK_CONNECTIONS = [
  {
    id: "conn-1",
    broker_type: "mt5",
    display_name: "IC Markets MT5 — Live",
    account_number: "4182****",
    broker_server: "ICMarkets-Live01",
    sync_status: "live",
    metaapi_state: "CONNECTED",
    last_synced_at: new Date(Date.now() - 4 * 60000).toISOString(),
    stats: { total_trades: 147, wins: 84, net_pnl: 4820.50, first_trade: "2025-11-01" },
  },
  {
    id: "conn-2",
    broker_type: "ctrader",
    display_name: "Pepperstone cTrader — Prop",
    account_number: "8841****",
    broker_server: "Pepperstone-Live",
    sync_status: "live",
    metaapi_state: "CONNECTED",
    last_synced_at: new Date(Date.now() - 12 * 60000).toISOString(),
    stats: { total_trades: 63, wins: 38, net_pnl: 1240.00, first_trade: "2026-01-10" },
  },
  {
    id: "conn-3",
    broker_type: "tradovate",
    display_name: "Tradovate — Demo",
    account_number: "2209****",
    broker_server: "Tradovate-Demo",
    sync_status: "idle",
    metaapi_state: "DISCONNECTED",
    last_synced_at: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
    stats: { total_trades: 22, wins: 11, net_pnl: -180.00, first_trade: "2026-02-01" },
  },
];

// Simulated synced trades (in production: from GET /broker/trades)
const MOCK_SYNCED_TRADES = [
  { id:1,  instrument:"EURUSD", trade_type:"Long",  volume:1.0, open_price:1.08240, close_price:1.08840, open_time:"2026-02-22T09:14:00Z", profit:420,   commission:-3.5, session:"London",   is_open:false },
  { id:2,  instrument:"XAUUSD", trade_type:"Short", volume:0.5, open_price:2031.50, close_price:2018.20, open_time:"2026-02-22T11:30:00Z", profit:665,   commission:-2.8, session:"London",   is_open:false },
  { id:3,  instrument:"NAS100", trade_type:"Long",  volume:0.2, open_price:17840,   close_price:17760,   open_time:"2026-02-21T14:20:00Z", profit:-160,  commission:-1.5, session:"NY",       is_open:false },
  { id:4,  instrument:"BTCUSD", trade_type:"Short", volume:0.1, open_price:52400,   close_price:51100,   open_time:"2026-02-21T08:45:00Z", profit:1300,  commission:-4.2, session:"London",   is_open:false },
  { id:5,  instrument:"GBPUSD", trade_type:"Long",  volume:1.0, open_price:1.26540, close_price:1.27100, open_time:"2026-02-20T09:00:00Z", profit:560,   commission:-3.5, session:"London",   is_open:false },
  { id:6,  instrument:"EURUSD", trade_type:"Short", volume:0.8, open_price:1.08890, close_price:1.08630, open_time:"2026-02-19T10:15:00Z", profit:208,   commission:-2.8, session:"London",   is_open:false },
  { id:7,  instrument:"XAUUSD", trade_type:"Long",  volume:0.3, open_price:2019.00, close_price:2019.00, open_time:"2026-03-09T01:20:00Z", profit:120,   commission:-1.8, session:"Asia",     is_open:true  },
];

const BrokerLogo = ({ broker, size = 36 }) => {
  const bt = BROKER_TYPES.find(b => b.id === broker) || { logo:"?", color:C.textDim };
  return (
    <div style={{
      width:size, height:size, borderRadius:6, flexShrink:0,
      background:`${bt.color}18`, border:`1px solid ${bt.color}40`,
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <span style={{ fontSize:size*0.4,color:bt.color,fontFamily:"Inter,sans-serif",fontWeight:700 }}>{bt.logo}</span>
    </div>
  );
};

const ConnectionCard = ({ conn, onSelect, onDisconnect, selected }) => {
  const sm   = STATUS_META[conn.sync_status] || STATUS_META.idle;
  const ago  = conn.last_synced_at
    ? (() => {
        const s = Math.floor((Date.now() - new Date(conn.last_synced_at)) / 1000);
        if (s < 60)   return `${s}s ago`;
        if (s < 3600) return `${Math.floor(s/60)}m ago`;
        return `${Math.floor(s/3600)}h ago`;
      })()
    : "Never";
  const wr = conn.stats
    ? `${Math.round((conn.stats.wins / conn.stats.total_trades) * 100)}%`
    : "—";
  const pnl = conn.stats
    ? (conn.stats.net_pnl >= 0 ? `+$${conn.stats.net_pnl.toFixed(0)}` : `-$${Math.abs(conn.stats.net_pnl).toFixed(0)}`)
    : "—";

  return (
    <div onClick={() => onSelect(conn.id)}
      style={{
        padding:"14px 16px", borderRadius:8, cursor:"pointer", transition:"all .15s",
        border:`1px solid ${selected ? C.accent : C.border}`,
        background: selected ? C.accentGlow : "rgba(13,16,24,.7)",
      }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
        <BrokerLogo broker={conn.broker_type}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {conn.display_name}
          </div>
          <div style={{ fontSize:11, color:C.textDim }}>#{conn.account_number}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5, flexShrink:0 }}>
          <span style={{
            width:6, height:6, borderRadius:"50%", background:sm.color,
            display:"inline-block", animation:sm.pulse ? "pu 2s infinite" : "none",
            boxShadow: sm.pulse ? `0 0 6px ${sm.color}` : "none",
          }}/>
          <span style={{ fontSize:10, color:sm.color, fontWeight:600, letterSpacing:".06em" }}>{sm.label}</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:8 }}>
        {[
          { l:"Net P/L",   v:pnl,                          c:conn.stats?.net_pnl >= 0 ? C.accent : C.pink },
          { l:"Win Rate",  v:wr,                            c:C.accent },
          { l:"Trades",    v:conn.stats?.total_trades || "—", c:C.text },
        ].map(m => (
          <div key={m.l} style={{ textAlign:"center", padding:"6px 4px", background:"rgba(0,0,0,.2)", borderRadius:4 }}>
            <div style={{ fontSize:9, color:C.textDim, marginBottom:2, letterSpacing:".06em", textTransform:"uppercase" }}>{m.l}</div>
            <div className="mn" style={{ fontSize:13, color:m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, alignItems:"center" }}>
        <span style={{ fontSize:10, color:C.textDim }}>Last sync: {ago}</span>
        <button
          onClick={e => { e.stopPropagation(); onDisconnect(conn.id); }}
          style={{ fontSize:10, color:C.pink, background:"none", border:"none", cursor:"pointer", padding:"2px 6px" }}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

const ConnectForm = ({ onConnect, onBack }) => {
  const [step,     setStep]     = useState("pick");   // pick | form | connecting | success | error
  const [broker,   setBroker]   = useState(null);
  const [fields,   setFields]   = useState({});
  const [isDemo,   setIsDemo]   = useState(false);
  const [errMsg,   setErrMsg]   = useState(null);
  const [syncDays, setSyncDays] = useState("90");

  const bt = BROKER_TYPES.find(b => b.id === broker);

  const handleSubmit = async () => {
    setStep("connecting");
    setErrMsg(null);
    // Simulate connection attempt (in production: POST /api/broker/connect/:type)
    await new Promise(r => setTimeout(r, 2200));
    // Simulate 90% success rate for demo
    if (Math.random() > 0.1) {
      setStep("success");
    } else {
      setStep("error");
      setErrMsg("Could not connect to broker server. Check your server name and investor password.");
    }
  };

  if (step === "connecting") return (
    <div style={{ textAlign:"center", padding:"48px 24px" }}>
      <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:20 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:C.accent, animation:`pu 1.2s ease ${i*0.2}s infinite` }}/>
        ))}
      </div>
      <div style={{ fontSize:14, color:C.text, marginBottom:6 }}>Connecting to {bt?.label}…</div>
      <div style={{ fontSize:12, color:C.textMuted }}>Validating credentials and registering with MetaApi</div>
    </div>
  );

  if (step === "success") return (
    <div style={{ textAlign:"center", padding:"40px 24px" }}>
      <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(41,168,255,.12)", border:`2px solid ${C.accent}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <IC n="check" s={22} c={C.accent}/>
      </div>
      <div style={{ fontSize:16, fontWeight:600, color:C.text, marginBottom:8 }}>Broker Connected</div>
      <div style={{ fontSize:13, color:C.textMuted, marginBottom:24 }}>
        {bt?.label} account linked. History sync is running in the background — your trades will appear shortly.
      </div>
      <button className="btn bp" onClick={onConnect} style={{ padding:"10px 28px" }}>View Live Journal →</button>
    </div>
  );

  if (step === "error") return (
    <div style={{ textAlign:"center", padding:"40px 24px" }}>
      <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(233,30,167,.1)", border:`2px solid ${C.pink}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
        <IC n="alert" s={22} c={C.pink}/>
      </div>
      <div style={{ fontSize:16, fontWeight:600, color:C.text, marginBottom:8 }}>Connection Failed</div>
      <div style={{ fontSize:13, color:C.pink, marginBottom:20 }}>{errMsg}</div>
      <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
        <button className="btn bg" onClick={() => setStep("form")}>Try Again</button>
        <button className="btn bg" onClick={onBack}>Cancel</button>
      </div>
    </div>
  );

  if (step === "form" && bt) return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button className="btn bg" style={{ padding:"7px 12px" }} onClick={() => setStep("pick")}>←</button>
        <BrokerLogo broker={bt.id}/>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{bt.label}</div>
          <div style={{ fontSize:11, color:C.textMuted }}>{bt.desc}</div>
        </div>
      </div>

      {bt.oauth ? (
        <div style={{ textAlign:"center", padding:"24px 0" }}>
          <div style={{ fontSize:13, color:C.textMuted, marginBottom:20, lineHeight:1.7 }}>
            Click below to open the {bt.label} authorisation page.<br/>
            You'll be asked to log in and grant Fortitude read-only access.
          </div>
          <button className="btn bp" style={{ padding:"12px 32px" }} onClick={handleSubmit}>
            Authorise via {bt.label} →
          </button>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {bt.fields.map(f => (
            <div key={f.key}>
              <div style={{ fontSize:11, color:C.textMuted, marginBottom:4, letterSpacing:".04em" }}>{f.label}</div>
              <input
                className="inp"
                type={f.type}
                placeholder={f.placeholder}
                value={fields[f.key] || ""}
                onChange={e => setFields(p => ({ ...p, [f.key]: e.target.value }))}
                autoComplete={f.type === "password" ? "new-password" : "off"}
              />
            </div>
          ))}

          {bt.isDemo && (
            <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:12, color:C.textMuted }}>
              <input type="checkbox" checked={isDemo} onChange={e => setIsDemo(e.target.checked)}
                style={{ accentColor:C.accent }}/>
              Demo / paper trading account
            </label>
          )}

          <div>
            <div style={{ fontSize:11, color:C.textMuted, marginBottom:4 }}>Sync history</div>
            <div style={{ display:"flex", gap:6 }}>
              {["30", "90", "180", "365"].map(d => (
                <button key={d} onClick={() => setSyncDays(d)}
                  style={{ padding:"4px 10px", borderRadius:4, border:`1px solid ${syncDays === d ? C.accent : C.border}`,
                    background: syncDays === d ? C.accentGlow : "transparent", color: syncDays === d ? C.accent : C.textMuted,
                    cursor:"pointer", fontSize:11 }}>
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {bt.note && (
            <div style={{ padding:"10px 12px", background:"rgba(41,168,255,.06)", border:`1px solid ${C.accentDim}`, borderRadius:6, fontSize:11, color:C.textMuted, lineHeight:1.6 }}>
              ⚠️ {bt.note}
            </div>
          )}

          <button className="btn bp"
            style={{ padding:"11px", marginTop:4 }}
            disabled={bt.fields.some(f => !fields[f.key]?.trim())}
            onClick={handleSubmit}>
            Connect {bt.label}
          </button>
        </div>
      )}
    </div>
  );

  // Step: pick broker
  return (
    <div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:14, fontWeight:600, color:C.text, marginBottom:4 }}>Select your broker platform</div>
        <div style={{ fontSize:12, color:C.textMuted }}>Your credentials are encrypted end-to-end. Fortitude requests read-only access only.</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:8 }}>
        {BROKER_TYPES.map(b => (
          <div key={b.id} onClick={() => { setBroker(b.id); setFields({}); setStep("form"); }}
            style={{ padding:"14px", borderRadius:8, border:`1px solid ${C.border}`, cursor:"pointer",
              background:"rgba(13,16,24,.7)", transition:"all .15s",
              display:"flex", alignItems:"center", gap:10 }}>
            <BrokerLogo broker={b.id}/>
            <div>
              <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{b.label}</div>
              <div style={{ fontSize:10, color:C.textMuted }}>{b.oauth ? "OAuth2 — Secure" : "Read-only credentials"}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16, padding:"10px 14px", background:"rgba(13,16,24,.5)", border:`1px solid ${C.border}`, borderRadius:6, fontSize:11, color:C.textDim, lineHeight:1.7 }}>
        Fortitude connects to your broker in <strong style={{ color:C.text }}>read-only mode</strong>. 
        We cannot place, modify, or cancel trades. Your account security is never compromised.
        All credentials are encrypted with AES-256-GCM before storage.
      </div>
    </div>
  );
};

// ── Journal component ─────────────────────────────────────────────────────────
const Journal = ({ setPage }) => {
  const [tab, setTab] = useState("live");   // "live" | "import"

  // CSV import state
  const [csvStep, setCsvStep] = useState("idle");
  const [platform, setPlatform] = useState(null);
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [parsedRows, setParsedRows] = useState([]);
  const [parsedHeaders, setParsedHeaders] = useState([]);
  const [trades, setTrades] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef(null);

  // Live sync state
  const [liveView,      setLiveView]      = useState("dashboard");  // dashboard | connect | trades
  const [connections,   setConnections]   = useState(MOCK_CONNECTIONS);
  const [selectedConn,  setSelectedConn]  = useState(MOCK_CONNECTIONS[0]?.id || null);
  const [showConnect,   setShowConnect]   = useState(false);
  const [syncedTrades,  setSyncedTrades]  = useState(MOCK_SYNCED_TRADES);
  const [liveNow,       setLiveNow]       = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setLiveNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // ── CSV handlers ──────────────────────────────────────────────────────────
  const handleFile = file => {
    if (!file) return;
    if (!file.name.endsWith(".csv")) { setFileError("Please upload a CSV file."); return; }
    setFileError(null); setFileName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const { headers, rows } = parseCSV(e.target.result);
      if (!rows.length) { setFileError("CSV appears to be empty or unreadable."); return; }
      setParsedHeaders(headers); setParsedRows(rows);
      const auto = detectPlatform(headers);
      setDetectedPlatform(auto); setPlatform(auto || null);
      setCsvStep("platform");
    };
    reader.readAsText(file);
  };
  const handleDrop = e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };
  const confirmPlatform = () => {
    if (!platform) return;
    const normalised = normaliseTrades(parsedRows, platform);
    if (!normalised.length) { setFileError("Could not parse trades. Try a different platform or check your CSV."); return; }
    setTrades(normalised); setCsvStep("preview");
  };
  const runAssessment = () => { setAssessment(assessTrades(trades)); setCsvStep("results"); };
  const resetCSV = () => { setCsvStep("idle"); setPlatform(null); setDetectedPlatform(null); setParsedRows([]); setParsedHeaders([]); setTrades(null); setAssessment(null); setFileError(null); setFileName(null); };

  // ── Live sync handlers ────────────────────────────────────────────────────
  const handleDisconnect = (id) => setConnections(p => p.filter(c => c.id !== id));
  const handleConnected  = ()   => { setShowConnect(false); setLiveView("dashboard"); };

  const activeConn  = connections.find(c => c.id === selectedConn);
  const activeTrades = syncedTrades.filter(t => !selectedConn || true); // all for now

  // ── CSV results view ──────────────────────────────────────────────────────
  if (tab === "import" && csvStep === "results" && assessment) {
    const { summary, equityCurve, sessionStats, behavioral } = assessment;
    const pdiColor = behavioral.pdi >= 75 ? C.accent : behavioral.pdi >= 55 ? C.gold : C.pink;
    const fmt = n => n >= 0 ? `+$${n.toFixed(2)}` : `-$${Math.abs(n).toFixed(2)}`;
    return (
      <div className="fi">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <button className="btn bg" style={{ padding:"7px 14px" }} onClick={resetCSV}>← New Import</button>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:24, fontWeight:300, margin:0 }}>Assessment Results</h1>
          <span style={{ fontSize:11, color:C.textDim }}>{fileName} · {summary.totalTrades} trades</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:14 }}>
          {[
            { l:"Net P/L",       v:fmt(summary.netPnL),           c: summary.netPnL >= 0 ? C.accent : C.pink },
            { l:"Win Rate",      v:`${summary.winRate}%`,          c: summary.winRate >= 50 ? C.accent : C.pink },
            { l:"Profit Factor", v: summary.profitFactor >= 999 ? "∞" : summary.profitFactor, c: summary.profitFactor >= 1.5 ? C.accent : summary.profitFactor >= 1 ? C.gold : C.pink },
            { l:"Avg RR",        v: summary.avgRR !== null ? `${summary.avgRR}R` : "N/A", c: summary.avgRR >= 1 ? C.accent : C.gold },
            { l:"Max Drawdown",  v:`${summary.maxDDPct}%`,         c: summary.maxDDPct < 5 ? C.accent : summary.maxDDPct < 10 ? C.gold : C.pink },
            { l:"Expectancy",    v: summary.expectancy !== null ? `${summary.expectancy > 0 ? "+" : ""}${summary.expectancy}R` : "N/A", c: summary.expectancy > 0 ? C.accent : C.pink },
          ].map(m => (
            <div key={m.l} className="mc" style={{ textAlign:"center" }}>
              <div className="sl" style={{ textAlign:"center", marginBottom:6 }}>{m.l}</div>
              <div className="mn" style={{ fontSize:20,color:m.c,fontWeight:400 }}>{m.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginBottom:14 }}>
          <div className="mc">
            <div className="sl">Equity Curve</div>
            <EqChart data={equityCurve} h={80}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
              <span style={{ fontSize:11, color:C.textDim }}>{summary.totalTrades} trades</span>
              <span style={{ fontSize:11, color: summary.netPnL >= 0 ? C.accent : C.pink }}>{fmt(summary.netPnL)} total</span>
            </div>
          </div>
          <div className="mc" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div className="sl" style={{ textAlign:"center" }}>Discipline Index</div>
            <div style={{ position:"relative", width:120, height:120 }}>
              <svg viewBox="0 0 120 120" style={{ width:120, height:120, transform:"rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke={C.border} strokeWidth="8"/>
                <circle cx="60" cy="60" r="50" fill="none" stroke={pdiColor} strokeWidth="8"
                  strokeDasharray={`${behavioral.pdi * 3.14} 314`} strokeLinecap="round"
                  style={{ filter:`drop-shadow(0 0 6px ${pdiColor}80)` }}/>
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <span className="mn" style={{ fontSize:28,color:pdiColor,lineHeight:1,fontWeight:300 }}>{behavioral.pdi}</span>
                <span style={{ fontSize:10, color:C.textDim }}>/ 100</span>
              </div>
            </div>
            <div style={{ fontSize:12, color:C.textMuted, textAlign:"center", marginTop:4 }}>
              {behavioral.pdi >= 80 ? "Strong discipline" : behavioral.pdi >= 65 ? "Minor drift detected" : "Correction needed"}
            </div>
          </div>
          <div className="mc">
            <div className="sl">Performance by Session</div>
            {sessionStats.map(s => (
              <div key={s.name} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color:C.text }}>{s.name}</span>
                  <span style={{ fontSize:12, color: s.profit >= 0 ? C.accent : C.pink }}>{s.profit >= 0 ? "+" : ""}${s.profit.toFixed(2)}</span>
                </div>
                <div style={{ height:4, background:C.border, borderRadius:2 }}>
                  <div style={{ height:4, borderRadius:2, width:`${s.winRate}%`, background: s.winRate >= 55 ? C.accent : s.winRate >= 45 ? C.gold : C.pink }}/>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:2 }}>
                  <span style={{ fontSize:10, color:C.textDim }}>{s.trades} trades</span>
                  <span style={{ fontSize:10, color:C.textDim }}>{s.winRate}% win</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mc" style={{ marginBottom:14, borderLeft:`3px solid ${behavioral.revengeFlags.length > 0 ? C.pink : C.accent}` }}>
          <div className="sl">Behavioral Analysis</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
            {[
              { t:"Risk Consistency", v:behavioral.riskConsistency,
                desc: behavioral.riskConsistency >= 80 ? "Position sizing is consistent across the sample." : behavioral.riskConsistency >= 60 ? "Moderate size variance detected." : "High variance — inconsistent risk management." },
              { t:"Revenge Score", v:behavioral.revengeScore, invert:true,
                desc: behavioral.revengeFlags.length === 0 ? "No revenge trading patterns detected." : `${behavioral.revengeFlags.length} flag(s) detected — see trade log.` },
            ].map(m => (
              <div key={m.t}>
                <div style={{ fontSize:12, fontWeight:500, color:C.text, marginBottom:6 }}>{m.t}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <div style={{ flex:1, height:6, background:C.border, borderRadius:3 }}>
                    <div style={{ height:6, borderRadius:3, width:`${m.v}%`, background: (m.invert ? m.v < 20 : m.v >= 70) ? C.accent : m.v < 50 ? C.pink : C.gold }}/>
                  </div>
                  <span className="mn" style={{ fontSize:14, color:(m.invert ? m.v < 20 : m.v >= 70) ? C.accent : C.pink }}>{m.v}</span>
                </div>
                <p style={{ fontSize:12, color:C.textMuted, lineHeight:1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sl">Trade Log</div>
        <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
          <table><thead><tr><th>Instrument</th><th>Type</th><th>Entry</th><th>Exit</th><th>Size</th><th>P/L</th><th>RR</th><th>Session</th></tr></thead>
            <tbody>{trades.slice(0,50).map((t,i) => (
              <tr key={i}>
                <td><span className="mn" style={{ color:C.accent }}>{t.instrument}</span></td>
                <td><span className={`tg ${t.type === "Long" ? "ta" : "td"}`}>{t.type}</span></td>
                <td className="mn" style={{ fontSize:12 }}>{t.openPrice ? t.openPrice.toFixed(t.openPrice > 100 ? 2 : 5) : "—"}</td>
                <td className="mn" style={{ fontSize:12 }}>{t.closePrice ? t.closePrice.toFixed(t.closePrice > 100 ? 2 : 5) : "—"}</td>
                <td style={{ fontSize:12, color:C.textMuted }}>{t.size.toFixed(2)}</td>
                <td style={{ color: t.profit >= 0 ? C.accent : C.pink }}>{t.profit >= 0 ? "+" : ""}${t.profit.toFixed(2)}</td>
                <td><span className="mn" style={{ color: t.r >= 1 ? C.accent : t.r !== null ? C.gold : C.textDim }}>{t.r !== null ? `${t.r}R` : "—"}</span></td>
                <td style={{ fontSize:11, color:C.textDim }}>{t.session}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === "import" && csvStep === "preview" && trades) {
    return (
      <div className="fi">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <button className="btn bg" style={{ padding:"7px 14px" }} onClick={() => setCsvStep("platform")}>← Back</button>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:24, fontWeight:300, margin:0 }}>Preview Import</h1>
          <span style={{ fontSize:11, color:C.textDim }}>{trades.length} trades · {fileName}</span>
        </div>
        <div className="mc" style={{ marginBottom:14, borderLeft:`3px solid ${C.accent}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:2 }}>Parse successful</div>
              <div style={{ fontSize:12, color:C.textMuted }}>{trades.length} trades detected · {PLATFORM_MAPS[platform]?.label}</div>
            </div>
            <button className="btn bp" onClick={runAssessment}>Run Assessment →</button>
          </div>
        </div>
        <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
          <table><thead><tr><th>Instrument</th><th>Type</th><th>Open Time</th><th>P/L</th><th>Size</th><th>Session</th></tr></thead>
            <tbody>{trades.slice(0,20).map((t,i) => (
              <tr key={i}>
                <td><span className="mn" style={{ color:C.accent }}>{t.instrument}</span></td>
                <td><span className={`tg ${t.type === "Long" ? "ta" : "td"}`}>{t.type}</span></td>
                <td style={{ fontSize:11, color:C.textDim }}>{t.openTime || "—"}</td>
                <td style={{ color: t.profit >= 0 ? C.accent : C.pink }}>{t.profit >= 0 ? "+" : ""}${t.profit.toFixed(2)}</td>
                <td style={{ fontSize:12, color:C.textMuted }}>{t.size.toFixed(2)}</td>
                <td style={{ fontSize:11, color:C.textDim }}>{t.session}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab === "import" && csvStep === "platform") {
    return (
      <div className="fi">
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <button className="btn bg" style={{ padding:"7px 14px" }} onClick={resetCSV}>← Cancel</button>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:24, fontWeight:300, margin:0 }}>Select Platform</h1>
        </div>
        {detectedPlatform && (
          <div className="mc" style={{ marginBottom:14, borderLeft:`3px solid ${C.accent}` }}>
            <div style={{ fontSize:12, color:C.accent, fontWeight:500, marginBottom:2 }}>Platform auto-detected</div>
            <div style={{ fontSize:12, color:C.textMuted }}>Detected <strong style={{ color:C.text }}>{PLATFORM_MAPS[detectedPlatform]?.label}</strong> — confirm or change below.</div>
          </div>
        )}
        {fileError && <div style={{ background:"rgba(233,30,167,.08)", border:`1px solid ${C.pinkDim}`, borderRadius:6, padding:"10px 14px", marginBottom:14, fontSize:12, color:C.pink }}>{fileError}</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10, marginBottom:20 }}>
          {Object.entries(PLATFORM_MAPS).map(([key, p]) => (
            <div key={key} onClick={() => { setPlatform(key); setFileError(null); }}
              style={{ padding:"16px", borderRadius:8, border:`1px solid ${platform === key ? C.accent : C.border}`, background: platform === key ? C.accentGlow : "rgba(13,16,24,.7)", cursor:"pointer" }}>
              <div style={{ fontSize:13, fontWeight:500, color: platform === key ? C.accent : C.text, marginBottom:4 }}>{p.label}</div>
              {detectedPlatform === key && <div style={{ fontSize:10, color:C.accentDim }}>AUTO-DETECTED</div>}
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ fontSize:12, color:C.textMuted, flex:1 }}>{parsedRows.length} rows · {fileName}</span>
          <button className="btn bg" onClick={resetCSV}>Change File</button>
          <button className="btn bp" onClick={confirmPlatform} disabled={!platform}>Confirm →</button>
        </div>
      </div>
    );
  }

  // ── Main Journal view (tabs) ───────────────────────────────────────────────
  return (
    <div className="fi">
      {/* Header */}
      <div style={{ marginBottom:20 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28, fontWeight:300, marginBottom:6 }}>Performance Journal</h1>
        <p style={{ color:C.textMuted, fontSize:13 }}>Connect multiple trading accounts for live sync, or import historical data via CSV.</p>
      </div>

      {/* Tab switcher */}
      <div className="journal-tabs" style={{ display:"flex", gap:0, marginBottom:20, borderBottom:`1px solid ${C.border}` }}>
        {[
          { id:"live",   label:"Live Broker Sync", icon:"zap", badge:"Elite" },
          { id:"import", label:"CSV Import",   icon:"upload" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding:"10px 16px", background:"none", border:"none", cursor:"pointer",
              borderBottom:`2px solid ${tab === t.id ? C.accent : "transparent"}`,
              color: tab === t.id ? C.accent : C.textMuted,
              fontSize:13, fontWeight:500, display:"flex", alignItems:"center", gap:7,
              marginBottom:-1, transition:"all .15s", whiteSpace:"nowrap", WebkitTapHighlightColor:"transparent",
            }}>
            <IC n={t.icon} s={14} c={tab === t.id ? C.accent : C.textMuted}/>
            {t.label}
            {t.badge && <span style={{ fontSize:9, padding:"1px 6px", borderRadius:3, background:`${C.pink}20`, color:C.pink, fontWeight:700, letterSpacing:".06em" }}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* ── CSV Import tab ─────────────────────────────────────────────────── */}
      {tab === "import" && (
        <>
          <div
            onDrop={handleDrop} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
            onClick={() => fileRef.current?.click()}
            style={{ border:`2px dashed ${dragOver ? C.accent : C.border}`, borderRadius:10, padding:"clamp(24px,5vw,40px) 16px", textAlign:"center", cursor:"pointer", background: dragOver ? C.accentGlow : "rgba(13,16,24,.5)", transition:"all .2s", marginBottom:14 }}>
            <input ref={fileRef} type="file" accept=".csv" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])}/>
            <IC n="upload" s={28} c={dragOver ? C.accent : C.textDim}/>
            <div style={{ marginTop:12, fontSize:14, color: dragOver ? C.accent : C.text, fontWeight:500 }}>Drop your trade CSV here</div>
            <div style={{ marginTop:6, fontSize:12, color:C.textMuted }}>or click to browse · MT4/5 · cTrader · Tradovate · TradingView</div>
            {fileError && <div style={{ marginTop:10, fontSize:12, color:C.pink }}>{fileError}</div>}
          </div>
          <div style={{ opacity:0.4, pointerEvents:"none" }}>
            <div className="mc"><div className="sl">Equity Curve</div><EqChart data={[100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130]} h={80}/></div>
          </div>
        </>
      )}

      {/* ── Live Sync tab ──────────────────────────────────────────────────── */}
      {tab === "live" && (
        <div>
          {showConnect ? (
            <div className="mc" style={{ maxWidth:520 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                <div className="sl" style={{ marginBottom:0 }}>Connect Broker</div>
                <button className="btn bg" style={{ padding:"4px 10px", fontSize:11 }} onClick={() => setShowConnect(false)}>✕</button>
              </div>
              <ConnectForm onConnect={handleConnected} onBack={() => setShowConnect(false)}/>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:14, alignItems:"start" }}>

              {/* Left: connections list */}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:C.text }}>Connected Accounts</div>
                  <button className="btn bp" style={{ padding:"5px 10px", fontSize:11 }} onClick={() => setShowConnect(true)}>+ Add</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {connections.length === 0 ? (
                    <div style={{ textAlign:"center", padding:"32px 16px", border:`1px dashed ${C.border}`, borderRadius:8 }}>
                      <IC n="zap" s={24} c={C.textDim}/>
                      <div style={{ fontSize:12, color:C.textMuted, marginTop:10 }}>No brokers connected yet</div>
                      <button className="btn bp" style={{ marginTop:12, padding:"7px 16px", fontSize:12 }} onClick={() => setShowConnect(true)}>Connect Broker</button>
                    </div>
                  ) : (
                    connections.map(conn => (
                      <ConnectionCard key={conn.id} conn={conn}
                        selected={selectedConn === conn.id}
                        onSelect={setSelectedConn}
                        onDisconnect={handleDisconnect}/>
                    ))
                  )}
                </div>
              </div>

              {/* Right: trades + stats for selected connection */}
              {activeConn ? (
                <div>
                  {/* Connection header */}
                  <div className="mc" style={{ marginBottom:14, padding:"14px 18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                      <BrokerLogo broker={activeConn.broker_type} size={44}/>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:15, fontWeight:600, color:C.text, marginBottom:2 }}>{activeConn.display_name}</div>
                        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                          <span style={{ fontSize:11, color:C.textDim }}>#{activeConn.account_number}</span>
                          <span style={{ fontSize:11, color:C.textDim }}>{activeConn.broker_server}</span>
                          <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                            <span style={{ width:5, height:5, borderRadius:"50%", background:C.accent, display:"inline-block", animation:"pu 2s infinite", boxShadow:`0 0 6px ${C.accent}` }}/>
                            <span style={{ fontSize:10, color:C.accent, fontWeight:600 }}>LIVE</span>
                          </span>
                        </div>
                      </div>
                      <button className="btn bg" style={{ padding:"7px 12px", fontSize:11 }}>↻ Sync Now</button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:14 }}>
                    {[
                      { l:"Net P/L",  v:`+$${activeConn.stats.net_pnl.toFixed(0)}`,   c:C.accent },
                      { l:"Win Rate", v:`${Math.round((activeConn.stats.wins / activeConn.stats.total_trades)*100)}%`, c:C.accent },
                      { l:"Trades",   v:activeConn.stats.total_trades,                 c:C.text },
                      { l:"Open",     v:activeTrades.filter(t=>t.is_open).length,      c:C.gold },
                    ].map(m => (
                      <div key={m.l} className="mc" style={{ textAlign:"center" }}>
                        <div className="sl" style={{ textAlign:"center", fontSize:9 }}>{m.l}</div>
                        <div className="mn" style={{ fontSize:20,color:m.c,fontWeight:400 }}>{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Live trade log */}
                  <div className="sl">Live Trade Log</div>
                  <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>
                    <table>
                      <thead><tr><th>Instrument</th><th>Type</th><th>Volume</th><th>Entry</th><th>Exit</th><th>P/L</th><th>Session</th><th>Status</th></tr></thead>
                      <tbody>
                        {activeTrades.map((t, i) => (
                          <tr key={i}>
                            <td><span className="mn" style={{ color:C.accent }}>{t.instrument}</span></td>
                            <td><span className={`tg ${t.trade_type === "Long" ? "ta" : "td"}`}>{t.trade_type}</span></td>
                            <td className="mn" style={{ fontSize:11 }}>{t.volume.toFixed(2)}</td>
                            <td className="mn" style={{ fontSize:11 }}>{t.open_price > 100 ? t.open_price.toFixed(2) : t.open_price.toFixed(5)}</td>
                            <td className="mn" style={{ fontSize:11 }}>{t.is_open ? <span style={{ color:C.gold }}>Open</span> : (t.close_price > 100 ? t.close_price.toFixed(2) : t.close_price.toFixed(5))}</td>
                            <td style={{ color: t.profit >= 0 ? C.accent : C.pink }}>{t.profit >= 0 ? "+" : ""}${t.profit.toFixed(2)}</td>
                            <td style={{ fontSize:11, color:C.textDim }}>{t.session}</td>
                            <td>
                              {t.is_open
                                ? <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                                    <span style={{ width:5, height:5, borderRadius:"50%", background:C.gold, display:"inline-block", animation:"pu 2s infinite" }}/>
                                    <span style={{ fontSize:9, color:C.gold }}>OPEN</span>
                                  </span>
                                : <span style={{ fontSize:9, color:C.textDim }}>CLOSED</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign:"center", padding:"60px 24px", color:C.textMuted, fontSize:13 }}>
                  Select a connected account to view trades
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const COACH_PROMPT = `You are the Fortitude Performance Coach. You are not a motivational speaker, therapist, or friend. You are a structured trading performance advisor.

Objective: improve consistency, discipline, emotional control, and structured decision-making.

Tone: professional, analytical, direct, calm authority. No hype. No emojis. No emotional exaggeration.

You do NOT: provide trade signals, financial advice, promise improvement, validate destructive behavior, or use motivational phrases.
You DO: ask structured questions, identify behavioral inconsistencies, reference performance data, highlight risk inconsistency, reinforce probabilistic thinking.

COACHING HIERARCHY (follow every session):
1. Emotional State Check
2. Behavioral Review
3. Risk Discipline Review
4. Structural Thinking Calibration
5. Action Adjustment

ADAPTIVE TONE PROTOCOL — adjust based on PDI:
- PDI ≥ 85: Analytical peer-level discussion. Refine execution nuance.
- PDI 70–84: Mild corrective questioning. Identify drift early.
- PDI 55–69: Direct structural correction. Clear recalibration needed.
- PDI < 55: Calm but firm intervention. Pre-exposure recalibration required.

LIVE SYSTEM DATA (reference naturally and precisely):
PDI: 74/100 — Minor Discipline Drift → use Mild Corrective tone
Risk Consistency: 72/100 | Revenge Score: 38/100 | Fatigue Index: 28/100 | Equity Stability: 81/100

ACTIVE COGNITIVE FLAGS:
- Recency Distortion: Detected. Outlier event followed by >40% risk shift within 3 trades.
- Loss Aversion: Monitor. Recent avg win contracting vs historical baseline.

BEHAVIORAL MEMORY:
- Short-term: Post-loss size escalation flagged twice in last 10 sessions.
- Mid-term: Recurring late-session degradation (−12% expectancy after 18:00 UTC) across 3 weeks.
- Long-term: Post-drawdown risk expansion pattern detected twice in 90-day window.

VOLATILITY CONTEXT:
- Current ATR expanded +44% above 30-day baseline. Position size unchanged. Silent risk inflation present.

PRE-COMMITMENT (if active): Max 4 trades, 1.0R per trade, stop on 2 consecutive losses.

STRUCTURAL RECOMMENDATIONS ACTIVE:
1. 30-min post-loss pause protocol
2. Fix sizing at 1R for next 10 trades
3. 60-min instrument cooldown post-loss
4. Restrict to London session (07:00–12:00 UTC) for 5 sessions

Response style: concise, short paragraphs. Challenge irrational thinking calmly. Never shame. Reference specific data points, not general observations.

If user expresses extreme distress: "I am here to help with trading performance. If you are experiencing significant emotional distress, it may be beneficial to seek professional support outside this platform."`;

const MODES = {
  "post-loss": { label: "Post-Loss Debrief", color: C.pink, icon: "alert", desc: "Review consecutive losses, drawdown response, and risk deviation." },
  "weekly":    { label: "Weekly Review",     color: C.accent, icon: "chart", desc: "Structured review of prior week expectancy, consistency, and behavioral patterns." },
  "free":      { label: "Free Reflection",   color: C.gold,  icon: "coach", desc: "Open session. Address any discipline break, hesitation, or behavioral concern." },
};
const OPENERS = {
  "post-loss": "You have logged multiple consecutive losses recently. Before we begin, I want to establish some structure. How are you approaching the next session — are you in an active trading period, or have you stepped back?",
  "weekly": "Weekly performance review initiated. Your data for the prior seven days shows an expectancy of +0.31R across 6 trades. Risk consistency scored 72 out of 100. Before I provide observations — what do you feel went well this week, and what felt inconsistent?",
  "free": "Session open. What would you like to address today? You can begin with a specific event, a pattern you have noticed, or a behavioral concern. Be as direct as you prefer.",
};
const INIT_SESSIONS = [
  { id: 1, mode: "post-loss", date: "21 Feb 2026", title: "Post-Loss Debrief", preview: "Three consecutive losses reviewed. Risk sizing consistent in two of three cases.", msgs: [
    { r:"a", t:"You logged three consecutive losses over the past 48 hours. Before we proceed, I want to understand the structural context of each trade. Were your invalidation levels defined before entry in all three cases?" },
    { r:"u", t:"Yes for the first two. The third I entered without a clear level — I was trying to recover." },
    { r:"a", t:"That is a notable distinction. The first two losses are structurally acceptable. The third trade represents a behavioral deviation. You recognised the absence of a clear level and entered anyway. What was the internal reasoning?" },
    { r:"u", t:"I felt like I needed to get the money back." },
    { r:"a", t:"That is the pattern we need to address. The impulse to recover losses through additional exposure is a risk amplification mechanism, not a recovery strategy. After two consecutive losses, your protocol should include a defined pause period before any further entries. Not as punishment — as structural protection." },
  ]},
  { id: 2, mode: "weekly", date: "17 Feb 2026", title: "Weekly Performance Review", preview: "W/C 10 Feb reviewed. Expectancy positive. Late-session flag noted.", msgs: [
    { r:"a", t:"Weekly review — week commencing 10 February. Your expectancy held at +0.29R across 8 trades. Risk sizing was consistent in 7 of 8 cases. One outlier: a position at 19:40 UTC with 1.4x standard risk. That is the second week this pattern has appeared. What is driving activity after 18:00?" },
  ]},
];

const BehavioralTimeline = () => {
  const events = [
    { date:"10 Feb", label:"Risk spike",       color:C.pink },
    { date:"12 Feb", label:"Discipline break", color:C.pink },
    { date:"14 Feb", label:"Stabilised",       color:C.accent },
    { date:"17 Feb", label:"Weekly review",    color:C.gold },
    { date:"19 Feb", label:"Consistent",       color:C.accent },
    { date:"21 Feb", label:"Post-loss debrief",color:C.pink },
    { date:"23 Feb", label:"Stable",           color:C.accent },
  ];
  return (
    <div style={{ position:"relative",padding:"18px 0 6px" }}>
      <div style={{ position:"absolute",top:32,left:"7%",right:"7%",height:1,background:C.border }}/>
      <div style={{ display:"flex",justifyContent:"space-between" }}>
        {events.map((e,i)=>(
          <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:7,flex:1 }}>
            <div style={{ fontSize:9,color:C.textDim,letterSpacing:".05em",whiteSpace:"nowrap" }}>{e.date}</div>
            <div style={{ width:10,height:10,borderRadius:"50%",background:e.color,boxShadow:`0 0 8px ${e.color}70`,border:`2px solid ${e.color}`,zIndex:1 }}/>
            <div style={{ fontSize:9,color:e.color,textAlign:"center",lineHeight:1.3 }}>{e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Coach = () => {
  const [view, setView] = useState("home");
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(INIT_SESSIONS);
  const [readOnly, setReadOnly] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);

  const startSession = m => { setMode(m); setReadOnly(false); setMessages([{r:"a",t:OPENERS[m]}]); setView("session"); };
  const openSaved = s => { setMode(s.mode); setMessages(s.msgs); setReadOnly(true); setView("session"); };
  const endSession = () => {
    if(!readOnly&&messages.length>1) setSessions(p=>[{id:Date.now(),mode,date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),title:MODES[mode]?.label,preview:messages[1]?.t?.slice(0,85)+"...",msgs:[...messages]},...p]);
    setView("home"); setMessages([]); setMode(null); setReadOnly(false);
  };

  const send = async () => {
    if(!input.trim()||loading) return;
    const um={r:"u",t:input.trim()};
    const next=[...messages,um];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:COACH_PROMPT,messages:next.map(m=>({role:m.r==="a"?"assistant":"user",content:m.t}))})});
      const data = await res.json();
      const reply = data.content?.find(b=>b.type==="text")?.text||"Session processing error. Please retry.";
      setMessages(p=>[...p,{r:"a",t:reply}]);
    } catch { setMessages(p=>[...p,{r:"a",t:"Connection error. Please check your network and try again."}]); }
    setLoading(false);
  };

  if(view==="session") {
    const mc=MODES[mode]||MODES.free;
    return (
      <div className="fi" style={{ display:"flex",flexDirection:"column",height:"calc(100vh - 80px)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:18,flexShrink:0 }}>
          <button className="btn bg" style={{ padding:"7px 14px" }} onClick={endSession}>← End Session</button>
          <div style={{ width:1,height:18,background:C.border }}/>
          <span className="pu" style={{ width:7,height:7,borderRadius:"50%",background:mc.color,display:"inline-block" }}/>
          <span style={{ fontSize:12,color:C.textMuted }}>{mc.label}</span>
          {readOnly&&<span style={{ fontSize:11,color:C.textDim }}>— read only</span>}
          <span style={{ marginLeft:"auto",fontSize:11,color:C.textDim }}>{messages.length} exchanges</span>
        </div>
        <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:8 }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",alignItems:"flex-start",gap:10 }}>
              {m.r==="a"&&<div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><IC n="coach" s={13} c={C.accent}/></div>}
              <div style={{ maxWidth:"72%",background:m.r==="a"?"rgba(13,16,24,.92)":C.accentGlow,border:`1px solid ${m.r==="a"?C.border:"rgba(41,168,255,.25)"}`,borderRadius:m.r==="a"?"2px 12px 12px 12px":"12px 2px 12px 12px",padding:"13px 16px",backdropFilter:"blur(8px)" }}>
                {m.r==="a"&&<div style={{ fontSize:9,color:C.accentDim,letterSpacing:".1em",textTransform:"uppercase",marginBottom:7,fontWeight:600 }}>Performance Coach</div>}
                <p style={{ fontSize:13,color:m.r==="a"?C.text:C.accent,lineHeight:1.8,whiteSpace:"pre-wrap" }}>{m.t}</p>
              </div>
              {m.r==="u"&&<div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><span style={{ fontSize:12,color:C.accent,fontFamily:"Inter,sans-serif",fontWeight:700 }}>J</span></div>}
            </div>
          ))}
          {loading&&(
            <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center" }}><IC n="coach" s={13} c={C.accent}/></div>
              <div style={{ background:"rgba(13,16,24,.92)",border:`1px solid ${C.border}`,borderRadius:"2px 12px 12px 12px",padding:"16px 20px",display:"flex",gap:5,alignItems:"center" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:5,height:5,borderRadius:"50%",background:C.accentDim,animation:`pu 1.2s ease ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>
        {!readOnly&&(
          <div style={{ flexShrink:0,display:"flex",gap:10,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Respond to the coach... (Enter to send)" disabled={loading}
              style={{ flex:1,background:"rgba(17,21,32,.85)",border:`1px solid ${C.border}`,color:C.text,borderRadius:6,padding:"11px 14px",fontSize:13,fontFamily:"Inter,sans-serif",resize:"none",height:50,outline:"none",backdropFilter:"blur(4px)" }}
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
            <button onClick={send} disabled={!input.trim()||loading} style={{ padding:"0 18px",background:input.trim()&&!loading?C.accent:C.border,border:"none",borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s",flexShrink:0 }}>
              <IC n="send" s={14} c={input.trim()&&!loading?C.bg:C.textDim}/>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Performance Coach</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Private · Structured · Analytical</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:560 }}>An interactive performance calibration system. Not motivation. Not therapy. Structured accountability for discipline, risk consistency, and behavioral correction.</p>
      </div>
      <div style={{ background:"rgba(233,30,167,.06)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14 }}>
        <span className="pu" style={{ width:6,height:6,borderRadius:"50%",background:C.pink,display:"inline-block",flexShrink:0 }}/>
        <div style={{ flex:1 }}><span style={{ fontSize:13,color:C.text }}>Journal detected 2 consecutive losses this week. </span><span style={{ fontSize:13,color:C.textMuted }}>A structured post-loss debrief may be appropriate.</span></div>
        <button className="btn bg" style={{ fontSize:11,borderColor:C.pinkDim,color:C.pink,flexShrink:0 }} onClick={()=>startSession("post-loss")}>Initiate Debrief</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,marginBottom:20 }}>
        <div>
          <div className="sl">Initiate Session</div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {Object.entries(MODES).map(([key,m])=>(
              <div key={key} onClick={()=>startSession(key)} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,backdropFilter:"blur(8px)",transition:"all .2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=m.color;e.currentTarget.style.boxShadow=`0 4px 24px ${m.color}18`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                <div style={{ width:32,height:32,borderRadius:"50%",background:`${m.color}18`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><IC n={m.icon} s={14} c={m.color}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:3 }}>{m.label}</div>
                  <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.5 }}>{m.desc}</div>
                </div>
                <span style={{ fontSize:18,color:C.textDim }}>›</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sl">Behavioral Flags</div>
          <div className="mc" style={{ marginBottom:12 }}>
            {[{l:"Revenge cluster",s:"Clear",c:C.accent},{l:"Late-session (18:00+)",s:"Monitor",c:C.gold},{l:"Size consistency",s:"Moderate",c:C.gold},{l:"Post-loss frequency",s:"Elevated",c:C.pink}].map(f=>(
              <div key={f.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{f.l}</span>
                <span style={{ fontSize:11,color:f.c,fontWeight:500 }}>{f.s}</span>
              </div>
            ))}
          </div>
          <div className="mc">
            {[{l:"Expectancy",v:"+0.31R"},{l:"Risk consistency",v:"72 / 100"},{l:"Max drawdown",v:"−6.2%"}].map(m=>(
              <div key={m.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{m.l}</span>
                <span className="mn" style={{ fontSize:12,color:C.accent }}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom:20 }}>
        <div className="sl">Behavioral Pattern Timeline</div>
        <div className="mc">
          <BehavioralTimeline/>
          <div style={{ display:"flex",gap:20,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            {[{c:C.pink,l:"Discipline break / Risk spike"},{c:C.accent,l:"Stable / Recovery"},{c:C.gold,l:"Review session"}].map(l=>(
              <div key={l.l} style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:l.c }}/>
                <span style={{ fontSize:11,color:C.textDim }}>{l.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div className="sl" style={{ margin:0 }}>Session History</div>
          <span style={{ fontSize:11,color:C.textDim }}>{sessions.length} sessions · private</span>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {sessions.map(s=>{
            const mc=MODES[s.mode]||MODES.free;
            return (
              <div key={s.id} onClick={()=>openSaved(s)} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,backdropFilter:"blur(6px)",transition:"border-color .2s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=mc.color+"60"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:mc.color,flexShrink:0 }}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                    <span style={{ fontSize:13,color:C.text }}>{s.title}</span>
                    <span style={{ fontSize:9,color:mc.color,letterSpacing:".07em",textTransform:"uppercase",border:`1px solid ${mc.color}40`,borderRadius:3,padding:"1px 6px" }}>{mc.label}</span>
                  </div>
                  <div style={{ fontSize:12,color:C.textMuted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{s.preview}</div>
                </div>
                <span style={{ fontSize:11,color:C.textDim,flexShrink:0 }}>{s.date}</span>
                <span style={{ fontSize:16,color:C.textDim }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BEHAVIORAL INTELLIGENCE ENGINE — All 8 parts
// ═══════════════════════════════════════════════════════════════════════════════

// Simulated trade dataset (in production: from journal CSV/API)
const TRADE_DATA = [
  { id:1,  instrument:"EURUSD", type:"Long",  r:1.0, result:"+2.1", win:true,  time:"2026-02-10T09:14:00", size:1.0, session:"London" },
  { id:2,  instrument:"XAUUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-10T11:30:00", size:1.0, session:"London" },
  { id:3,  instrument:"XAUUSD", type:"Long",  r:1.8, result:"-1.0", win:false, time:"2026-02-10T11:58:00", size:1.8, session:"London" },  // size spike after loss + rapid reentry
  { id:4,  instrument:"NAS100", type:"Long",  r:1.0, result:"+1.8", win:true,  time:"2026-02-11T14:20:00", size:1.0, session:"NY" },
  { id:5,  instrument:"BTCUSD", type:"Short", r:1.0, result:"+2.6", win:true,  time:"2026-02-12T08:45:00", size:1.0, session:"London" },
  { id:6,  instrument:"EURUSD", type:"Short", r:1.2, result:"-1.0", win:false, time:"2026-02-13T16:10:00", size:1.2, session:"NY" },
  { id:7,  instrument:"EURUSD", type:"Long",  r:2.1, result:"-1.0", win:false, time:"2026-02-13T16:38:00", size:2.1, session:"NY" },  // size spike + same instrument reentry
  { id:8,  instrument:"EURUSD", type:"Short", r:1.9, result:"-1.0", win:false, time:"2026-02-13T17:02:00", size:1.9, session:"NY" },  // 3rd loss cluster
  { id:9,  instrument:"XAUUSD", type:"Long",  r:1.0, result:"+1.4", win:true,  time:"2026-02-14T09:00:00", size:1.0, session:"London" },
  { id:10, instrument:"NAS100", type:"Short", r:1.0, result:"+0.9", win:true,  time:"2026-02-17T10:15:00", size:1.0, session:"London" },
  { id:11, instrument:"BTCUSD", type:"Long",  r:0.8, result:"+1.1", win:true,  time:"2026-02-18T13:40:00", size:0.8, session:"NY" },
  { id:12, instrument:"EURUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-19T19:22:00", size:1.0, session:"Late" }, // late session
  { id:13, instrument:"XAUUSD", type:"Long",  r:1.0, result:"+2.1", win:true,  time:"2026-02-20T08:55:00", size:1.0, session:"London" },
  { id:14, instrument:"NAS100", type:"Long",  r:1.0, result:"-1.0", win:false, time:"2026-02-21T10:10:00", size:1.0, session:"London" },
  { id:15, instrument:"EURUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-21T10:44:00", size:1.0, session:"London" },
  { id:16, instrument:"BTCUSD", type:"Long",  r:1.6, result:"-1.0", win:false, time:"2026-02-21T11:05:00", size:1.6, session:"London" }, // post-loss size escalation
  { id:17, instrument:"XAUUSD", type:"Short", r:1.0, result:"+1.8", win:true,  time:"2026-02-22T09:30:00", size:1.0, session:"London" },
  { id:18, instrument:"EURUSD", type:"Long",  r:1.0, result:"+0.8", win:true,  time:"2026-02-23T08:20:00", size:1.0, session:"London" },
];

// ── PART 1: Revenge Trading Detection ────────────────────────────────────────
function computeRevengeScore(trades) {
  const flags = { sizeEscalation:0, freqSpike:0, rapidReentry:0, structural:0 };
  const avgSize = trades.slice(0,10).reduce((a,t)=>a+t.size,0)/Math.min(10,trades.length);

  for(let i=1;i<trades.length;i++) {
    const prev = trades[i-1], cur = trades[i];
    const dt = (new Date(cur.time)-new Date(prev.time))/60000; // minutes

    // Size escalation post-loss
    if(!prev.win && cur.size > avgSize * 1.5) flags.sizeEscalation = Math.min(1, flags.sizeEscalation + 0.5);

    // Rapid reentry same instrument
    if(!prev.win && cur.instrument === prev.instrument && dt < 30) flags.rapidReentry = Math.min(1, flags.rapidReentry + 0.6);

    // Frequency spike: count trades in 2h window after a loss
    if(!prev.win) {
      const window = trades.filter(t => {
        const d = (new Date(t.time)-new Date(prev.time))/60000;
        return d > 0 && d <= 120;
      }).length;
      const avgFreq = trades.length / 30; // avg per 2h over 30 days baseline
      if(window > avgFreq * 2) flags.freqSpike = Math.min(1, flags.freqSpike + 0.4);
    }
  }

  const score = Math.round(
    (flags.sizeEscalation * 30) +
    (flags.freqSpike * 30) +
    (flags.rapidReentry * 20) +
    (flags.structural * 20)
  );
  return { score: Math.min(100, score), flags };
}

// ── PART 2: Risk Consistency Score ───────────────────────────────────────────
function computeRiskConsistency(trades) {
  const sizes = trades.map(t=>t.size);
  const avg = sizes.reduce((a,b)=>a+b,0)/sizes.length;
  const stdDev = Math.sqrt(sizes.reduce((a,b)=>a+Math.pow(b-avg,2),0)/sizes.length);
  const score = Math.max(0, Math.round(100 - (stdDev/avg)*100));
  return { score, avg: avg.toFixed(2), stdDev: stdDev.toFixed(2) };
}

// ── PART 3: Overtrading Cluster Detection ────────────────────────────────────
function computeOvertradingScore(trades) {
  const days = {};
  trades.forEach(t => {
    const d = t.time.slice(0,10);
    days[d] = (days[d]||0)+1;
  });
  const dayVals = Object.values(days);
  const avgPerDay = dayVals.reduce((a,b)=>a+b,0)/dayVals.length;
  const today = trades.filter(t=>t.time.startsWith("2026-02-23")).length;
  const todayDev = today/avgPerDay;
  const sessionCounts = {};
  trades.forEach(t=>{sessionCounts[t.session]=(sessionCounts[t.session]||0)+1;});
  const avgSession = Object.values(sessionCounts).reduce((a,b)=>a+b,0)/Object.keys(sessionCounts).length;
  const maxSession = Math.max(...Object.values(sessionCounts));
  const sessionDev = maxSession/avgSession;
  const score = Math.min(100, Math.round((todayDev*50)+(sessionDev > 2 ? 50 : sessionDev*25)));
  return { score, todayCount: today, avgPerDay: avgPerDay.toFixed(1), sessionCounts };
}

// ── PART 4: Equity Curve Stability ───────────────────────────────────────────
function computeEquityStability(curve) {
  const n = curve.length;
  const xs = curve.map((_,i)=>i);
  const xMean = xs.reduce((a,b)=>a+b,0)/n;
  const yMean = curve.reduce((a,b)=>a+b,0)/n;
  const slope = xs.reduce((a,x,i)=>a+(x-xMean)*(curve[i]-yMean),0)/xs.reduce((a,x)=>a+Math.pow(x-xMean,2),0);
  const intercept = yMean - slope*xMean;
  const residuals = curve.map((y,i)=>Math.pow(y-(slope*i+intercept),2));
  const rmse = Math.sqrt(residuals.reduce((a,b)=>a+b,0)/n);
  const range = Math.max(...curve)-Math.min(...curve);
  const score = Math.max(0, Math.round(100-(rmse/range)*100));
  return { score, slope: slope.toFixed(2), rmse: rmse.toFixed(2) };
}

// ── PART 5: Performance Discipline Index (PDI) ───────────────────────────────
function computePDI(riskScore, revengeScore, overtradingScore, equityScore) {
  return Math.round(
    (riskScore * 0.30) +
    ((100 - revengeScore) * 0.25) +
    ((100 - overtradingScore) * 0.25) +
    (equityScore * 0.20)
  );
}

function pdiLabel(score) {
  if(score>=85) return { label:"Professional Range", color:C.accent };
  if(score>=70) return { label:"Minor Discipline Drift", color:C.accent };
  if(score>=55) return { label:"Behavioral Risk Emerging", color:C.gold };
  return { label:"Structural Breakdown Phase", color:C.pink };
}

function revengeLabel(score) {
  if(score<=25) return { label:"Stable", color:C.accent };
  if(score<=50) return { label:"Mild Emotional Risk", color:C.gold };
  if(score<=75) return { label:"Elevated Risk", color:C.gold };
  return { label:"High Behavioral Instability", color:C.pink };
}

function riskConsLabel(score) {
  if(score>=85) return { label:"Institutional Discipline", color:C.accent };
  if(score>=70) return { label:"Acceptable", color:C.accent };
  if(score>=50) return { label:"Risk Drift", color:C.gold };
  return { label:"Behavioral Instability", color:C.pink };
}

function overtradingLabel(score) {
  if(score<=25) return { label:"Within Baseline", color:C.accent };
  if(score<=50) return { label:"Elevated Activity", color:C.gold };
  if(score<=75) return { label:"Session Overextension", color:C.gold };
  return { label:"Daily Overtrading", color:C.pink };
}

function equityLabel(score) {
  if(score>=85) return { label:"Controlled Growth", color:C.accent };
  if(score>=65) return { label:"Moderate Volatility", color:C.gold };
  if(score>=45) return { label:"High Instability", color:C.gold };
  return { label:"Emotional Equity Swings", color:C.pink };
}

// ── Structural Improvement Recommendations ───────────────────────────────────
function generateRecommendations(revenge, risk, overtrading, pdi) {
  const recs = [];
  if(revenge.score > 50) recs.push({ icon:"zap", title:"Post-Loss Protocol", body:`Your revenge score is ${revenge.score}/100. For the next 5 sessions, implement a mandatory 30-minute pause after any stopped-out trade before re-evaluating the market.`, priority:"high" });
  if(risk.score < 70) recs.push({ icon:"target", title:"Risk Normalisation", body:`Risk consistency scored ${risk.score}/100 with std deviation of ${risk.stdDev}R. Fix position sizing at exactly 1R for your next 10 trades to recalibrate consistency.`, priority:"high" });
  if(overtrading.score > 40) recs.push({ icon:"trend", title:"Frequency Cap", body:`Trade frequency is running at ${(overtrading.todayCount/parseFloat(overtrading.avgPerDay)*100).toFixed(0)}% of your 30-day baseline today. Cap daily trades at your baseline average of ${overtrading.avgPerDay} for the next week.`, priority:"medium" });
  if(pdi < 70) recs.push({ icon:"brain", title:"Structured Operating Window", body:`PDI of ${pdi} indicates behavioral drift. Restrict trading to London open session (07:00–12:00 UTC) only for the next 5 sessions. This window historically shows your highest-quality structural setups.`, priority:"medium" });
  if(revenge.flags.rapidReentry > 0) recs.push({ icon:"shield", title:"Instrument Cooldown Rule", body:"Rapid re-entry flags detected on the same instrument post-loss. Apply a 60-minute instrument cooldown after any stopped-out trade on that specific asset.", priority:"high" });
  if(recs.length === 0) recs.push({ icon:"check", title:"Maintain Current Framework", body:"All behavioral metrics are within acceptable ranges. Continue executing within your defined framework. No structural adjustments recommended at this time.", priority:"low" });
  return recs;
}

// ── Score Gauge component ─────────────────────────────────────────────────────
const ScoreGauge = ({ score, label, sublabel, color }) => {
  const r=38, cx=50, cy=50, circ=2*Math.PI*r;
  const dash = (score/100)*circ;
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth="4"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter:`drop-shadow(0 0 6px ${color}60)` }}/>
        <text x={cx} y={cy-6} textAnchor="middle" fill={color} fontFamily="JetBrains Mono" fontSize="18" fontWeight="400">{score}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fill={C.textDim} fontFamily="Inter" fontSize="9" letterSpacing="1">/100</text>
      </svg>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:11,fontWeight:600,color:C.text,letterSpacing:".04em" }}>{label}</div>
        <div style={{ fontSize:10,color:color,marginTop:2 }}>{sublabel}</div>
      </div>
    </div>
  );
};

// ── Flag Badge ────────────────────────────────────────────────────────────────
const FlagBadge = ({ active, label, color }) => (
  <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderRadius:6,background:active?`${color}12`:"rgba(13,16,24,.6)",border:`1px solid ${active?color+60:C.border}`,transition:"all .2s" }}>
    <div style={{ width:7,height:7,borderRadius:"50%",background:active?color:C.textDim,boxShadow:active?`0 0 8px ${color}`:undefined,flexShrink:0 }}/>
    <span style={{ fontSize:12,color:active?C.text:C.textMuted }}>{label}</span>
    <span style={{ marginLeft:"auto",fontSize:10,fontWeight:600,color:active?color:C.textDim }}>
      {active?"ACTIVE":"CLEAR"}
    </span>
  </div>
);

// ── Mini bar chart for session breakdown ─────────────────────────────────────
const SessionBar = ({ sessions }) => {
  const maxVal = Math.max(...Object.values(sessions));
  const colors = { London:C.accent, NY:C.gold, Asia:C.pink, Late:C.pink };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
      {Object.entries(sessions).map(([s,v])=>(
        <div key={s} style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:11,color:C.textMuted,width:52,flexShrink:0 }}>{s}</span>
          <div style={{ flex:1,height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
            <div style={{ width:`${(v/maxVal)*100}%`,height:"100%",borderRadius:3,background:colors[s]||C.accent,transition:"width .8s ease" }}/>
          </div>
          <span className="mn" style={{ fontSize:11,color:colors[s]||C.accent,width:16,textAlign:"right" }}>{v}</span>
        </div>
      ))}
    </div>
  );
};

// ── BEHAVIORAL INTELLIGENCE ENGINE — Main Component ───────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// COGNITIVE PERFORMANCE LAYER — Parts 1–8
// ═══════════════════════════════════════════════════════════════════════════════

// ── PART 1: Cognitive Bias Detection ─────────────────────────────────────────
function computeBiasFlags(trades) {
  const flags = [];
  if (!trades || trades.length < 4) return flags;

  // Overconfidence Bias: win streak ≥ 4 + size expansion
  let streak = 0, maxStreak = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    if (trades[i].win) { streak++; maxStreak = Math.max(maxStreak, streak); } else break;
  }
  const avgSize10 = trades.slice(-10).reduce((a,t) => a + t.size, 0) / Math.min(10, trades.length);
  const last3Size = trades.slice(-3).reduce((a,t) => a + t.size, 0) / 3;
  if (maxStreak >= 4 && last3Size > avgSize10 * 1.3) {
    flags.push({ id:"overconfidence", label:"Overconfidence Bias", color:C.gold, severity:"medium",
      detail:`Win streak of ${maxStreak}. Size expanded to ${last3Size.toFixed(2)}R vs baseline ${avgSize10.toFixed(2)}R.`,
      coachCue:"Your size allocation increased during the recent winning sequence. Was that a structured adjustment or confidence-driven expansion?" });
  }

  // Loss Aversion: avg win R contracted vs historical
  const wins = trades.filter(t => t.win);
  if (wins.length >= 6) {
    const recent5WinR = wins.slice(-5).reduce((a,t) => a + parseFloat(t.result), 0) / 5;
    const hist10WinR = wins.slice(0, Math.min(10, wins.length)).reduce((a,t) => a + parseFloat(t.result), 0) / Math.min(10, wins.length);
    if (hist10WinR > 0 && recent5WinR < hist10WinR * 0.75) {
      flags.push({ id:"lossaversion", label:"Loss Aversion — Defensive Profit-Taking", color:C.pink, severity:"high",
        detail:`Recent avg win: +${recent5WinR.toFixed(2)}R vs historical: +${hist10WinR.toFixed(2)}R. Contraction of ${((1-recent5WinR/hist10WinR)*100).toFixed(0)}%.`,
        coachCue:"Your average win multiple has contracted while losses remain consistent. Are you cutting winners to protect emotional discomfort?" });
    }
  }

  // Confirmation Bias: 3+ same direction trades after a losing trade in that direction
  const last6 = trades.slice(-6);
  const longs = last6.filter(t => t.type === "Long").length;
  const shorts = last6.filter(t => t.type === "Short").length;
  if (longs >= 4 || shorts >= 4) {
    const dom = longs >= 4 ? "Long" : "Short";
    const lostsInDir = last6.filter(t => t.type === dom && !t.win).length;
    if (lostsInDir >= 1) {
      flags.push({ id:"confirmation", label:"Confirmation Bias Persistence", color:C.gold, severity:"medium",
        detail:`${longs >= 4 ? longs : shorts} consecutive ${dom.toLowerCase()} trades including ${lostsInDir} loss(es) in that direction.`,
        coachCue:"Structure may have shifted, yet directional bias remained unchanged. What data justified maintaining that bias?" });
    }
  }

  // Recency Bias: major outlier followed by sharp risk change
  for (let i = 1; i < Math.min(trades.length, 10); i++) {
    const prev = trades[trades.length - 1 - i];
    const next3 = trades.slice(trades.length - i).slice(0, 3);
    if (next3.length >= 2) {
      const prevR = parseFloat(prev.result);
      const isOutlier = Math.abs(prevR) > 2.5;
      const avgNext = next3.reduce((a,t) => a + t.size, 0) / next3.length;
      const sizeShift = Math.abs(avgNext - prev.size) / prev.size;
      if (isOutlier && sizeShift > 0.4) {
        flags.push({ id:"recency", label:"Recency Distortion", color:C.gold, severity:"medium",
          detail:`Outlier event (${prevR > 0 ? "+" : ""}${prevR}R) followed by ${(sizeShift*100).toFixed(0)}% risk size shift within 3 trades.`,
          coachCue:"A single outlier outcome appears to have influenced subsequent risk parameters. Size decisions should be independent of individual results." });
        break;
      }
    }
  }

  return flags;
}

// ── PART 2: Decision Fatigue Index ───────────────────────────────────────────
function computeFatigueIndex(trades) {
  const today = trades.filter(t => t.time.startsWith("2026-02-23"));
  const sessionTrades = trades.filter(t => t.session === "London" || t.session === "NY");

  // Trades per hour in last session
  const avgDailyTrades = trades.length / 14; // 14 active days
  const todayRate = today.length / avgDailyTrades;

  // Risk consistency in last 5 trades
  const last5 = trades.slice(-5);
  const avgR5 = last5.reduce((a,t) => a + t.size, 0) / 5;
  const stdR5 = Math.sqrt(last5.reduce((a,t) => a + Math.pow(t.size - avgR5, 2), 0) / 5);
  const riskShift = (stdR5 / avgR5) * 100;

  // Loss clustering in last 5
  const recentLosses = last5.filter(t => !t.win).length;
  const lossCluster = recentLosses / 5;

  // Session length proxy (number of trades in any 3h window)
  const sessionLen = today.length > 4 ? 1 : today.length / 4;

  const score = Math.min(100, Math.round(
    (Math.min(todayRate, 2) / 2 * 25) +
    (Math.min(riskShift, 50) / 50 * 25) +
    (lossCluster * 25) +
    (sessionLen * 25)
  ));

  let label, color;
  if (score <= 30)      { label = "Focused";               color = C.accent; }
  else if (score <= 60) { label = "Mild Fatigue";          color = C.gold; }
  else if (score <= 80) { label = "Cognitive Degradation"; color = C.gold; }
  else                  { label = "Decision Exhaustion";   color = C.pink; }

  return { score, label, color, todayTrades: today.length, riskShift: riskShift.toFixed(1), lossCluster: recentLosses };
}

// ── PART 3: Volatility-Adjusted Risk ─────────────────────────────────────────
// Simulated ATR data (production: real-time from broker API)
const ATR_DATA = {
  baseline30d: 0.00820,  // 30-day avg ATR (EURUSD representative)
  current: 0.01180,       // current ATR
  instrument: "EURUSD",
};

function computeVolatilityAlignment(atrData, avgRiskSize) {
  const expansion = (atrData.current - atrData.baseline30d) / atrData.baseline30d;
  const misaligned = expansion > 0.40;
  const expansionPct = (expansion * 100).toFixed(0);
  return {
    misaligned,
    expansionPct,
    current: atrData.current,
    baseline: atrData.baseline30d,
    label: misaligned ? "Volatility Misalignment" : "Aligned",
    color: misaligned ? C.pink : C.accent,
    coachCue: misaligned
      ? `Volatility has expanded ${expansionPct}% above the 30-day baseline while position size remained constant. Is risk calibrated to current range conditions?`
      : null,
  };
}

// ── PART 4: Adaptive Coaching Tone ───────────────────────────────────────────
function getCoachingTone(pdi) {
  if (pdi >= 85) return { label:"Analytical Peer",    desc:"Peer-level discussion. Refine execution nuance.", color:C.accent };
  if (pdi >= 70) return { label:"Mild Corrective",    desc:"Measured questioning. Identify drift early.",     color:C.accent };
  if (pdi >= 55) return { label:"Direct Correction",  desc:"Structural correction. Clear recalibration needed.", color:C.gold };
  return             { label:"Firm Intervention",   desc:"Calm but direct. Pre-exposure recalibration required.", color:C.pink };
}

// ── PART 5: Memory Weighting (session history pattern detection) ─────────────
function computeMemoryPatterns(sessions) {
  const patterns = [];
  const postLoss = sessions.filter(s => s.mode === "post-loss").length;
  const weekly   = sessions.filter(s => s.mode === "weekly").length;
  if (postLoss >= 2) patterns.push({ label:"Recurring Post-Loss Escalation", count: postLoss, severity:"high",
    note:"This pattern has appeared in multiple sessions. A pre-commitment risk cap protocol is warranted." });
  if (weekly >= 1)   patterns.push({ label:"Weekly Review Compliance", count: weekly, severity:"low",
    note:"Consistent engagement with structured review. Positive behavioral indicator." });
  if (sessions.length === 0) patterns.push({ label:"No Session History", count:0, severity:"neutral",
    note:"Initiate a coaching session to begin building behavioral memory." });
  return patterns;
}

// ── PART 6: Pre-Session Commitment ───────────────────────────────────────────
const DEFAULT_COMMITMENT = { maxTrades:4, maxRisk:1.0, stopCondition:"2 consecutive losses", duration:180 };

// ── Cognitive Stability Dashboard (Part 7) ───────────────────────────────────
const CognitiveDashboard = ({ pdi, fatigue, biasFlags, commitment, trades, sessions, setPage }) => {
  const riskCons    = computeRiskConsistency(trades);
  const revenge     = computeRevengeScore(trades);
  const tone        = getCoachingTone(pdi);
  const memPatterns = computeMemoryPatterns(sessions);
  const compliance  = commitment.actual
    ? Math.max(0, Math.round(100 - ((Math.max(0, commitment.actual.trades - commitment.maxTrades) / commitment.maxTrades) * 50) - (commitment.actual.maxR > commitment.maxRisk * 1.2 ? 30 : 0)))
    : null;

  return (
    <div style={{ marginTop:24 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <div className="sl" style={{ margin:0 }}>Cognitive Metrics Panel</div>
        <button className="btn bg" style={{ fontSize:11,padding:"5px 12px" }} onClick={()=>setPage("behavioral")}>Full Engine →</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:10 }}>
        {[
          { l:"Discipline Index",    v:pdi,              unit:"/100", c:pdi>=70?C.accent:pdi>=55?C.gold:C.pink },
          { l:"Fatigue Index",       v:fatigue.score,    unit:"/100", c:fatigue.color },
          { l:"Revenge Risk",        v:revenge.score,    unit:"/100", c:revenge.score<=25?C.accent:revenge.score<=50?C.gold:C.pink },
          { l:"Bias Flags Active",   v:biasFlags.length, unit:" flags", c:biasFlags.length===0?C.accent:biasFlags.length===1?C.gold:C.pink },
          { l:"Commitment",          v:compliance!==null?compliance:"—", unit:compliance!==null?"%":"", c:compliance===null?C.textDim:compliance>=80?C.accent:C.gold },
        ].map(m => (
          <div key={m.l} className="mc" style={{ textAlign:"center",padding:14 }}>
            <div className="sl" style={{ textAlign:"center",marginBottom:8 }}>{m.l}</div>
            <div className="mn" style={{ fontSize:20,color:m.c,fontWeight:400 }}>{m.v}<span style={{ fontSize:11,color:C.textDim }}>{m.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Active bias flags */}
      {biasFlags.length > 0 && (
        <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:12 }}>
          {biasFlags.map(f => (
            <div key={f.id} style={{ background:`${f.color}0c`,border:`1px solid ${f.color}50`,borderRadius:6,padding:"11px 14px",display:"flex",gap:12,alignItems:"flex-start" }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:f.color,marginTop:5,flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                  <span style={{ fontSize:12,fontWeight:600,color:f.color }}>{f.label}</span>
                  <span style={{ fontSize:9,color:f.color,border:`1px solid ${f.color}40`,borderRadius:2,padding:"1px 6px",textTransform:"uppercase" }}>{f.severity}</span>
                </div>
                <div style={{ fontSize:12,color:C.textMuted }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coaching tone indicator */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8 }}>
        <div className="mc" style={{ padding:14,borderColor:tone.color }}>
          <div className="sl">Adaptive Coaching Tone</div>
          <div style={{ fontSize:13,fontWeight:600,color:tone.color,marginBottom:4 }}>{tone.label}</div>
          <div style={{ fontSize:12,color:C.textMuted }}>{tone.desc}</div>
        </div>
        <div className="mc" style={{ padding:14 }}>
          <div className="sl">Behavioral Memory</div>
          {memPatterns.slice(0,2).map((p,i) => (
            <div key={i} style={{ fontSize:12,color:p.severity==="high"?C.pink:p.severity==="low"?C.accent:C.textMuted,marginBottom:4,lineHeight:1.6 }}>
              <span style={{ fontWeight:600 }}>{p.label}</span> — {p.note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PART 6: Pre-Session Commitment Component ──────────────────────────────────
const PreCommitment = ({ onCommit }) => {
  const [vals, setVals] = useState(DEFAULT_COMMITMENT);
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setVals(p => ({ ...p, [k]: v }));

  if (submitted) return (
    <div className="fi" style={{ background:"rgba(41,168,255,.06)",border:`1px solid ${C.accentDim}`,borderRadius:8,padding:"14px 18px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
        <IC n="check" s={14} c={C.accent}/>
        <span style={{ fontSize:13,fontWeight:500,color:C.text }}>Pre-Session Commitment Active</span>
        <span style={{ marginLeft:"auto",fontSize:11,color:C.textDim }}>{new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
      <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
        {[
          {l:"Max Trades",   v:vals.maxTrades},
          {l:"Max Risk/Trade",v:`${vals.maxRisk}R`},
          {l:"Stop Condition",v:vals.stopCondition},
          {l:"Session Cap",  v:`${vals.duration}min`},
        ].map(i => (
          <div key={i.l} style={{ fontSize:11,color:C.textMuted }}>{i.l}: <span className="mn" style={{ color:C.accent }}>{i.v}</span></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mc" style={{ borderColor:C.accentDim }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
        <IC n="target" s={16} c={C.accent}/>
        <div>
          <div style={{ fontSize:13,fontWeight:500,color:C.text }}>Pre-Session Commitment</div>
          <div style={{ fontSize:11,color:C.textMuted }}>Define parameters before trading. Deviations will be flagged.</div>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10,marginBottom:12 }}>
        {[
          {l:"Max Trades Today", k:"maxTrades", type:"number", min:1, max:20},
          {l:"Max Risk Per Trade (R)", k:"maxRisk", type:"number", min:0.1, max:5, step:0.1},
        ].map(f => (
          <div key={f.k}>
            <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>{f.l}</label>
            <input className="inp" type={f.type} min={f.min} max={f.max} step={f.step||1} value={vals[f.k]} onChange={e=>set(f.k, parseFloat(e.target.value)||e.target.value)}/>
          </div>
        ))}
        <div>
          <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>Stop Condition</label>
          <select className="inp" value={vals.stopCondition} onChange={e=>set("stopCondition",e.target.value)}>
            {["2 consecutive losses","3 consecutive losses","Daily loss limit hit","Max drawdown reached","Manual decision"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>Session Duration (minutes)</label>
          <input className="inp" type="number" min={30} max={480} step={30} value={vals.duration} onChange={e=>set("duration",parseInt(e.target.value))}/>
        </div>
      </div>
      <button className="btn bp" onClick={()=>{setSubmitted(true);onCommit&&onCommit(vals);}} style={{ width:"100%" }}>
        Commit to Session Parameters
      </button>
    </div>
  );
};

// ── PART 8: Full Cognitive Intelligence Page ──────────────────────────────────
const CognitiveIntelligence = ({ setPage }) => {
  const EQUITY_CURVE = [100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130];
  const [commitment, setCommitment] = useState(DEFAULT_COMMITMENT);
  const [committed, setCommitted]   = useState(false);

  const biasFlags  = computeBiasFlags(TRADE_DATA);
  const fatigue    = computeFatigueIndex(TRADE_DATA);
  const volAlign   = computeVolatilityAlignment(ATR_DATA, computeRiskConsistency(TRADE_DATA).avg);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const revenge    = computeRevengeScore(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability(EQUITY_CURVE);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const tone       = getCoachingTone(pdi);
  const memPatterns= computeMemoryPatterns(INIT_SESSIONS);
  const escalate   = pdi < 55 || (fatigue.score > 65) || biasFlags.some(f=>f.severity==="high");

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Cognitive Intelligence</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Adaptive · Continuous · Invisible</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:580 }}>
          Bias detection, decision fatigue modelling, volatility alignment, adaptive coaching tone, and pre-commitment enforcement. All computed continuously in the background.
        </p>
      </div>

      {/* Escalation */}
      {escalate && (
        <div style={{ background:"rgba(233,30,167,.07)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:14 }} className="fi">
          <IC n="warning" s={16} c={C.pink}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:2 }}>
              {fatigue.score>65 ? "Decision Fatigue Detected" : pdi<55 ? "Structural Breakdown Phase" : "High-Severity Bias Flag Active"}
            </div>
            <div style={{ fontSize:12,color:C.textMuted }}>
              {fatigue.score>65
                ? `Session metrics show accelerated decision pacing and declining risk uniformity. It may be cognitive fatigue rather than market conditions.`
                : `PDI: ${pdi}/100. Active bias flags: ${biasFlags.length}. A structured coaching session is recommended before further exposure.`}
            </div>
          </div>
          <button className="btn" style={{ background:C.pink,color:"#fff",flexShrink:0,fontSize:11 }} onClick={()=>setPage("coach")}>Open Coach</button>
        </div>
      )}

      {/* Tone + PDI strip */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:14 }}>
        <div className="mc" style={{ borderColor:tone.color,background:`${tone.color}08`,padding:16 }}>
          <div className="sl">Adaptive Coaching Tone</div>
          <div style={{ fontSize:16,fontWeight:600,color:tone.color,marginBottom:4 }}>{tone.label}</div>
          <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.7 }}>{tone.desc}</div>
          <div style={{ marginTop:10,display:"flex",gap:4 }}>
            {[{l:"Analytical",v:85},{l:"Corrective",v:70},{l:"Direct",v:55},{l:"Intervention",v:0}].map((t,i) => {
              const active = (i===0&&pdi>=85)||(i===1&&pdi>=70&&pdi<85)||(i===2&&pdi>=55&&pdi<70)||(i===3&&pdi<55);
              return <div key={i} style={{ flex:1,height:3,borderRadius:2,background:active?tone.color:C.border }}/>;
            })}
          </div>
        </div>
        <div className="mc" style={{ padding:16 }}>
          <div className="sl">Decision Fatigue</div>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke={C.border} strokeWidth="3.5"/>
              <circle cx="30" cy="30" r="24" fill="none" stroke={fatigue.color} strokeWidth="3.5"
                strokeDasharray={`${(fatigue.score/100)*2*Math.PI*24} ${2*Math.PI*24}`}
                strokeLinecap="round" transform="rotate(-90 30 30)"/>
              <text x="30" y="35" textAnchor="middle" fill={fatigue.color} fontFamily="JetBrains Mono" fontSize="14">{fatigue.score}</text>
            </svg>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:fatigue.color,marginBottom:4 }}>{fatigue.label}</div>
              <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
                Today: <span className="mn" style={{ color:C.accent }}>{fatigue.todayTrades} trades</span><br/>
                Risk shift: <span className="mn" style={{ color:C.gold }}>{fatigue.riskShift}%</span><br/>
                Loss cluster: <span className="mn" style={{ color:fatigue.lossCluster>=3?C.pink:C.accent }}>{fatigue.lossCluster}/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mc" style={{ padding:16,borderColor:volAlign.color }}>
          <div className="sl">Volatility Alignment</div>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:volAlign.color,boxShadow:`0 0 8px ${volAlign.color}` }}/>
            <span style={{ fontSize:13,fontWeight:600,color:volAlign.color }}>{volAlign.label}</span>
          </div>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
            ATR (current): <span className="mn" style={{ color:C.accent }}>{volAlign.current.toFixed(5)}</span><br/>
            ATR (30d avg): <span className="mn" style={{ color:C.gold }}>{volAlign.baseline.toFixed(5)}</span><br/>
            Expansion: <span className="mn" style={{ color:volAlign.color }}>+{volAlign.expansionPct}%</span>
          </div>
          {volAlign.coachCue && <div style={{ fontSize:11,color:C.pink,marginTop:8,lineHeight:1.7,fontStyle:"italic" }}>"{volAlign.coachCue.slice(0,80)}..."</div>}
        </div>
      </div>

      {/* Cognitive Bias Flags */}
      <div style={{ marginBottom:18 }}>
        <div className="sl">Cognitive Bias Detection</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {biasFlags.length === 0 ? (
            <div className="mc" style={{ padding:14,display:"flex",alignItems:"center",gap:12 }}>
              <IC n="check" s={16} c={C.accent}/>
              <span style={{ fontSize:13,color:C.textMuted }}>No cognitive bias patterns detected in current trade sequence.</span>
            </div>
          ) : biasFlags.map(f => (
            <div key={f.id} className="mc" style={{ borderLeft:`3px solid ${f.color}`,padding:"14px 18px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                <span style={{ fontSize:13,fontWeight:600,color:f.color }}>{f.label}</span>
                <span style={{ fontSize:9,color:f.color,border:`1px solid ${f.color}40`,borderRadius:3,padding:"1px 7px",textTransform:"uppercase" }}>{f.severity}</span>
              </div>
              <div style={{ fontSize:12,color:C.textMuted,marginBottom:8 }}>{f.detail}</div>
              <div style={{ background:`${f.color}0a`,borderRadius:5,padding:"9px 12px",borderLeft:`2px solid ${f.color}60` }}>
                <div style={{ fontSize:10,color:f.color,letterSpacing:".08em",textTransform:"uppercase",marginBottom:4 }}>Coach Cue</div>
                <div style={{ fontSize:12,color:C.text,lineHeight:1.8,fontStyle:"italic" }}>"{f.coachCue}"</div>
              </div>
            </div>
          ))}

          {/* Always show the 4 bias categories as status cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:8,marginTop:4 }}>
            {["Overconfidence","Loss Aversion","Confirmation","Recency"].map(b => {
              const ids = {Overconfidence:"overconfidence","Loss Aversion":"lossaversion",Confirmation:"confirmation",Recency:"recency"};
              const active = biasFlags.find(f=>f.id===ids[b]);
              return (
                <div key={b} style={{ padding:"10px 12px",borderRadius:6,background:active?`${active.color}10`:"rgba(13,16,24,.6)",border:`1px solid ${active?active.color+"50":C.border}` }}>
                  <div style={{ fontSize:10,fontWeight:600,color:active?active.color:C.textDim,letterSpacing:".06em",textTransform:"uppercase",marginBottom:3 }}>{b}</div>
                  <div style={{ fontSize:11,color:active?C.text:C.textMuted }}>{active?"Detected":"Clear"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Behavioral Memory */}
      <div style={{ marginBottom:18 }}>
        <div className="sl">AI Memory Layers</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8 }}>
          {[
            { tier:"Short-Term", range:"Last 10 sessions", patterns: memPatterns.filter(p=>p.severity!=="neutral").slice(0,2), color:C.accent },
            { tier:"Mid-Term",   range:"Last 30 days",     patterns:[{label:"Late-session degradation",note:"Recurring −12% expectancy after 18:00 UTC. Identified across 3 separate weeks."}], color:C.gold },
            { tier:"Long-Term",  range:"90-day tendency",  patterns:[{label:"Post-drawdown risk expansion",note:"Pattern detected twice following drawdown phases exceeding −5%. Pre-commitment cap protocol recommended."}], color:C.textMuted },
          ].map(layer => (
            <div key={layer.tier} className="mc" style={{ padding:14,borderColor:layer.color+"50" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                <span style={{ fontSize:11,fontWeight:600,color:layer.color,letterSpacing:".06em",textTransform:"uppercase" }}>{layer.tier}</span>
                <span style={{ fontSize:10,color:C.textDim }}>{layer.range}</span>
              </div>
              {layer.patterns.length===0
                ? <div style={{ fontSize:12,color:C.textDim }}>No patterns logged.</div>
                : layer.patterns.map((p,i)=>(
                  <div key={i} style={{ marginBottom:8 }}>
                    <div style={{ fontSize:12,fontWeight:500,color:C.text,marginBottom:2 }}>{p.label}</div>
                    <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>{p.note}</div>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>

      {/* Pre-session commitment */}
      <PreCommitment onCommit={v=>{setCommitment(v);setCommitted(true);}}/>
    </div>
  );
};

const BehavioralEngine = ({ setPage }) => {
  const EQUITY_CURVE = [100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130];

  const revenge    = computeRevengeScore(TRADE_DATA);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability(EQUITY_CURVE);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const pdiMeta    = pdiLabel(pdi);
  const recs       = generateRecommendations(revenge, riskCons, overtrading, pdi);

  const escalationTriggered = revenge.score > 70 && riskCons.score < 60;

  return (
    <div className="fi">
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Behavioral Intelligence</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Live Engine · 18 Trades Analysed</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:580 }}>
          Data-driven behavioral diagnostics. Revenge detection, risk consistency scoring, overtrading analysis, and equity curve stability — all feeding the Performance Coach.
        </p>
      </div>

      {/* Escalation alert */}
      {escalationTriggered && (
        <div style={{ background:"rgba(233,30,167,.07)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:14 }} className="fi">
          <IC n="warning" s={16} c={C.pink}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:2 }}>Coaching Escalation Triggered</div>
            <div style={{ fontSize:12,color:C.textMuted }}>Revenge score exceeds 70 and risk consistency below 60. A structured performance review is recommended.</div>
          </div>
          <button className="btn" style={{ background:C.pink,color:"#fff",flexShrink:0,fontSize:11 }} onClick={()=>setPage("coach")}>Initiate Review</button>
        </div>
      )}

      {/* PDI Hero */}
      <div className="mc" style={{ marginBottom:18,borderColor:pdiMeta.color,background:`linear-gradient(135deg,rgba(13,16,24,.92),${pdiMeta.color}08)` }}>
        <div style={{ display:"flex",alignItems:"center",gap:28 }}>
          <div style={{ textAlign:"center",flexShrink:0 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke={C.border} strokeWidth="5"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke={pdiMeta.color} strokeWidth="5"
                strokeDasharray={`${(pdi/100)*2*Math.PI*50} ${2*Math.PI*50}`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ filter:`drop-shadow(0 0 12px ${pdiMeta.color}80)` }}/>
              <text x="60" y="54" textAnchor="middle" fill={pdiMeta.color} fontFamily="JetBrains Mono" fontSize="28" fontWeight="300">{pdi}</text>
              <text x="60" y="71" textAnchor="middle" fill={C.textDim} fontFamily="Inter" fontSize="9" letterSpacing="1">/100</text>
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10,color:C.textDim,letterSpacing:".12em",textTransform:"uppercase",marginBottom:6 }}>Performance Discipline Index</div>
            <div style={{ fontSize:22,color:pdiMeta.color,fontWeight:500,marginBottom:6,fontFamily:"Inter,sans-serif" }}>{pdiMeta.label}</div>
            <p style={{ fontSize:13,color:C.textMuted,lineHeight:1.8,maxWidth:480 }}>
              Composite score weighted across risk consistency (30%), revenge behaviour (25%), overtrading (25%), and equity stability (20%). This score feeds directly into Performance Coach session context.
            </p>
            <div style={{ display:"flex",gap:14,marginTop:12 }}>
              <div style={{ fontSize:11,color:C.textDim }}>Risk <span style={{ color:riskConsLabel(riskCons.score).color }}>{riskCons.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Revenge <span style={{ color:revengeLabel(revenge.score).color }}>{revenge.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Overtrading <span style={{ color:overtradingLabel(overtrading.score).color }}>{overtrading.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Equity <span style={{ color:equityLabel(equity.score).color }}>{equity.score}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Score gauges */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:14 }}>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={riskCons.score} label="Risk Consistency" sublabel={riskConsLabel(riskCons.score).label} color={riskConsLabel(riskCons.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Avg: <span className="mn" style={{ color:C.accent }}>{riskCons.avg}R</span><br/>
            Std Dev: <span className="mn" style={{ color:C.gold }}>{riskCons.stdDev}R</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={revenge.score} label="Revenge Score" sublabel={revengeLabel(revenge.score).label} color={revengeLabel(revenge.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Size flags: <span className="mn" style={{ color:revenge.flags.sizeEscalation>0?C.pink:C.accent }}>{revenge.flags.sizeEscalation>0?"Detected":"Clear"}</span><br/>
            Re-entry: <span className="mn" style={{ color:revenge.flags.rapidReentry>0?C.pink:C.accent }}>{revenge.flags.rapidReentry>0?"Detected":"Clear"}</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={overtrading.score} label="Overtrading Index" sublabel={overtradingLabel(overtrading.score).label} color={overtradingLabel(overtrading.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Today: <span className="mn" style={{ color:C.accent }}>{overtrading.todayCount} trades</span><br/>
            30d avg: <span className="mn" style={{ color:C.gold }}>{overtrading.avgPerDay}/day</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={equity.score} label="Equity Stability" sublabel={equityLabel(equity.score).label} color={equityLabel(equity.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Slope: <span className="mn" style={{ color:C.accent }}>+{equity.slope}</span><br/>
            RMSE: <span className="mn" style={{ color:C.gold }}>{equity.rmse}</span>
          </div>
        </div>
      </div>

      {/* Flags + Session breakdown */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14 }}>
        <div>
          <div className="sl">Active Behavioral Flags</div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            <FlagBadge active={revenge.flags.sizeEscalation > 0} label="Size Escalation Post-Loss" color={C.pink}/>
            <FlagBadge active={revenge.flags.freqSpike > 0}      label="Overcompensation Frequency Spike" color={C.pink}/>
            <FlagBadge active={revenge.flags.rapidReentry > 0}   label="Emotional Re-entry Risk" color={C.pink}/>
            <FlagBadge active={overtrading.score > 50}            label="Session Overextension" color={C.gold}/>
            <FlagBadge active={false}                             label="Structural Discipline Degradation" color={C.gold}/>
          </div>
        </div>
        <div>
          <div className="sl">Session Distribution</div>
          <div className="mc">
            <SessionBar sessions={overtrading.sessionCounts}/>
            <hr className="dv"/>
            <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
              {overtrading.sessionCounts.Late > 0
                ? <span style={{ color:C.gold }}>Late-session activity detected ({overtrading.sessionCounts.Late} trades after 18:00 UTC). Historical degradation: −12% expectancy in this window.</span>
                : <span style={{ color:C.accent }}>No late-session activity detected. Session distribution within normal parameters.</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Revenge detail breakdown */}
      <div className="mc" style={{ marginBottom:18 }}>
        <div className="sl">Revenge Trading Decomposition</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10 }}>
          {[
            { label:"Size Escalation", weight:"×30", val:Math.round(revenge.flags.sizeEscalation*30), color:revenge.flags.sizeEscalation>0?C.pink:C.accent, desc:"Position size >1.5x average after loss" },
            { label:"Frequency Spike", weight:"×30", val:Math.round(revenge.flags.freqSpike*30),      color:revenge.flags.freqSpike>0?C.pink:C.accent,      desc:"Trade count 2x average in 2h post-loss window" },
            { label:"Rapid Re-entry",  weight:"×20", val:Math.round(revenge.flags.rapidReentry*20),   color:revenge.flags.rapidReentry>0?C.pink:C.accent,   desc:"Same instrument re-entry within 30 min" },
            { label:"Structural Dev.", weight:"×20", val:Math.round(revenge.flags.structural*20),      color:C.accent, desc:"Higher-risk setup frequency post-loss" },
          ].map(f=>(
            <div key={f.label} style={{ padding:"12px 0",borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <span style={{ fontSize:11,color:C.textMuted }}>{f.label}</span>
                <span className="mn" style={{ fontSize:11,color:f.color }}>{f.val}pts</span>
              </div>
              <div className="pb"><div className="pf" style={{ width:`${f.val}%`,background:f.color }}/></div>
              <div style={{ fontSize:10,color:C.textDim,marginTop:6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Structural Improvement Recommendations */}
      <div>
        <div className="sl">Structural Improvement Recommendations</div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {recs.map((r,i)=>{
            const priorityColor = r.priority==="high"?C.pink:r.priority==="medium"?C.gold:C.accent;
            return (
              <div key={i} className="mc" style={{ borderLeft:`3px solid ${priorityColor}`,display:"flex",gap:16 }}>
                <div style={{ width:32,height:32,borderRadius:"50%",background:`${priorityColor}18`,border:`1px solid ${priorityColor}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <IC n={r.icon} s={14} c={priorityColor}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
                    <span style={{ fontSize:13,fontWeight:500,color:C.text }}>{r.title}</span>
                    <span style={{ fontSize:9,color:priorityColor,border:`1px solid ${priorityColor}40`,borderRadius:3,padding:"1px 7px",textTransform:"uppercase",letterSpacing:".07em" }}>{r.priority}</span>
                  </div>
                  <p style={{ fontSize:13,color:C.textMuted,lineHeight:1.8 }}>{r.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const LESSON_DB = {
  1077: {id:1077,title:`Understanding Stocks`,type:"lesson",duration:"5m",content:`Stocks, also known as shares, represent a portion of ownership in a company. By purchasing stocks, you become a partial owner of that company and gain the right to a share of its earnings. Companies issue stocks to raise capital, allowing them to fund growth and development initiatives.

Stocks are primarily bought and sold on stock exchanges such as the New York Stock Exchange (NYSE), NASDAQ, London Stock Exchange (LSE), and the Australian Securities Exchange (ASX). These exchanges connect stock buyers and sellers, enabling trades. To participate, you’ll need to create an investment account with a broker or an investment platform.`},
  1078: {id:1078,title:`Why Invest in Stocks?`,type:"lesson",duration:"5m",content:`Investing in stocks offers significant potential for long-term financial growth. Historically, stocks have provided impressive returns compared to other assets. For instance, the S&P 500 index – composed of 500 leading U.S. companies – has delivered average annual returns of around 10% since its inception in 1926. These returns often surpass those of traditional savings or government bonds.

## Key Benefits of Investing in Stocks:

## Higher Long-Term Returns

Over time, stocks tend to outperform other assets.

## Inflation Hedge

Stocks can protect your wealth against inflation.

## Liquidity

Stocks are relatively easy to buy and sell compared to other investments like real estate.

## Low Entry Cost

You can start investing with a small initial amount.

## Risk Diversification

By investing in multiple stocks, you can spread out your risk.`},
  1079: {id:1079,title:`Investing vs. Trading Stocks`,type:"lesson",duration:"5m",content:`## While the terms ‘investing’ and ‘trading’ are often used interchangeably, they represent two distinct strategies.

## Stock Investing

Investing is typically focused on long-term wealth accumulation. Investors may hold stocks for years, benefiting from price appreciation and dividends over time. The aim is to ride out short-term market fluctuations with the expectation that stocks will recover and generate significant returns in the long term.

## Stock Trading

Trading, on the other hand, is more short-term oriented. Traders seek to make quick profits by holding stocks for shorter periods—ranging from days to even minutes. Instead of concentrating on a company’s long-term performance, traders focus on predicting short-term price movements to capitalize on market shifts.`},
  1081: {id:1081,title:`How to Make Money from Stocks`,type:"lesson",duration:"5m",content:`## There are three primary ways to profit from stocks:

## Rising Stock Prices (Capital Gains)

If the value of a stock increases after you buy it, you can sell it for a profit. For example, purchasing an Amazon share at $2,000 and selling it at $2,200 would net a $200 gain.

## Dividends

Some companies share their profits with shareholders through dividends. McDonald’s, for instance, paid out $4.73 per share in dividends in 2019. While they may seem small, dividends can significantly contribute to long-term returns.

## Falling Stock Prices (Short Selling)

Traders can also profit when stock prices fall by using financial instruments like Contracts for Difference (CFDs). These allow investors to bet against a stock’s price, profiting when the price decreases.`},
  1082: {id:1082,title:`What Influences Stock Prices?`,type:"lesson",duration:"5m",content:`## Stock prices fluctuate based on supply and demand. Various factors can affect this dynamic, such as:

## COMPANY NEWS

Good news tends to drive demand up, while bad news can drive it down.

## Competitor NEWS

Developments in rival companies can impact stock demand within an industry.

## Analyst Ratings

Upgrades or downgrades by analysts can influence investor sentiment.

## Economic and Political Events

Broader economic indicators and political events can have significant effects on stock prices.

## Investor Sentiment

The overall mood of investors—whether bullish (optimistic) or bearish (pessimistic)—plays a major role in stock price movements.`},
  1083: {id:1083,title:`Popular Investment Strategies`,type:"lesson",duration:"5m",content:`## There are several approaches to investing in stocks. Here are a few popular strategies

## Value Investing

Identifying undervalued companies that are trading below their intrinsic value.

## GROWTH INVESTING

Focusing on companies expected to grow rapidly in the future, though they may be riskier.

## QUALITY INVESTING

Investing in financially strong, profitable companies that offer stability.

## SMALL-CAP INVESTING

Investing in smaller companies, which may offer higher returns but come with more volatility.

## DIVIDEND INVESTING

Seeking companies that consistently pay dividends, often used to generate passive income.

## SOCIALLY RESPONSIBLE INVESTING (SRI)

Choosing companies that adhere to ethical or environmental standards.`},
  1084: {id:1084,title:`Stock Analysis Methods`,type:"lesson",duration:"5m",content:`## Before investing, thorough research is key. There are two primary methods of stock analysis:

• Fundamental Analysis: This approach involves analyzing a company’s financials to determine its intrinsic value. Common metrics include the P/E ratio, dividend yield, and return on equity.
• Technical Analysis: Technical analysis focuses on patterns and trends in stock charts, using historical price data to predict future movements.`},
  1085: {id:1085,title:`Popular Technical Analysis Strategies`,type:"lesson",duration:"5m",content:`## Trend Trading

Identifying and trading in the direction of a stock’s established trend.

## Support and Resistance Trading

Profiting by identifying key price levels where a stock’s movement is likely to reverse.

## Breakout Trading

Capitalizing on stocks that have broken through significant support or resistance levels.`},
  1086: {id:1086,title:`Understanding Leverage`,type:"lesson",duration:"5m",content:`Leverage allows you to control a larger position in the market with a smaller deposit. While it can amplify gains, it can also magnify losses, so it’s essential to use it wisely. With leveraged CFD trading, overnight positions incur a small fee, similar to interest.`},
  1087: {id:1087,title:`Buying Stocks vs. Trading CFDs`,type:"lesson",duration:"5m",content:`Choosing between buying stocks and trading CFDs depends on your goals and risk tolerance:

• Buying Stocks: Best for long-term holding and those who prefer owning the underlying asset.
• Trading CFDs: Suitable for those who want to profit from both rising and falling markets and prefer to use leverage.`},
  1088: {id:1088,title:`Risks of Investing in Stocks`,type:"lesson",duration:"5m",content:`## All forms of investing involve some degree of risk and stock investing is no different. It’s important that investors are aware of the risks.

## STOCK- SPECIFIC RISK

The possibility that a particular stock may underperform.

## LIQUIDITY RISK

The risk of not being able to sell a stock at a fair price.

## MARKET RISK

The risk of a general market downturn.

## LEVERAGE RISK

While leverage can enhance returns, it can also lead to significant losses.`},
  1089: {id:1089,title:`Risk Management Strategies`,type:"lesson",duration:"5m",content:`## Diversify

Spread investments across different stocks to minimize exposure to any single stock’s risk.

## Long-Term Outlook

Staying invested for the long term can reduce the impact of short-term volatility.

## Stop Losses

These help limit potential losses by automatically closing out trades that move against you.

## Broad Asset Allocation

Diversifying across different asset classes (stocks, bonds, crypto) can lower overall portfolio risk.`},
  1090: {id:1090,title:`Conclusion`,type:"lesson",duration:"5m",content:`Stocks represent ownership in companies and offer significant potential for wealth generation over the long term. While there are risks involved, a thoughtful approach—combining solid research, diversified investments, and proper risk management—can lead to success in the stock market.`},
  1268: {id:1268,title:`Key Takeaways`,type:"lesson",duration:"5m",content:`Crypto ecosystem refers to a network of crypto-related processes and functions.

Blockchain developers, miners and stakers, crypto exchanges, as well as institutional and retail investors constitute the crypto ecosystem.

Decentralization, enhanced security, immutability, and anonymity are some of the salient features of cryptocurrencies.

The rising popularity and practical applications of cryptocurrencies are increasing interest in everything crypto. As a result, many more participants are joining the queue to ride the crypto wave by investing in this new type of asset. At a time like this, it is essential to understand the crypto ecosystem and its core components. Understanding how it works will ensure we make the right investment choices and are not swayed by FOMO.`},
  1269: {id:1269,title:`What is a crypto ecosystem?`,type:"lesson",duration:"5m",content:`Crypto has also helped businesses develop innovative products and services for people across the globe. The associated ecosystem provides various use cases, such as payments, remittance, trading and investing, banking services, asset management, and gaming.

Some of the core components of the crypto ecosystem are blockchain protocols and developers, miners and stakers, crypto exchanges, investors, and crypto media.

Components of the crypto ecosystem

There are various components of a crypto ecosystem. Let’s break them down for you.`},
  1274: {id:1274,title:`Components of the crypto ecosystem`,type:"lesson",duration:"20m",content:`There are various components of a crypto ecosystem. Let’s break them down for you.

Blockchain protocols

The blockchain protocol is an essential component of the crypto ecosystem. It comprises cryptography, P2P networks, and consensus mechanisms.

The basic idea it builds is that a new network can exist on top of the internet using P2P networks. The application of cryptographic techniques and consensus mechanisms completes the makeup of the blockchain protocol. Cryptography ensures the security and transparency of the network. The consensus mechanism makes it impossible for bad actors to cheat or manipulate the system.

Miners and stakers

Every crypto ecosystem relies on one of two consensus mechanisms. The Proof of Work (PoW) mechanism has miners, while the Proof of Stake (PoS) model involves stakers.

In crypto mining, miners are vital in securing the network and processing each transaction. Crypto ecosystems that use miners include Bitcoin, Ethereum, Dogecoin, and Litecoin. In the staking process, stakers lock their coins to earn the privilege of being selected to create new blocks. Stakers are also validators because they validate new transactions added to the cryptocurrency blockchain network.

Blockchain developers

To understand what blockchain developers do, it’s important to distinguish between the two major types. Blockchain developers are important to the crypto ecosystem because they create the foundation of the crypto. In every crypto ecosystem, blockchain developers can be one of two types.

Core blockchain developers: They design the architecture and security of the blockchain system. These developers lay the foundation for all other users in the ecosystem.

Blockchain software developers: They build applications on the blockchain architecture and protocol. The role of these developers is comparable to that of web developers.

Core developers are also responsible for any future upgrades on the network, so they play a more fundamental role.

Crypto exchanges

Companies like CoinSwitch offer spaces where buyers and sellers congregate. The crypto market is complex, and crypto exchanges fulfill vital needs by simplifying buying or selling crypto.

Institutional and retail investors

In the crypto ecosystem, there are institutional and retail investors.

Institutional investors come with huge funding, which can be directed toward active investment. These investors are often slow to adopt crypto because of their size and the diversity of their shareholders, but they still hold a significant amount of crypto in the market. They include endowment funds, foundations, insurance companies, and hedge funds.

Retail investors are individual investors who enter the crypto game for personal gains. Such investors constitute a majority of the crypto community, and their decisions can drive the growth and fall of cryptos.

Crypto media

Crypto players use different social and official platforms to learn about market trends. In a data-driven marketplace, crypto media platforms have emerged as reputable sources of information. Crypto media sites can be startups or those affiliated with traditional media platforms, such as Forbes or Yahoo.`},
  1284: {id:1284,title:`How does the new crypto ecosystem function?`,type:"lesson",duration:"5m",content:`The crypto ecosystem is a well-oiled system where a network of participants fulfills their objectives and meets specific needs to ensure seamless operations. Core functions of the crypto ecosystem start at the blockchain protocol, where a blockchain developer builds a crypto that uses blockchain technology. Developers create features, design roles, and set parameters for the crypto to operate. They are usually in-house, but sometimes, several developers can collaborate or volunteer to offer their services.

Once a cryptocurrency launches, miners or stakers play the vital role of updating and verifying transactions to the blockchain. Depending on the engineered consensus mechanism, users are selected to ensure that transactions can be processed fast and cheaply.

Another important aspect of the crypto ecosystem is that investors use crypto exchanges to buy, sell, or exchange coins. With crypto media providing all participants with a platform for information, the ecosystem functions to benefit all stakeholders.`},
  1286: {id:1286,title:`Characteristics of crypto ecosystems`,type:"lesson",duration:"5m",content:`Cryptocurrency ecosystems are of great value because they come with the following characteristics.

Decentralization

Crypto became popular due to its decentralized and unregulated nature. Every crypto network relies on its network of computer nodes instead of a central authority.

Security

Cryptos benefit from cryptographic techniques, which secure data from manipulation, theft, or hacks. Private keys are used to prove ownership of blockchain addresses and validate transactions. These features protect users from unauthorized access to funds.

Immutability

This feature ensures that transactions cannot be altered on the sly. Cryptos function within a system that is difficult to manipulate; transactions are recorded on the blockchain, and private keys determine access. These features secure ownership rights in crypto.

Anonymity

With cryptocurrency, users are not required to identify themselves during transactions. The only requirements for transacting on decentralized crypto networks are a digital identity (which can be anonymous) and access to a digital wallet.`},
  1287: {id:1287,title:`Types of crypto ecosystems`,type:"lesson",duration:"5m",content:`Crypto-related ecosystems may be classified into two main types. In this section, we focus on them.

1. Single-party crypto ecosystem: Single-party blockchain projects are led by a single organization. We also know them as private blockchains.

2. Joint venture crypto ecosystem: Joint venture ecosystems are typically led by two or more organizations. They are designed to pool resources to achieve a common goal. For example, Ripple’s partnership with banks and financial institutions for cross-border remittance and currency exchange.

In addition to these two types, there are regulatory blockchain ecosystems. These are not technically crypto ecosystems but are blockchain-based systems. They are made up of government agencies that collaborate on a project and self-report for compliance. For example, CBDCs by central banks.`},
  1288: {id:1288,title:`Will crypto ecosystems benefit organizations?`,type:"lesson",duration:"5m",content:`Crypto and its underlying blockchain technology can potentially transform how organizations do business. That’s because the characteristics of blockchains allow them to improve operational efficiency, reduce costs, and enhance customer experience. They allow organizations to streamline processes by eliminating transaction intermediaries or third parties. Additionally, blockchains eliminate fraud risks associated with manual processes. This makes it more cost effective than traditional information exchange between multiple stakeholders.`},
  1289: {id:1289,title:`Types of blockchain technology`,type:"lesson",duration:"5m",content:`Following on the heels of Bitcoin's rise as first-generation blockchain technology, enterprises are beginning to move their blockchain projects into production.

Deloitte's 2021 Global Blockchain Survey, polling a sample of 1,280 senior executives and practitioners in 10 locations, found that nearly 80% of overall respondents said digital assets -- and their underlying blockchain technologies -- will be "very/somewhat important" to their respective industries in the next 24 months.

However, different use cases require different types of blockchain.

There are 4 types of blockchain technology.

• Public,

• Private

• Hybrid

• Consortium

Each one of these platforms has its benefits, drawbacks, and ideal uses.`},
  1290: {id:1290,title:`4 Types of Blockchain Technology`,type:"lesson",duration:"45m",content:`## 1. Public blockchain

How it works. The first type of blockchain technology is public blockchain. This is where cryptocurrency like Bitcoin originated and helped to popularize distributed ledger technology (DLT). It removes the problems that come with centralization, including less security and transparency. DLT doesn't store information in any one place, instead distributing it across a peer-to-peer network. Its decentralized nature requires some method for verifying the authenticity of data. That method is a consensus algorithm whereby participants in the blockchain reach agreement on the current state of the ledger. Proof of work (PoW) and proof of stake (PoS) are two common consensus methods.

Advantages: One of the advantages of public blockchains is that they are completely independent of organizations, so if the organization that started it ceases to exist the public blockchain will still be able to run, as long as there are computers still connected to it. "Some blockchains incentivize users to commit computer power to securing the network by providing a reward," noted James Godefroy, a senior manager at Rouse, an intellectual property services provider.

Another advantage of public blockchains is the network's transparency. As long as the users follow security protocols and methods fastidiously, public blockchains are mostly secure.

Disadvantages: The network can be slow, and companies can't restrict access or use. If hackers gain 51% or more of the computing power of a public blockchain network, they can unilaterally alter it, Godefroy said.

Public blockchains also don't scale well. The network slows down as more nodes join the network.

Use cases: The most common use case for public blockchains is mining and exchanging cryptocurrencies like Bitcoin. However, it can also be used for creating a fixed record with an auditable chain of custody, such as electronic notarization of affidavits and public records of property ownership.

This type of blockchain is ideal for organizations that are built on transparency and trust, such as social support groups or non-governmental organizations. Because of the public nature of the network, private businesses will likely want to steer clear.

## 2. Private blockchain

How it works. A blockchain network that works in a restrictive environment like a closed network, or that is under the control of a single entity, is a private blockchain. While it operates like a public blockchain network in the sense that it uses peer-to-peer connections and decentralization, this type of blockchain is on a much smaller scale. Instead of just anyone being able to join and provide computing power, private blockchains typically are operated on a small network inside a company or organization. They're also known as permissioned blockchains or enterprise blockchains.

Advantages: The controlling organization sets permission levels, security, authorizations and accessibility. For example, an organization setting up a private blockchain network can determine which nodes can view, add or change data. It can also prevent third parties from accessing certain information.

"You can think of private blockchains as being the intranet, while the public blockchains are more like the internet," Godefroy said.

Because they're limited in size, private blockchains can be very fast and can process transactions much more quickly than public blockchains.

Disadvantages: The disadvantages of private blockchains include the controversial claim that they aren't true blockchains, since the core philosophy of blockchain is decentralization. It's also more difficult to fully achieve trust in the information, since centralized nodes determine what is valid. The small number of nodes can also mean less security. If a few nodes go rogue, the consensus method can be compromised.

Additionally, the source code from private blockchains is often proprietary and closed. Users can't independently audit or confirm it, which can lead to less security. There is no anonymity on a private blockchain, either.

Use cases: The speed of private blockchains makes them ideal for cases where the blockchain needs to be cryptographically secure but the controlling entity doesn't want the information to be accessed by the public.

"For example, companies may choose to take advantage of blockchain technology while not giving up their competitive advantage to third parties. They can use private blockchains for trade secret management, for auditing," Godefroy said.

Other use cases for private blockchain include supply chain management, asset ownership and internal voting.

## 3. Hybrid blockchain

How it works. Sometimes, organizations will want the best of both worlds, and they'll use hybrid blockchain, a type of blockchain technology that combines elements of both private and public blockchain. It lets organizations set up a private, permission-based system alongside a public permissionless system, allowing them to control who can access specific data stored in the blockchain, and what data will be opened up publicly.

Typically, transactions and records in a hybrid blockchain are not made public but can be verified when needed, such as by allowing access through a smart contract. Confidential information is kept inside the network but is still verifiable. Even though a private entity may own the hybrid blockchain, it cannot alter transactions.

When a user joins a hybrid blockchain, they have full access to the network. The user's identity is protected from other users, unless they engage in a transaction. Then, their identity is revealed to the other party.

Advantages: One of the big advantages of hybrid blockchain is that, because it works within a closed ecosystem, outside hackers can't mount a 51% attack on the network. It also protects privacy but allows for communication with third parties. Transactions are cheap and fast, and it offers better scalability than a public blockchain network.

Disadvantages: This type of blockchain isn't completely transparent because information can be shielded. Upgrading can also be a challenge, and there is no incentive for users to participate or contribute to the network.

Use cases: Hybrid blockchain has several strong use cases, including real estate. Companies can use a hybrid blockchain to run systems privately but show certain information, such as listings, to the public. Retail can also streamline its processes with hybrid blockchain, and highly regulated markets like financial services can also see benefits from using it.

Medical records can be stored in a hybrid blockchain, according to Godefroy. The record can't be viewed by random third parties, but users can access their information through a smart contract. Governments could also use it to store citizen data privately but share the information securely between institutions.

## 4. Consortium blockchain

How it works. The fourth type of blockchain, consortium blockchain, also known as a federated blockchain, is similar to a hybrid blockchain in that it has private and public blockchain features. But it's different in that multiple organizational members collaborate on a decentralized network. Essentially, a consortium blockchain is a private blockchain with limited access to a particular group, eliminating the risks that come with just one entity controlling the network on a private blockchain.

In a consortium blockchain, the consensus procedures are controlled by preset nodes. It has a validator node that initiates, receives and validates transactions. Member nodes can receive or initiate transactions.

Advantages: A consortium blockchain tends to be more secure, scalable and efficient than a public blockchain network. Like private and hybrid blockchain, it also offers access controls.

Disadvantages: Consortium blockchain is less transparent than public blockchain. It can still be compromised if a member node is breached, the blockchain's own regulations can impair the network's functionality.

Use cases: Banking and payments are two uses for this type of blockchain. Different banks can band together and form a consortium, deciding which nodes will validate the transactions. Research organizations can create a similar model, as can organizations that want to track food. It's ideal for supply chains, particularly food and medicine applications.

Although these are the four main types of blockchain, there are also consensus algorithms to consider. In addition to PoW and PoS, anyone planning to set up a network should consider the other types, available on different platforms such as Waves and Burstcoin. For example, leased proof of stake lets users earn money from mining, without the node needing to mine itself. Proof of importance uses both balance and transactions to assign significance to each user.

Ultimately, blockchain technology is becoming more popular and rapidly gaining enterprise support. Every one of these types of blockchain has potential applications that can improve trust and transparency and create a better record of transactions.`},
  1292: {id:1292,title:`How Do Blockchain Bridges Work?`,type:"lesson",duration:"10m",content:`Blockchain bridges are platforms that facilitate the transfer of assets and data from one blockchain ecosystem to another. They can be decentralized, centralized, or even hybrid. There are two ways bridges carry out asset transfer: wrapped assets or liquidity pool.

Wrapped Asset Method

The owner of a native asset of Blockchain A can receive the equivalent of the same asset in Blockchain B. To put it in perspective, a user can pass through a cross-chain bridge SOL on Solana to get an equivalent of Wrapped ETH on Ethereum.

A smart contract locks up the deposited SOL during the transfer to take it out of circulation. Then it releases a Wrapped ETH in return.

But a slightly different mechanism happens when you bridge tokens back to the original blockchain—for example, exchanging WETH on Cardano for ETH on Ethereum. The WETH will be burned in exchange for the ETH.

Liquidity Pool Method

Some blockchain bridges, such as “Cross-Chain Bridge” and Synapse Protocol, adopt different approaches. They have liquidity pools for a wide array of assets. For instance, there are liquidity pools for WETH on BNB Chain, Polygon, and so on.

These liquidity pools serve as banks. For instance, when a user wants to bridge WETH from Polygon to ETH on Ethereum, Cross Chain Bridge allocates funds from their liquidity pool to send the user ETH in Ethereum.

How do bridges get assets into their liquidity pools?

Most bridges using this method often have staking and farming programs where users can lock their assets into the pool for periodic rewards. The bridge uses its locked assets to settle bridging requests.`},
  1293: {id:1293,title:`Types Of Crypto Bridges`,type:"lesson",duration:"5m",content:`They exist in different forms based on the developers behind them and the degree of control they give to users.

Trusted Bridges

A trusted bridge is a cross-chain protocol controlled by a centralized entity. During bridging, the asset control moves from the users to the centralized authority. Users have to “trust” the integrity and efficiency of the centralized entity to perform the transaction.

They must assume that the centralized entity will never steal their assets and protect their funds from attackers. Binance Bridge is a prominent example of trusted bridges.

Trusted bridges are more suitable for those prioritizing speed and lower gas fees over cross-chain security.

Trustless Bridges

Unlike trusted bridges, trustless bridges do not rely on any single central authority. Instead, they rely on algorithms and smart contracts for facilitation.

Users are also responsible for their funds because there is no centralized system to do that for them.

Trustless bridges are by far more decentralized than trusted bridges. While trustless bridges might not be as cheap as their counterparts, they are more secure if the underlying technology has proven its worth. Trustless bridges are the essence of decentralized finance (DeFi).`},
  1295: {id:1295,title:`Bridge Use Cases`,type:"lesson",duration:"5m",content:`Bridges are quite useful in the crypto industry. Here are the most important use cases.

Transfer Crypto To A Different Blockchain

Bridges come in handy whenever you want to transfer your crypto from one blockchain to another. If you bridge SOL, you will get SOL, just in a different form and on a different blockchain.

A cross-chain bridge usually just takes some asset on blockchain A and gives the equivalent of the same asset on blockchain B. For example, if the user wants to bridge ETH from Ethereum to Binance Smart Chain, they will deposit ETH on Ethereum and get some token pegged to the ETH value on BSC

Alexander Nazarov, Lead dApp Auditor at Hacken

Exploring Various Ecosystem dApps

Every blockchain ecosystem has its unique dApps. You can bridge your asset from chain A to chain B to explore some dApps in chain B.

Cheaper Conversion

Most of the time, the conversion of assets on bridges requires lower transaction fees than other platforms. Hence, the reason some users often prefer to use bridges.`},
  1296: {id:1296,title:`Risks Of Crypto Bridging`,type:"lesson",duration:"5m",content:`Every innovation bears its inherent risk, and crypto bridges are no exception. As efficient as they are, cross-chain bridges come with risks.

Centralized Theft

Centralized crypto theft is inherent only to trusted bridges. The centralized authority controlling the bridge can unanimously steal users’ funds. Even though no founding team of any trusted bridge has rugged the users, it is possible.

Cloned Bridge Websites

DeFi is booming, and scammers now come up with cloned websites to defraud unsuspecting users. The fake cloned website looks like the actual bridge allowing scammers to steal crypto when a user deposits it for bridging.

On this note, always double-check against phishing to ensure you transfer funds to a genuine bridge application.

Smart Contract & Cybersecurity Attacks

Blockchain bridges have been the target of the most massive attacks in the blockchain world. Hackers have always focused on them due to their relatively high volume of funds. Research confirms that over $2.5 billion have been stolen from cross-chain bridges. This is a quick stat of how much hackers have stolen from some bridges:

Ronin Bridge — $522 million

Wormhole Hack — $320 million

Nomad Hack — $200 million

Multichain Bridge Hack — $3 million`},
  1297: {id:1297,title:`Why Use Bridges Instead Of Exchanges?`,type:"lesson",duration:"5m",content:`There are different routes to transferring assets from one chain to another. While bridges are a prominent option, crypto exchanges also offer cross-chain functionality.

For instance, assume a user has BTC and they need ETH. They can swap their BTC to ETH on a centralized exchange like Binance. Then they can keep the ETH in their Binance wallet or send it to another Ethereum-compatible wallet.

There are four major reasons some prefer bridges to exchanges.

Cost. The process of swapping on an exchange, then sending to another wallet can incur some significant amount of fees. On the other hand, the fees could have been incurred once and for all in a single bridge. Even at that, the transaction fees of most bridges are ridiculously low compared to what exchanges would have charged.

Speed. The processes involved in going through exchanges can be quite time-consuming compared to using a bridge.

Eligibility for airdrops. Blockchain ecosystems often encourage decentralized on-chain interactions rewarding their users with frequent airdrops. On the contrary, those who transfer assets with centralized exchanges cannot benefit from this.

Decentralization. Finally, some choose bridges mainly because of personal preferences and how it is more native compared to exchanges.`},
  1298: {id:1298,title:`3 Most Popular Blockchain Bridges`,type:"lesson",duration:"5m",content:`## Portal

Portal is a cross-chain protocol built on Wormhole. With a TVL of over $288 million, Portal is one of the top bridges in Web3, according to DeFi Lama. It houses 18 popular chains, including NEAR, Celo, and Ethereum.

Portal Pros

• Supports 18 blockchains

• Supports NFTs

• Users can redeem tokens in case of technical mishaps

• Best for bridging from Solana to Ethereum

Portal Cons

• Only support NFTs based on ERC-721 and supply of 1

• Fees can be relatively high

## Multichain Bridge

Multichain has a TVL of around $1.6 billion. It was previously known as Anyswap before rebranding to Multichain. It supports about 88 blockchains, including Optimism, Ethereum, and Arbitrum.

Over 3,500 tokens can be bridged on Multichain, including ETH, DAI, and USDC.

Multichain Pros

• Supports 88 blockchains

• Charges lower fees compared to other bridges

• No slippage fee

• Non-custodial in nature

Multichain Cons

• Has a minimum cross-chain amount

• Bridging can take up to 30 minutes, and even more

## Poly Bridge

Poly Network is one of the most popular cross-chain bridges with over $335 million TVL and supports 32 prominent blockchains.

Poly Pros

• Bridging happen within seconds

• Easy to navigate

• Supports NFTs

Poly Cons

• Bridges limited token pairs`},
  1305: {id:1305,title:`Concluding Remarks`,type:"lesson",duration:"5m",content:`Bridges are touchpoints for everyone in Web3 to transfer assets from one blockchain to another regardless of architecture or consensus mechanisms. A significant amount of DeFi trade volume passes through bridges.

Seeing how innovative bridges are to the Web3 space, it is important to know simultaneously that they are the target of hackers. Bridge hacks take up to 50% of all the losses in crypto. Therefore, bridge developers should audit the important parts of their software.

First, a smart contract audit is important to ensure there are no weaknesses in the computer code that automates every state transition. Secondly, our blockchain security experts strongly recommend conducting a comprehensive dApp audit to ensure secure interaction of off-chain components with blockchain networks. Here’s an example of how dApp Audit can secure your bridge. A bridge oracle performs cross-platform transactions, such as transferring the assets from one blockchain platform to another. Heavy reliance on data provided by the oracle makes it vital to ensure oracles work as intended.`},
  1306: {id:1306,title:`FAQ`,type:"lesson",duration:"5m",content:`Are blockchain bridges safe?

Blockchain bridges are as safe as their technical implementation. Users can assess the risks based on the quality of external audits and the reputation of the founding team.

What is a blockchain bridge?

A blockchain bridge is a portal connecting several distinct blockchains, enabling users to transfer data and assets across different blockchains.

How does a cross-chain bridge work?

A blockchain bridge facilitates the conversion of one native asset from one blockchain to its equivalent on another blockchain. It can provide liquidity from a pool or by using wrapped asset.

Why do we need a blockchain bridge?

We need a blockchain bridge to explore various blockchain ecosystems without any barriers easily and prevent crypto enthusiasts from being locked inside one ecosystem.`},
  1324: {id:1324,title:`Market Structure`,type:"lesson",duration:"10m",content:`Key thing to know, when we're looking at TradingView data, broker data, from one brokerage to another, or one data feed that you're using on TradingView (for instance Oanda vs FXCM), you'll notice that wicks will differ. And why does that happen? Each broker has access to different liquidity pools and fills, therefore price data feed they offer will slightly vary from broker to broker. So essentially, when you are trading with a brokerage, your spreads tend to increase or decrease depending on volatility in market conditions and you can usually see that on a chart in the form of wicks. But if you'wh comparing the overall price action between one data provider and another, the one thing that generally speaking remains very true are the candle bodies. You'll see a little bit of difference when you're mapping out wicks when you're looking at one broker, one wick maybe in the denoted place, but on another broker, it might be actually above.

Market structure shows us as institutional trader where the large majority of buy and sell positions are being placed in the market; it illustrates what positions the banks are currently in (net long/short) and the next major trade they could be placing. Market structure is the first ‘brick layer’ of the house. Without understanding these concepts there is no foundation to your trading. When you are able to understand structure from a macro (Monthly, weekly) and micro (5,3,1 minute TF) perspective, that will put you at the top 1% of your game, as you will understand when the banks are going to take their next impulsive move in their specific bias. Then once you have your POI (point of interest), we can react accordingly on the micro timeframe to get a pin point sniper entry and hold for long last RR trades.

This will often be used on the bigger Timeframes: Monthly, Weekly, Daily and sometimes 4 Hour. It gives us on overview in what direction price is going to trade impulsively. If we are making HH’s and HL’s on the daily timeframe, we should expect a new bullish trend continuation until we reach a valid POI.`},
  1327: {id:1327,title:`Multiplex Structure`,type:"lesson",duration:"5m",content:`There are two different Market structure types we look at: internal and external structure. When we have internal structure, we have something called a multiplex structure.

## RULES OF TRADING THE MULTIPLEX STRUCTURE

• Trade Management Is Key When We Are Trading The Pullback Of An Uptrend , Because On Smaller Timeframes It Will A Bearish Trend , But The Main Purpose Of This Bearish Trend Is To Create A Higher Low On The Higher Time Frame

• So We Must Always Be Strict With Out Profits Target Level . The Way We Take Profit Is Not With The TP Feature But With SL Option . This May Sound ‘Off’ , But Here Is Why Our SL To Take Profit

• When Using Our SL To Take Profit For Pull Back Trades , What We Are Really Doing Is Trailing Our Stop Loss To The Previous Lower High Formed In The Short Term Bearish Trend

• From Our Point 3 Not Only Do We Catch The Majority Of The Move , But We Will Always Get Taken Out In Profit Confidently ; We Will Never Guess Where The Price Is Going To Reverse From , So We Always Have 90% Chance To To See A Trend Reversal. Upon The Reversal We Can Then Look For Longs When We Get To Our HTF POI`},
  1328: {id:1328,title:`Internal and External`,type:"lesson",duration:"5m",content:`The best thing when trading a multiplex structure, that’s internal structure, is to always start on the higher timeframes to get a general understanding of how price is moving. Are we moving upwards creating higher highs and higher lows or are we moving downwards creating lower highs and lower lows? Once you've determined that it becomes more straight forward dropping down timeframes to determine the market structure on those timeframes and correlating them. When specific bias is understood, we can counter trade that specific trend if structure is present on the smaller/micro timeframes. The Rules above is an accurate representation on how we would go about trading a multiplex structure`},
  1329: {id:1329,title:`Structure Break of Structure(BOS)`,type:"lesson",duration:"20m",content:`The HTF will always be our main interest but because the markets are fractal, you’ll be able to utilize LTF just as strongly. This meaning, we can use the multiplex structure to counter trend the main bias; this will also allow us to hedge our position meaning we have capitalized on both sides of the market.

## Break of Market Structure (3 different types)

By understanding structure, we will have multiple opportunities to get into the market but how we become great traders is by minimizing our losses i.e. we take less losses as our losses are capped at 1%. We want to only get into the poi that have the highest probability of working out where price will tap and react off instantly. This is really important for us. If we don’t know what poi to put entry on especially on the lower timeframes we can get into a lot of bad positions. A lot of things can look like poi on the LTF, but they are actually already mitigated. We want to have maximum precision and look for real valid "not yet tested poi " after BOS, because this will avoid us to go further on already filled orders. By waiting for a clear BOS illustrates that big banks and funds are in that move and gives us a good confluence to take the move.

1. Minor BOS(mmBOS)

This occurs on the smaller timeframes; normally on 15m timeframe and below. We will See an initial move in the specific direction banks look to buy/sell the currency pair on the smaller timeframe first.

2. Significant break of the market structure (SBOS)

This occurs on the 15m - 1HR timeframe. This indicates a major amount of buy/sell orders are coming into the market. When we witness a significant break in market structure with an impulsive move bullishly/bearishly, we can then decide to go long/short upon a mitigation. This is because the reasoning of that significant market structure break big banks have brought into that move. Here is an example below.

3. Major Market Structure

This is formed on the Daily Timeframe and above. By us scaling into these larger timeframes we can identify where the majority of smart money positions are placed. If we are constantly breaking market structure bullishly on the weekly timeframe and making HH’s/HL’s we understand the majority of smart money are long, then we can refine our POI on smaller timeframes (POI will be discussed on a smaller timeframe).

Example, if we are looking at an overall daily uptrend, so we're putting in higher highs and higher lows and we start to see on the 4 Hour and 1 Hour that price is making lower lows and lower highs, we might immediately be thinking that we are in a downtrend and that we should only be looking for sells. Well, that may be true on an intraday perspective. One thing we have to keep in mind is what is the higher time frame suggesting from a structural standpoint.

That's when it ultimately comes down to looking at the higher time frame charts and remaining grounded on the actual momentum and the overall trade idea that you're trading. I hope this gives a little bit of insight of the various approaches of mapping market structure as well as identifying breaks of market structure.

Momentum in the Break of Market Structure

There are two main things we look for:

• A large body candle that forms imbalance

• A continuation of these candles

We want to see a committed push breaking structure not an immediate retrace back. If price breaks structure and immediately retraces then this signals weak order flow in that direction. We’re trying to identify where large orders are being placed in the markets. If price immediately retraces after breaking structure that tells us there isn’t a lot of power behind that move so it likely won’t be sustained.`},
  1330: {id:1330,title:`Failure Swing(SMS)`,type:"lesson",duration:"5m",content:`When there is an uptrend market and the price fails to break the last top (Swing High)and breaks the previous bottom (Swing Low), an SMS is considered to have occurred (vice versa for Bearish).`},
  1331: {id:1331,title:`Liquidity Types`,type:"lesson",duration:"15m",content:`Liquidity Types

• Swing high/low

• Equal highs/lows (EQH, EQL)

• Daily/Weekly/Monthly high/low

• BSL/SSL

Where Is Liquidity Found In The Market ?

1: Retail traders place sell stops under lows and buy stops above highs, this is where our focus should be, however we should be monitoring this area, not trading off it. We await to see a reaction. The reaction we wait for is those equal highs/lows to be taken out ,this is because retail traders see equal highs/equal lows as support and resistance, hence why they put pending orders at this area, or take a trade early at support and resistance due to retail traders seeing a previous reaction off that area and then selling from there. This then builds liquidity in the market for banks to use to move price lower. The longer a “support or resistance” has been holding for, the more liquidity will be valid in that area, which leads to a impulsive move created by banks.

Liquidity pool

2: Liquidity pool is an establishment level in the market where stops and orders would be resting, leaving these areas exposed for smart money to hunt these areas taking stop losses and triggering new buy/sell orders that may be present in that area. Buy stops and sell stops are sources of liquidity above and below short term and long term highs and lows. Liquidity can also be engineered, meaning the banks AI create a equal short term high/low, for them to generate liquidity, then take out that liquidity to use to send price in the opposite direction.

Buy and sell stop/side liquidity

3: Buy and sell side liquidity are areas of price in which buy stops or sell stops are mostly residing. When we understand the higher timeframe, we can see where ‘smart money’ are possibly going to go long and short due to areas of price creating “support and resistance”. Price will use these areas to seek liquidity in order to reverse or continue within its expansion move.

When price is making a double top at a resistance, retail traders see this as a sign to short, which in most cases, however, a majority of the retail traders enter the market too early. Price takes out the Equal Highs triggering the stop losses on early sellers and most importantly triggers the buy stops to pickup liquidity, then moves in the intended direction. Similar applies in the opposite scenario with double bottoms.

Now think about it, how many times have you been trapped or took a loss from a setup similar to these scenarios? It happens to retail traders over and over again because they do not understand the reasoning behind the setups. Most retail traders are taught to buy a double bottom and to sell double top. Now that you understand these patterns and how market makers use them, you will be able to see these manipulated moves occur and then enter the market after the manipulation is complete and you have confirmations to enter the market.

• When BSL is taken, the market reverses to the downside.

• When SSL is taken, the market reverses to the upside.`},
  1332: {id:1332,title:`Buy Stop Liquidity(BSL)`,type:"lesson",duration:"5m",content:``},
  1333: {id:1333,title:`What to Focus on for (BSL)`,type:"lesson",duration:"5m",content:``},
  1334: {id:1334,title:`Sell Stop Liquidity(SSL)`,type:"lesson",duration:"5m",content:``},
  1335: {id:1335,title:`What to Focus on for (SSL)`,type:"lesson",duration:"5m",content:``},
  1336: {id:1336,title:`Stop Hunt`,type:"lesson",duration:"5m",content:``},
  1337: {id:1337,title:`Bullish Order Block`,type:"lesson",duration:"5m",content:`The Bullish Order Block is the last bearish candle before the bullish movement, that Break The Market
Structure Higher.Represents a high possibility of holding the price, when the price returns to it.`},
  1338: {id:1338,title:`Bearish Order Block`,type:"lesson",duration:"5m",content:`The Bearish Order Block is the last bullish candle before the bearish movement, that Break The Market
Structure Lower.Represents a high possibility of holding the price, when the price returns toStruc`},
  1339: {id:1339,title:`BREAKER BLOCK /INSTITUTIONAL CANDLE`,type:"lesson",duration:"5m",content:``},
  1340: {id:1340,title:`MITIGATED+BANKER BLOCK`,type:"lesson",duration:"5m",content:``},
  1519: {id:1519,title:`Introduction to Cryptocurrency`,type:"lesson",duration:"5m",content:`What is Cryptocurrency?

Cryptocurrency is a digital or virtual form of currency that uses cryptography for security. Unlike traditional currencies issued by governments, cryptocurrencies operate on a technology called blockchain, which is decentralized and distributed across a network of computers.

Key Features of Cryptocurrencies:

• Decentralization: No central authority controls the currency.

• Security: Transactions are secure due to cryptographic techniques.

• Transparency: All transactions are recorded on a public ledger called the blockchain.

• Anonymity: Users can make transactions without revealing their identities.`},
  1520: {id:1520,title:`The History of Cryptocurrency`,type:"lesson",duration:"5m",content:`Early Beginnings:

• 1990s: Concepts of digital cash emerge.

• 2008: An unknown person or group named Satoshi Nakamoto publishes the Bitcoin whitepaper, introducing blockchain technology.

• 2009: Bitcoin, the first cryptocurrency, is created.

Evolution:

• 2011-2013: Emergence of other cryptocurrencies like Litecoin and Ripple.

• 2015: Launch of Ethereum, introducing smart contracts.`},
  1521: {id:1521,title:`Understanding Blockchain Technology`,type:"lesson",duration:"5m",content:`What is a Blockchain?

A blockchain is a distributed ledger that records all transactions across a network of computers. It ensures transparency and security by allowing anyone to verify transactions without needing a central authority.

How Does Blockchain Work?

• Transaction Initiation: A transaction is requested.

• Verification: Network nodes validate the transaction.

• Recording: The transaction is added to a block.

• Linking: The block is linked to the previous block, creating a chain.

• Completion: The transaction is complete, and the ledger is updated.`},
  1522: {id:1522,title:`How to Get Started with Cryptocurrency`,type:"lesson",duration:"5m",content:`Step 1: Choose a Cryptocurrency Wallet

A wallet is a digital tool that allows you to store, send, and receive cryptocurrencies.

Types of Wallets:

• Hardware Wallets: Physical devices that store your crypto offline.

• Software Wallets: Applications or software installed on your computer or phone.

• Paper Wallets: Physical documents containing your private and public keys.

• Online Wallets: Web-based wallets accessible through a browser.

Step 2: Purchase Cryptocurrency

• Choose an Exchange: Select a reputable cryptocurrency exchange like Coinbase, Binance, or Kraken.

• Create an Account: Sign up and complete any necessary verification processes.

• Deposit Funds: Deposit fiat currency (e.g., USD, EUR) into your exchange account.

• Buy Cryptocurrency: Purchase the cryptocurrency of your choice using your deposited funds.

Step 3: Secure Your Investment

• Enable Two-Factor Authentication (2FA): Adds an extra layer of security.

• Use a Secure Wallet: Transfer your purchased crypto to a secure wallet.

• Backup Your Wallet: Keep a backup of your wallet’s private keys in a secure location.`},
  1523: {id:1523,title:`Common Cryptocurrencies`,type:"lesson",duration:"5m",content:`Bitcoin (BTC)

• Launch: 2009

• Founder: Satoshi Nakamoto

• Purpose: Digital gold and store of value

Ethereum (ETH)

• Launch: 2015

• Founder: Vitalik Buterin

• Purpose: Smart contracts and decentralized applications (dApps)

Litecoin (LTC)

• Launch: 2011

• Founder: Charlie Lee

• Purpose: Faster and cheaper transactions compared to Bitcoin

Ripple (XRP)

• Launch: 2012

• Founders: Chris Larsen and Jed McCaleb

• Purpose: Cross-border payments and remittances`},
  1524: {id:1524,title:`Risks and Considerations`,type:"lesson",duration:"5m",content:`Volatility

Cryptocurrencies are known for their price volatility. Prices can fluctuate wildly in short periods.

Security Risks

• Hacking: Exchanges and wallets can be targets for hackers.

• Phishing: Scammers may try to steal your information through fake websites or emails.

Regulatory Risks

Governments may impose regulations that impact the use and value of cryptocurrencies.

Market Risks

The market for cryptocurrencies is still relatively new and can be influenced by various factors, including market sentiment, technological advancements, and legal developments.`},
  1525: {id:1525,title:`How to Safely Invest in Cryptocurrencies`,type:"lesson",duration:"5m",content:`Do Your Research

• Understand the Project: Research the cryptocurrency’s purpose and the team behind it.

• Check Market Trends: Analyze market trends and historical data.

• Stay Informed: Keep up with news and updates in the cryptocurrency space.

Diversify Your Investments

Don’t put all your funds into one cryptocurrency. Diversify to spread risk.

Invest Only What You Can Afford to Lose

Cryptocurrency investments can be highly speculative. Never invest money you cannot afford to lose.

Long-Term vs. Short-Term Investment

Decide if you want to invest for the long-term (holding for several years) or short-term (taking advantage of market volatility).`},
  1526: {id:1526,title:`The Future of Cryptocurrency`,type:"lesson",duration:"5m",content:`Trends to Watch

• Decentralized Finance (DeFi): Financial services without intermediaries.

• Non-Fungible Tokens (NFTs): Unique digital assets representing ownership of digital or physical items.

• Central Bank Digital Currencies (CBDCs): Digital currencies issued by central banks.

Potential Impacts

Cryptocurrencies have the potential to revolutionize various industries, including finance, supply chain, and healthcare, by providing greater transparency, security, and efficiency.`},
  1527: {id:1527,title:`Advanced Cryptocurrency Concepts`,type:"lesson",duration:"25m",content:`## Smart Contracts

Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute the terms of the agreement when certain conditions are met.

Example: A smart contract for real estate can automatically transfer ownership of a property when the buyer pays the agreed amount.

## Decentralized Applications (dApps)

dApps are applications that run on a decentralized network, typically leveraging blockchain technology. They are open-source, operate autonomously, and use smart contracts.

Example: Decentralized finance (DeFi) platforms that offer lending, borrowing, and trading services without intermediaries.

## Consensus Mechanisms

Consensus mechanisms are protocols used to achieve agreement on the blockchain. They ensure that all participants agree on the state of the ledger.

Common Consensus Mechanisms:

• Proof of Work (PoW): Miners solve complex mathematical puzzles to validate transactions (e.g., Bitcoin).

• Proof of Stake (PoS): Validators are chosen based on the number of coins they hold and are willing to “stake” as collateral (e.g., Ethereum 2.0).

• Delegated Proof of Stake (DPoS): Stakeholders vote for delegates to validate transactions on their behalf (e.g., EOS).

## Mining and Staking

Mining: The process of validating and adding transactions to the blockchain. Miners use computational power to solve cryptographic puzzles and are rewarded with new coins.

Staking: The process of holding and “staking” coins in a wallet to support the network’s operations. Stakers are chosen to validate transactions and are rewarded with new coins.

## Initial Coin Offerings (ICOs) and Token Sales

ICOs are fundraising methods where new cryptocurrencies sell their tokens to investors. It’s similar to an initial public offering (IPO) in the stock market but for cryptocurrencies.

Example: Ethereum raised funds through an ICO in 2014, which helped develop its platform.

## Layer 2 Solutions

Layer 2 solutions are protocols built on top of the base blockchain (Layer 1) to improve scalability and reduce transaction costs.

Examples:

• Lightning Network: A Layer 2 solution for Bitcoin that enables fast and cheap transactions.

• Polygon (formerly Matic): A Layer 2 solution for Ethereum that enhances scalability and lowers fees.

## Privacy Coins

Privacy coins are cryptocurrencies that prioritize anonymity and privacy in transactions.

Examples:

• Monero (XMR): Uses ring signatures and stealth addresses to hide transaction details.

• Zcash (ZEC): Uses zk-SNARKs (zero-knowledge proofs) to ensure transaction privacy.

## Decentralized Autonomous Organizations (DAOs)

DAOs are organizations that operate on blockchain technology and are governed by smart contracts and token holders. They enable decentralized decision-making.

Example: MakerDAO, which governs the issuance of the stablecoin DAI.

## Bridging

Bridging refers to the process of transferring assets from one blockchain to another. This is crucial for interoperability between different blockchain networks.

Example: Transferring Ethereum-based assets (ERC-20 tokens) to the Binance Smart Chain (BEP-20 tokens) using a bridge service.

## Swapping

Swapping involves exchanging one cryptocurrency for another, often facilitated by decentralized exchanges (DEXs) or swapping services.

Example: Using Uniswap to swap Ethereum (ETH) for a different ERC-20 token like Chainlink (LINK).

## Yield Farming and Liquidity Mining

Yield farming and liquidity mining are practices within DeFi where users provide liquidity to platforms in exchange for rewards, often in the form of additional cryptocurrency.

Example: Providing liquidity to a Uniswap pool and earning UNI tokens as rewards.

## Flash Loans

Flash loans are a type of uncollateralized loan in DeFi that must be borrowed and repaid within the same transaction. They are often used for arbitrage opportunities.

Example: Borrowing funds via a flash loan on Aave, executing a series of profitable trades, and repaying the loan all within one transaction.

## Cross-Chain Interoperability

Cross-chain interoperability enables different blockchain networks to communicate and interact with each other, allowing for the seamless transfer of assets and data.

Example: Polkadot’s ecosystem allows different blockchains to connect and interact through its relay chain.

## Oracles

Oracles are services that provide external data to blockchain smart contracts, enabling them to interact with real-world events and information.

Example: Chainlink provides decentralized oracle services that bring off-chain data onto the blockchain for use in smart contracts.`},
  1528: {id:1528,title:`Conclusion`,type:"lesson",duration:"5m",content:`Cryptocurrency represents a revolutionary step in the evolution of money and finance. While it offers numerous opportunities, it also comes with risks. By educating yourself and following best practices, you can navigate the world of cryptocurrency with confidence. Advanced concepts like smart contracts, dApps, consensus mechanisms, bridging, swapping, and Layer 2 solutions offer exciting possibilities for the future of digital finance.`},
  1551: {id:1551,title:`WHAT IS FOREX?`,type:"lesson",duration:"5m",content:`Forex currencies are traded in pairs (e.g. British Pound vs Australian Dollar). Money is made from the forex market by using technical and fundamental analysis to predict future price movements.

The foreign exchange markets are open from 00:00am Sunday to 00:00am Friday, 24 hours a day. This means that with the correct strategy and risk management, you can profit from the market 5 days a week or any time of the day.

The market is forever growing and expanding as more individuals become familiar with trading and investing in the foreign exchange. The most commonly traded currencies we look at are the US Dollar, British Pound, Aussie Dollar, New Zealand Dollar, Japanese Yen, Swiss Franc, the Euro and the Canadian Dollar.`},
  1552: {id:1552,title:`TYPES OF FOREX ANALYSIS`,type:"lesson",duration:"5m",content:`## TECHNICAL

Technical analysis is the study of historical currency price charts in order to spot future patterns and technical signals which will allow a trader to make their decision on which way the market is going to move and make a profit or loss based on that prediction. Technical analysis can be different for every trader. A trader will create something called a trading plan in which they implement their strategy and various trading tools to gain profit from the forex market. Technical analysis would include tools such as support and resistance, trendlines, supply and demand zones in combination with various indicators of your choosing.

## FUNDAMENTAL

Fundamental analysis is the use and study of economic market news to make a directional bias and to predict future movements in price. The idea behind fundamental analysis is that we use it in conjunction with our technical analysis as we believe that fundamental factors push the market to our predetermined technical levels.`},
  1553: {id:1553,title:`TYPES OF FOREX TRADERS`,type:"lesson",duration:"5m",content:`## SWING TRADERS

Swing traders are longer term traders. This is someone who has the capability to plot and take long term trades based on their analysis. A swing trader can hold trades anywhere from weeks to months while just taking small profits along the way or adding positions along the way. Timeframes to look at would usually be daily, weekly, and monthly charts.

## DAY TRADERS

Day traders can also be described as intraday traders. This is someone who tries to catch intraday movements in the market. A day trader usually does not hold their trades longer than a week as their predetermined levels would have been based on shorter term analysis.
Timeframes to look at would usually be 1hr, 4hr, and daily charts.

## SCALPERS

Scalpers are the most short-term traders in the market. Their analysis is based on very low timeframes with the idea of catching small movements within the market. A scalper usually holds a trade for anywhere from a few seconds to a few hours. Timeframes to look at would usually be 1min, 5min, 15min, 30min, and 1hr charts.`},
  1554: {id:1554,title:`TERMINOLOGIES`,type:"lesson",duration:"10m",content:`PIPS |
Pips are the unit of measurement that we use in Forex to show the change in value between two currencies. |

SPREAD |
There are two different prices on a trading platform. The bid price and the ask price. The bid price is the price at which you can sell the currency and the ask price is the price at which you can buy the currency. The difference is spread and this is one of the ways trading brokers make their money. |

LEVERAGE |
Leverage is your buying power. The higher your leverage, the more buying power you have in a sense that you will have more equity to make more money. Higher leverage does however have its negatives as well, it can lead to bad risk management and bad money management. |

MARGIN |
You can define margin as the amount required to open a trade. Your margin goes hand in hand with your leverage. The higher the leverage, the higher the margin will be and vice versa. |

PENDING ORDERS
|
Sometimes we cannot be behind our phone or laptop to execute a trade. This is when we use pending orders. They can be set at predetermined levels and will be activated once price touches the entry price suggested. |

LONG |
Fancy term for buying into the market. |

SHORT |
Fancy term for selling into the market. |

BUY LIMIT |
When your pending order is placed below asking price, your bias is that the market will go up when activated. |

SELL LIMIT |
When your pending order is placed above asking price, your bias is that the market will go down when activated. |

BUY STOP |
When your pending order is placed above asking price, your bias is that the market will keep going up once activated. |

SELL STOP |
When your pending order is placed below asking price, your bias is that the market will keep going down once activated. |

TAKE PROFIT |
This level is your suggested trade exit when you are in profit. |

STOP LOSS |
This level is your suggested trade exit when you are in a loss. |

RESISTANCE |
Resistance can be defined as a zone at which price struggles to break above. Resistance can also be seen as the ceiling of the market. |

SUPPORT |
Support can be defined as a zone at which price struggles to break below. Support can also be seen as the floor of the market. |`},
  1556: {id:1556,title:`MARKET STRUCTURE`,type:"lesson",duration:"5m",content:`BULL TRENDS (UPWARD MOVEMENT)

A simple way to describe a bullish market is one that is trending in an upward direction. A market that is trending bullish will create what we call Higher Highs and Higher Lows (HHs and HLs) as price is taking out previous highs and lows that price has previously created.

BEAR TRENDS (DOWNWARD MOVEMENT)

A simple way to describe a bearish market is one that is trending in a downward direction. A market that is trending in a bearish manner creates what we call Lower Highs and Lower Lows (LHs and LLs) as price is taking out previous highs and lows that price has previously created.

CONSOLIDATION (RANGING MOVEMENT)

A market that is consolidating or is in a consolidation phase and can also be described as a sideways or ranging market. This is when price is moving in a sideways manner and only trading between 2 certain key levels which is known as support and resistance.

## LIVE TREND EXAMPLES:

BULL TREND

BEAR TREND

CONSOLIDATION TREND

Explanation: Break of consolidation (candle stick closed below support), retest of newly found resistance – downward momentum expected.`},
  1557: {id:1557,title:`BAR CHARTS`,type:"lesson",duration:"5m",content:`There are 3 main types of charts:

## BAR CHARTS

The bar chart displays 4 main pieces of information. The bar consists of an open, high, low, and close. This is shown in the example above. The bar displays the price for the period of time you wish to view with regards to timeframes. If you were to analyse a 1-hour chart, each bar of price would equate to 1 hour of price movement.

The bar chart is displayed as a vertical line with the top end of the line as your high and the bottom end as your low.

The horizontal line sticking out to the left is the open of that price period and the horizontal line sticking out to the right is your close.`},
  1558: {id:1558,title:`LINE CHARTS`,type:"lesson",duration:"5m",content:`The line chart is clean and extremely simplified compared to the bar chart. The line chart is tidy and effective for mapping out support and resistance areas, however it isn't practical for execution of trades as it only captures the opening and closing of price.

Due to the line chart only capturing the open and close, the closing price is the most important factor as it shows whether sellers or buyers had control in the market, for that specific time period.

Line charts hold most of their value in setting up support and resistance as it is tidy and avoids “noise” in the market.`},
  1559: {id:1559,title:`JAPANESE CANDLESTICK CHART`,type:"lesson",duration:"5m",content:`Candlesticks present the same data as a bar chart however it is a lot easier on the eyes. The candle wicks present the high and low of that specific time period. The body of the candle shows the price range between the opening and closing price.

If the body of the candle is blue, it indicates the price of that currency pair, commodity has closed higher than the price where it opened. The same goes for a pink candle, however this means price has decreased and closed lower than the opening.

At Fortitude FX, we encourage our students to mainly use the Japanese candlestick chart as this is our preferred method. Using this method over the traditional bar or line chart has various advantages:

Candlesticks are easier to follow and easier to read for a beginner in the forex market. It provides a bit more information regarding price than other charts but is still simple to understand.`},
  1560: {id:1560,title:`ANATOMY OF JAPANESE CANDLE STICKS`,type:"lesson",duration:"5m",content:`## BULLISH CANDLE STICK

## BEARISH CANDLE STICK`},
  1561: {id:1561,title:`TIMEFRAMES EXPLAINED`,type:"lesson",duration:"10m",content:`Forex pairs can be viewed on different time frames from Monthly to 1-minute levels. At Fortitude FX, we usually do not look at anything lower than the 15-minute timeframe and when we do, it is only for refining our entries. As we go from higher-to-lower time frames, each candle reveals more information about the price.

Above we have an example of a monthly chart. Each candle above represents one whole month worth of that currency pairs price moving.

This is where we can identify long term trends established over many years/months. It is not a great time frame to execute your trade from however it is the basis for your analysis.

Above we have an example of a weekly chart. Each candle above represents one week (5 days, as the market is open Monday - Friday) of a currency pair’s price movement for that week. Four weekly candles would amount to the price action within one monthly candle.

Above we have an example of a daily chart. Each candle above represents one day (24 hours) of a currency pair’s price moving and the price action for that day. Five daily candles would amount to the price action within one weekly candle as the Forex market is only open Monday to Friday.

Above we have an example of a 4 Hour (4H) chart. Each candle represents 4 hours of a currency pair’s price movement and the price action that took place in those 4 hours. Six 4H candles would amount to the price action within one daily candle. (24 Hours in a day) 4H candles open at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00 SA time and repeat.`},
  1562: {id:1562,title:`OVERVIEW`,type:"lesson",duration:"5m",content:`Fundamentals can cause high volatility and influxes of volume into the market. We try our best to stay out of the market when such economic events are happening as trading news events can be detrimental to your trading account.

We look out for news events such as a country’s GDP announcements, Interest Rate Decisions, CPI announcements, Retail Sales, Employment Reports and Inflation announcements. These economic events are the most influential in terms of how they affect a currency whether it be a positive or negative effect on that currency.`},
  1563: {id:1563,title:`SETTING UP PLATFORMS`,type:"lesson",duration:"5m",content:`## FUNDAMENTAL WEBSITES

Forexfactory.com and Investing.com are the two websites we use to find out what economic events are happening for the week and on specific days. We also use these sites to find breaking news regarding currency pairs and indices. Economic news can cause huge volume spikes and volatility in the market.

## TRADING VIEW SETUP:

Favourites Toolbar Set-up:

• Trendline

• Horizontal Line

• Horizontal Ray

• Arrow

• Fibonacci Tool

• Rectangle

• Ellipse

• Text

• Long Position (Buy)

• Short Position (Sell)

• Price Range (Used to measure movement percentage, pips and points)

• Minimize sidebars for a larger vision of your chart

• Star to favourite your timeframes for easy access

Setting up your Fibonacci Tool:

• We only use 61.8% and 78.6% levels for trade execution.

• Our target levels are -27% and -61.8%.`},
  1564: {id:1564,title:`RISK MANAGEMENT`,type:"lesson",duration:"10m",content:`There is always a certain amount of risk involved in trading. You need to be aware of risk and understand the risk to reward ratio (RRR) and risk management before entering the market.

The RRR is the most effective way to leverage trades. You do not need to over leverage and risk too much of your capital to make a lot. That is essentially gambling.

The Risk to reward tool displayed when you place a short or long position on the chart shows how much you are risking compared to how much the reward is.

At Fortitude FX, we believe the best RRR is 1:3. Risking 1-3% of your account per trade. Over leveraging can cause revenge trading as your emotions can spiral out of control if the trade doesn’t go your way.

EXAMPLE:

Account size = $2000
Risk per trade = 1% (20$)

If you are busy analysing the market and see a possible setup, you would risk 20$ of your account, to make 60$ as the risk to reward ratio is 1:3.

If you stick to the risking 1-3% per trade, you will never risk anything more than 60$ per trade.

To ultimately identify risk, you also need to calculate the number of pips lost or gained per trade.

How to calculate the lot size that needs to be used to manage your risk

• Amount of dollars we are risking? = 20$

• Divided by the stop loss in pips = 20 pips risk

• Pip count (20), divided by 10 will give the lot size you should use = 0.10`},
  1565: {id:1565,title:`RISK AND REWARD EXAMPLE`,type:"lesson",duration:"15m",content:`Above example we have a RRR 1:1. Price is currently on a downtrend. We have used our Fibonacci Tool as a target level. We are aiming to create another LL on this trade. The stop loss is above the recent LH.

There is a high possibility that the trade will keep going to the downside, however as we know that anything can happen in the market, and setting your levels at a 1:1 ratio is essentially gambling, we would need to structure our levels differently.

Here we have a RRR 1:2 on the same trade. We have now decided to target the -27% on our Fibonacci Tool as we suggest a new LL will be printed on the chart.

By having a 1:2 ratio you could lose two trades, win one trade and be break even as the win amounts for more reward than the loss.

Above is a RRR 1:3, this is the type of risk we aim for on every trade we enter at Fortitude FX. Our target is the Fibonacci Tool -27%, our stop loss level is above the 78.6% as we know that price can turn around if it pushes up and touches that level.

As we get more experienced with trading, our entries will become cleaner, above is a RRR of 1:6. The entry was off the hourly close, as it closed just below our Finonacci Tool level of 78.6%.

It takes a skilful trader to spot and execute such high risk/reward trades. As you can see time and time again, the market provides huge moves which can provide profits unthinkable compared to savings accounts with a bank.

You should never enter a trade with a risk/reward ratio less than 1:1 as this means you would be risking more than the reward you could possibly gain.

As shown above with the 1:6 risk/reward, an experienced trader can find and execute these trades with 1:6 and even higher ratios. This however requires the trader to wait for the trade with this risk/reward ratio, but the reward is worth it. Patience is key in trading.

Remember, the less you are in the market, the less risk you are exposed to. So, having a higher risk/reward ratio and having patience can be extremely beneficial. It is difficult to increase your account with lower risk reward ratios and you could suffer a losing streak which will take longer to regain. Waiting for the best risk/reward ratio may be time consuming however the benefits of a higher reward ratio is worth the patience and effort.

By having a risk reward ratio in place, you know your risk at stake, and you understand the potential reward. The aim is to develop discipline and patience in order to execute high risk /reward setups that make sense and are justifiable technically, fundamentally and in monetary terms.

EXAMPLES:

• If the risk is $100 to gain a reward of $300, the risk to reward ratio is 100:300 (1:3) = Great

• If the risk is $300 to gain a reward of $600, the risk to reward ratio is 300:600 (1:2) = Good

• If the risk is $1000 to gain a reward of $500, the risk to reward ratio is 1000:500 (2:1) = Bad`},
  1566: {id:1566,title:`AVOIDING BAD HABITS IN RISK MANAGEMENT`,type:"lesson",duration:"25m",content:`## STACKING

When you take a trade and the price starts to go against you, and you start entering again, thinking that the price will reverse and go in the direction you predicted. By stacking entries, you are instantly putting more pressure on your trading account.

When stacking the trader believes either of the 3 below things will happen:

• The trade will double up the profits.

• More pips will be gained than the previous set-up.

• The trade reversal has just ‘begun’.

Lack of patience and knowledge will force traders into these situations.

## HOW CAN WE AVOID STACKING?

Avoid entering trades when price goes against you as this increases the risk. Stick to your trading plan, technical analysis and initiative. If you plan on entering a trade while already having a position, make sure you are scaling in and not stacking trades. This is re-entering when you are already in profit, however this is advanced trading and should only be attempted once mastering the initial entry strategies.

## LOSING STREAKS

As traders we need to understand that not every trade will go perfect, we need to plan for the worst and suggest that any trade can be a losing trade. It is our responsibility to protect our account, and NEVER over leverage our account.

Losing streaks are a part of trading, it happens to the best traders. It is easy to break away from your rules – ALWAYS stick to your trading plan.

A skilful trader with an 80%-win ratio understands that 20 out of 100 trades could go wrong, this is basic probability. Knowing that you could have an 80%-win ratio and still being able to lose 20 trades in a row should put it into perspective, if you risked 5% per trade, your account would be blown after the 20th trade. This is why we strongly suggest 1-3%.

Build a trading plan, set your risk percentage and if you take a loss, step back and come back to the charts with a clear and rational mindset for the next trade. Preparation is key and we understand the importance of a healthy mind, body and spirit so keep balance.

## ADJUSTING YOUR STOP LOSS (SL)

Your stop loss is pre-determined before the trade is executed. When the trade was placed, it was set with a rational, open mind that the trade can go against us. When the trade is going against us, our emotions start taking over and we start suggesting that if we adjust our stop loss, the trade won’t hit our stop and we won’t lose capital.

The stop loss is placed to save your capital in your trading account.

## MISTAKES MADE BY NEW TRADERS

• Not setting a stop loss at all.

• Keeping your stop loss as tight as possible, not allowing your trade to breathe, resulting in your stop being triggered.

• Traders moving the stop loss to a higher level, risking more capital than previously suggested.

Remember to place your stop loss based on what makes sense, not based on what you want to happen.

## ALOWING YOUR TRADE TO BREATHE

Before we enter the market, we understand that the market takes time to move up and down, it is impossible to always find the perfect entry in a trade, therefore we acknowledge that the trade needs time to ‘breathe’ before we start going into profits. Most new traders will see the trade going against them and immediately start to panic.

If your risk/reward was taken into consideration before entering the market, there shouldn’t be any panic once you see a trade going against you.

As you can see above, not all trades go straight into profit once executed. The market doesn't always go in an uptrend or a downtrend. The majority of time the market is spent in consolidation moving sideways.

This trade was held through the drawdown and look at the final result. Patience, a trading plan with proper risk management will always work when striving for longevity.

Remember, the stop loss is there for a reason – use it. One bad decision may blow your account so be careful with risk management. Lastly, ask yourself if the trade makes sense before entering any trading setup. Be meticulous with your entries and focus on high probability and high-risk reward ratios.`},
  1567: {id:1567,title:`TECHNICAL ANALYSIS`,type:"lesson",duration:"20m",content:`Technical analysis and charting patterns are all forms of price action, the overall analysis and price movement of any given market over a period of time. Once you have charting experience you’ll use technical analysis to determine a pairs directional bias.

Raw Price Action provides every signal necessary to enter a trade in the market, there isn’t a need for indicators due to the fact that we want to practice chart hygiene and avoid messy charts.

## TOP-DOWN ANALYSIS AND TIMEFRAMES

It’s important to have a good understanding of the bigger picture and we use top down analysis to get this understanding. We start by looking at the bigger picture and then zoom in to understand full directional bias and get the best possible entries for our trades.

When beginning with top-down analysis, we look at the Monthly timeframe as crucial to understand the long-term trend of the currency. The main timeframes we use are:

• Monthly

• Weekly

• Daily

• 4 Hour

• 1 Hour

• 15 Minute

Analysing the longer time frames will give you the bigger picture of the market in order for you to establish if it's trending to the upside, downside or trending sideways in consolidation.

Having a look at the Monthly timeframe above, we have firstly identified clear areas of support and resistance. Looking towards more recent price action we can see an inverse head and shoulder forming with price currently testing the right shoulder again after the prior monthly had a wick rejection off this zone. This leads us to anticipate another rejection off of this zone with the support holding to give us a move to the upside.

Dropping to the weekly timeframe above, again here we can see a beautiful wick rejection off of our highlighted support zone. This market has also been making higher highs and higher lows which leads us to believe that this is potentially the next higher low. Above and beyond this, we have tested our most favourable Fibonacci level, the 78.6% and had a rejection from this level.

Above, we are looking at the daily timeframe for further confirmation of our bullish bias, we’ve highlighted our support level with white horizontal. The candlestick pattern highlighted in white is called a bullish engulfing and we generally look for these candlestick patters at support/resistance. This is further bullish confluence as generally a bullish engulfing is followed by a push upward. Our main concern on this timeframe is the trendline that will have to be broken to confirm the bigger bullish move as well as a structure shift is required on the daily as its been making lower highs and lower lows.

Dropping down further to the 4H timeframe above, we have an ascending and descending trendline meeting, creating a wedge. This is generally where you will await a breakout and either trade the breakout or the retest either way, weather it breaks up or weather it breaks down. In this example, we knew price had to make a move, and because of the prior bullish engulfing on the daily timeframe we were bullish on this pair and anticipating a break to the upside.

As previously mentioned, we were awaiting a breakout either way but anticipating it to be to the upside. 4H closed above the trendline confirming the breakout and we went long for 65 pips.`},
  1568: {id:1568,title:`HOW DO WE IDENTIFY SUPPORT AND RESISTANCE`,type:"lesson",duration:"15m",content:`What we are looking for are things such as:

• Areas where price bounced or reversed

• Candlestick patterns

• Psychological levels

• Wick rejection areas above support and below resistance

• Double Body Candles

Support and resistance are the foundation of price action trading. In simple terms, support will act as a ‘floor’ in the market where the market will generally bounce from, and resistance will act as a ‘ceiling’ where the market will generally fall from.

Generally, what we see in the market is that once a level is broken to the upside, we will retest that price point as before seeing the continuation upward and the same goes for the downside scenario.

Once a resistance level is broken, when it retests that level, you can expect broken resistance to act as support and vice versa.

One more thing to consider is psychological levels. These are clean, round numbers such as 100.000 / 105.000. It’s important to also take note of the decimal values and these values include the x.250 x.500 and x.750 numbers. An example of these is 100.250 or 100.500.

Below are a few examples of how we identify support and resistance starting on the monthly timeframe and working our way down.

Above is an example of support and resistance on the monthly timeframe. Where you see green arrows pointing upward, this is a level of support. The red arrows pointing downward are identifying levels of resistance. This is a great way to determine a long-term outlook, however, generally you don’t want to be looking further back than 12-16 months as the levels you utilize should be recent and reactive.

Example of reactive, most recent monthly levels of support and resistance. You generally don’t want these monthly levels exceeding 1000 pips between each other.

Above is an example of weekly support and resistance levels. Using double bodies and looking for wick rejections as well as identifying areas the market respected on more than one occasion is what helps us identify these levels.

Above is an example of daily levels of support and resistance. Support and resistance levels are essentially levels that you want to be buying or selling from so they form the foundation of your trading and it’s important to make sure that you can identify these levels within the market.`},
  1569: {id:1569,title:`TRENDLINES`,type:"lesson",duration:"5m",content:`Trendlines are an extremely powerful tool when used correctly in trading. A trendline is connecting 2 or more highs or 2 or more lows with the connecting line exceeded into the future and we draw this line by using our trendline tool on Trading View and we suggest connecting the wicks of the candle sticks and not the bodies.

Trendlines are dynamic support and resistance, meaning that they are support and resistance but also moving areas of support and resistance.

Below is an example of a descending trendline.

Below is an example of an ascending trendline

Trendlines are most reliable and reactive on the third touch of the trendline. This is generally when you would anticipate a push in price off the trendline or through the trendline.

There are only one of two things that can happen at a trendline:

• Trendline bounce

• Trendline break and retest`},
  1570: {id:1570,title:`TRENDLINE BOUNCE`,type:"lesson",duration:"5m",content:`Above we have an example of the trendline bounce. On the third touch, we respected the trendline and price bounced to the downside. Placing our stops 15-30 pips above the second touch of the trendline we were able to achieve a simple 1:3 RR.`},
  1571: {id:1571,title:`TRENDLINE BREAK AND RETEST`,type:"lesson",duration:"10m",content:`Above we have a trendline break and retest. Whilst anticipating the third touch, the trendline gets broken thus you switch your bias to bullish after the high was formed and await to take a long position on the retest of the trendline, 1:3 RR.

EXECUTION RULES FOR TRENDLINES

• Trade with the trend and not against it. If you have a descending trendline with lower highs and lower lows make sure you are only looking to short the market, same if you have an ascending trendline with higher highs and higher lows, make sure you are only looking to take long positions.

• 3rd Bounce – This is the execution point most times. We generally expect an aggressive more in price upon the 3rd touch of the trendline.

• Break and retest – Once you’ve decided to enter because you’ve seen a shift in the market and the trendline has been broken make sure you ALWAYS wait for a retest of the trendline to increase your risk to reward as well as provide more confirmation on your bias.

• Body closures – It’s so important to make sure you wait for the candlestick you’re looking at to close and decide based on the closure of the candlestick not beforehand. If you’re looking to buy, make sure the prior candlestick that touch the trendline closed above it before entering and vice versa.

• SL And TP Placement – When a trendline has been broken, your targets become the first and second point of the trendline. Stop losses you generally want 15-30 pips under the prior low or above the prior high.`},
  1572: {id:1572,title:`TRENDLINE TIMEFRAMES`,type:"lesson",duration:"5m",content:`There are no right or wrong timeframes to use trendlines on. Just always make sure what you’re utilizing is relevant.

We generally start our search for trendlines on the weekly timeframe, but this is sometimes too much of a zoomed-out approach for some and they might start their search on the daily or 4H. It’s all dependent on the type of trader you are and the timeframes you utilize.

One thing to keep in mind is, the longer term trendlines will be stronger but also take longer to react, whereas the short term trendlines can often be broken but will act aggressively.

We would suggest especially as a beginner to not look for any trendlines on any timeframe lower than the 1H as we believe that the 30 min and 15 min timeframe are purely for refining our entry points.`},
  1573: {id:1573,title:`FIBONACCI`,type:"lesson",duration:"5m",content:`The Fibonacci is an amazing tool that adds as an extra confluence to our trade set ups. The Fibonacci acts as additional levels of support and resistance and we use these levels to determine zones where price may reverse from or where price may be heading toward.

Different levels within the fib represent the amount in percentage that the market has retraced from the origin of where you placed your fib.`},
  1574: {id:1574,title:`Different Fibonacci Retracement Zones`,type:"lesson",duration:"10m",content:`50% - This is not often used unless you’re trading gold. This shows that the market has retraced 50% of the way from swing high to swing low or vice versa. This Fib level is less aggressive

61.8% - The movement off the 61.8% is more aggressive than the 50% and this is considered the Golden ratio in Fibonacci. You can expect the market to react to this level a lot of the time

78.6% - This is the preferred level to trade off. The market moves the least aggressive off these levels and trading the 78.6% will always give you the best risk to reward as it’s the deepest retracement. You need to be mindful that the market will not always retrace as deep as the 78.6% before making its move.

When plotting a bullish Fibonacci like the one above, you want to start your fib from the most recent low marked as A, to the most recent high marked as B.

Above is an indication of how the previous example played out. Here we see a perfect 78.6% retracement with a bullish engulfing off the 78.6% showing us signs of a bullish reversal and before we know it both targets end up being met.

Above is an example of a bearish fib. Here you want to plot your fib from the recent high to the most recent low marked A and B on the example. Here you’ve waited, the market has got to the 78.6% where you are expecting reversals from, you have a daily close as a bearish engulfing so it’s safe to enter the short. Let’s see how this played out.

Above is the result of how the bearish fib played out. It is very important that you do not solely rely on the Fibonacci as your main confluence, you must use this in conjunction with all the other confluences that are taught throughout the course to get the most out of it.`},
  1575: {id:1575,title:`INVALIDATING FIBONACCI SETUPS`,type:"lesson",duration:"5m",content:`The Fibonacci is meant to be used in conjunction with everything else. So, first of all, market structure is important. You do not want to be looking at bullish fibs in a bearish market and vice versa.

When looking at the Fibonacci, the 78.6% level is the deepest level of retracement and it’s because of this that we consider a body closure above the 78.6% an invalid set up.
In other words, if we break the 78.6% and have a candle closure outside of the zone, the trade you were looking for is then considered invalid.`},
  1576: {id:1576,title:`DRAWINGS TO HELP UNDERSTAND THE FIBONACCI`,type:"lesson",duration:"10m",content:`Above is an illustration of a bearish fib example. As you can see, we pull the fib from the most recent high to the most recent low, from left to right. We then wait for the retracement level of the 78.6% to enter the trade. From this level we fall to our first target.

It’s important to take not of the descending trendline as often when working with Fibonacci retracements it will work hand in hand with a trendline as you will be following the trend.

Above is an example of an illustration of a bullish fib. We pull the bullish fib from the most recent low to the most recent high, from left to right. Here again, we wait for the 78.6% level on the fib, this also lines up with our third touch of the trendline and target 1 is achieved.

BULLISH FIBONACCI RULES

• Have a minimum of 3-4 support and resistance zones when using the Fibonacci

• Make sure all your trendlines and other technical tools are on the chart

• Once you’ve established a potential reversal area, make sure you do not take the trade immediately and instead await candlestick confirmation and a proper reversal

• Once the reversal takes place, make sure your stoploss is 15-30 pips below the 78.6%

BEARISH FIBONACCI RULES

• Have a minimum of 3-4 support and resistance zones when using the Fibonacci

• Make sure all your trendlines and other technical tools are on the chart

• Once you’ve established a potential reversal area, make sure you do not take the trade immediately and instead await candlestick confirmation and a proper reversal

• Once the reversal takes place, make sure your stoploss is 15-30 pips above the 78.6%`},
  1577: {id:1577,title:`CANDLESTICKS`,type:"lesson",duration:"5m",content:`Our preferred charting method is to use Japanese Candlesticks. The Japanese used this system to analyze their rice market and very quickly it became a preferred method of charting worldwide.

We use candlesticks to paint a clear picture of the price action, but it is important to know when to use them. It’s useless using these methods when the chart is in “no man’s land “. You will mostly use these candlesticks at areas of support and resistance to spot a reversal and get confirmation to your trades.`},
  1578: {id:1578,title:`DIFFERENT CANDLESTICK FORMATIONS`,type:"lesson",duration:"20m",content:`## BULLISH ENGULFING

A bullish engulfing is when a new bullish candle engulfs the body of the previous candle. Bullish engulfing’s generally occur at support. This shows buyers are taking control of the market and that bearish momentum is slowing down.

## BEARISH ENGULFING

A bearish engulfing occurs when a new bearish candle engulfs the body of the previous candle. Bearish engulfing’s generally occur at resistance. This shows that sellers are taking control and that the buyers are losing momentum.

## Doji

A Long Legged Doji will have a wick to both the upside and downside. This Doji pattern shows us that price traded highly above the opening of the candle and dropped well below the opening of the candle but could not maintain either of those prices. It is referred to as an indecision candle.

## SPINNING TOP

This is a candlestick with a long upper wick and a long lower wick but a small body. This shows us a battle between the buyers and sellers causing another form of indecision candle.

The colour of the body does not matter, all that’s being showed is that price moved higher and lower but didn’t sustain that movement and closed close to where it opened originally.

## HANGING MAN

This is a bearish candlestick pattern found at the end of an uptrend. This is formed when there is heavy sell pressure at the end of an uptrend but before candle closure the buyers are able to push the price back up to/near the opening price.

This tells us that the buyers are slowly losing control and starting to exit the market. On our charts this is seen to have little to no wick to the upside with a lower wick being at least twice the length of the body of the candle. Hanging Man Candlesticks are most effective when found at points of resistance.

## HAMMER

The Hammer is similar to the Hanging Man but means the opposite. They both have small bodies with long lower wicks and short/no upper wick. The Hammer is usually found at the bottom of a downtrend and indicates a reversal in a bullish market. It tells us that when spotted during a period in time where the market is bearish that it could be the end of the trend and a reversal is soon to occur.

The long lower wick shows us that sellers were able to push the price lower but before candle closure the buyers were able to push the price back up to or near the open price.

## SHOOTING STAR

This candlestick pattern is formed when the open, low and close of the candlestick are more or less all the same price. This is usually seen on our charts as a long upper wick normally twice the size of the body. When the low and the close of the candlestick is the same this is called a bearish Shooting Star. This shows us that the sellers were able to reject the buying pressure and is used as a strong confluence as the sellers were able to push price all the way back down and even close below the opening of the candlestick.

This candlestick pattern often indicates the end of an uptrend and the reversal into a downtrend.

## EVENING STAR

An Evening Star pattern consists of three candles. The Evening Star pattern will start with a bullish candle which represents the buyers having control in the market. The second candle will either be a Shooting Star, a Doji or a Spinning Top. The second candle will show a slowdown of momentum or indecision in the market. The third candle should be a bearish candle which closes within the lower 40% of the first bullish candle’s range.

## MORNING STAR

A Morning Star pattern also consists of three candles. The first of which being a bearish candle which shows us that sellers are still in control of the market. The next candle will be either a Shooting Star, a Doji or a Spinning Top. This candle is representing indecision in the market and gives us our first sign of a reversal. The third candle should be a bullish candle which closes within the lower 40% of the first bearish candle’s range.`},
  1669: {id:1669,title:`QUIZ`,type:"quiz",duration:"5m",content:``},
  1707: {id:1707,title:`ENTRY EDGES`,type:"lesson",duration:"5m",content:`• STOP HUNT + BREAK OF STRUCTURE + POINT OF INTEREST

• POINT OF INTEREST + BREAK OF STRUCTURE

• SHIFT MARKET STRUCTURE(SMS) + BREAK OF STRUCTURE + BREAK OF STRUCTURE`},
  1708: {id:1708,title:`TIMEFRAME SET UPS`,type:"lesson",duration:"5m",content:`• For Swing TradingHTF: Weekly, Daily, H4.Entries: H1, M30, M15 (Sometimes on H4).

• For Short Term TradingHTF: Daily, H4, H1Entries: M30, M15 (Sometimes on H1).

• For Day Trades and ScalpsHTF: H4, H1, M30Entries: M15, M5, M1 (Sometimes on M30).`},
  1709: {id:1709,title:`BONUS`,type:"lesson",duration:"5m",content:``},
  1803: {id:1803,title:`Introduction: Make ICT Daily Bias Easy`,type:"lesson",duration:"5m",content:`Whether a novice or an experienced professional, the importance of finding the correct daily bias within the marketplace cannot be overlooked. While often misunderstood and overcomplicated in ICT trading, determining the daily bias can be the key to becoming a successful trader rather than getting lost in an overload of information.

Simply put, daily bias refers to the overall direction in which one anticipates the current daily candle to close (i.e., whether buyers or sellers are in control). When a trader clearly understands the daily bias, trading becomes simple. All they need to do is wait for an entry model that aligns with the market's overall bias.`},
  1804: {id:1804,title:`Understanding the Market`,type:"lesson",duration:"5m",content:`In trading, External Range Liquidity (ERL) and Internal Range Liquidity (IRL) are key concepts for grasping market dynamics and overall direction. ERL refers to the liquidity found at the extremes of a trading range (beyond previous highs and lows), while IRL refers to liquidity within a fair value gap.

At any point, price is always moving from ERL to IRL or vice versa. Identifying this directional bias simplifies understanding market direction.`},
  1805: {id:1805,title:`Liquidity: E R L &amp; I R L`,type:"lesson",duration:"5m",content:`While ERL/IRL helps decipher where the market is headed, the lower time frames will denote when a move begins and ends. In fact, every time price moves from IRL to ERL—or vice versa—there is a market maker model present on a lower time frame.

Market maker models (MMXM) are a framework to analyze price, focusing on identifying key levels and identifying a pattern to make these moves tradable. By scaling into a lower time frame, a trader is able to observe different points of consolidation, manipulation, and key points of market structure to figure out when price will begin its move from IRL to ERL or ERL to IRL.`},
  1806: {id:1806,title:`Market Maker Models`,type:"lesson",duration:"5m",content:`Within each market maker model, price reacts differently to various market patterns, depending on which side of the curve the trader is operating. Reactivity in trading involves analyzing how the market responds to key price levels.

On the buy-side of the curve—where liquidity targets are above the current price level—bullish order blocks (the last down-closed candle before a reversal) and bullish fair value gaps act as support. In a bullish trending market, bearish footprints should be disregarded, for example, a bearish fair value gap should be inverted and treated as a support zone.`},
  1807: {id:1807,title:`Reactivity`,type:"lesson",duration:"5m",content:`Reactivity also involves understanding how the market responds to key structural elements in relation to displacement theory. Analyzing the way the market reacts to previous highs and lows can reveal where the market is likely to head next and when it is most likely to expand.

In a bullish market, you'd expect old highs to be breached energetically without much resistance. Conversely, you'd like to see old lows being manipulated—liquidity swept without significant displacement. The manipulation of previous swing points can signal a reversal or indicate that price is hunting liquidity in the opposite direction.`},
  1808: {id:1808,title:`Displacement vs. Manipulation`,type:"lesson",duration:"5m",content:`To increase the probability of a successful trade, it is important to synchronize multiple timeframes. In other words, multiple timeframes must show expansion in the same direction, aligning with the overall directional bias. As mentioned previously, within each ERL/IRL move, a Market Maker Model (MMXM) is present. Therefore, within a bullish ERL/IRL move, the buy-side of the curve for the MMXM must be aligned for a high-probability trade.

The alignment of timeframes works as follows:

• Monthly ERL/IRL → Daily MMXM

• Weekly ERL/IRL → 4H MMXM

• Daily ERL/IRL → 1H MMXM

• 4H ERL/IRL → 5M MMXM

• 15M ERL/IRL → 1M MMXM`},
  1809: {id:1809,title:`Time Frame Alignment`,type:"lesson",duration:"5m",content:`In order to increase the probability of a successful trade, it’s critical to align multiple time frames with the same directional bias. This ensures that different time frames are expanding in the same direction, confirming the market's overall movement.

As previously mentioned, within each ERL/IRL move, a Market Maker Model (MMXM) is present. So, within a bullish ERL/IRL move, the buy-side of the curve for the MMXM should also be present for a higher-probability trade.

Time frame alignment follows this structure:

• Monthly ERL/IRL → Daily MMXM

• Weekly ERL/IRL → 4H MMXM

• Daily ERL/IRL → 1H MMXM

• H4 ERL/IRL → 5M MMXM

• 15M ERL/IRL → 1M MMXM`},
  2288: {id:2288,title:`Result & Recommendation`,type:"lesson",duration:"5m",content:`[rc_free_quiz_result]`},
  2485: {id:2485,title:`Centralized Exchanges (CEX)`,type:"lesson",duration:"5m",content:`What Are Centralized Exchanges?
Centralized exchanges (CEXs) are platforms managed by a centralized organization or company. They act as intermediaries for transactions, ensuring security, liquidity, and ease of use.

Key Features of Centralized Exchanges:
User-Friendly: CEXs typically offer intuitive interfaces, making them ideal for beginners.
Custodial Services: They hold users’ assets in their wallets, simplifying asset management.
High Liquidity: Due to large trading volumes, CEXs often offer better liquidity than decentralized exchanges.
Wide Range of Services: Offer advanced trading tools, staking, margin trading, and fiat on/off-ramps.
Regulated: Operate under specific jurisdictions and comply with local laws and regulations.

Advantages of Centralized Exchanges:
Ease of Use: Simple registration and trading processes.
Customer Support: Dedicated teams to assist users.
Advanced Features: Tools like stop-loss orders, futures, and leverage trading.

Disadvantages of Centralized Exchanges:
Custodial Risks: Users do not have full control of their funds, making them vulnerable to hacks.
Privacy Concerns: Require Know Your Customer (KYC) verification, compromising anonymity.
Potential Downtime: May experience outages during high market volatility.

Popular Centralized Exchanges:
Binance
Coinbase
Kraken
VALR
KuCoin`},
  2486: {id:2486,title:`Decentralized Exchanges (DEX)`,type:"lesson",duration:"10m",content:`What Are Decentralized Exchanges?
Decentralized exchanges (DEXs) are platforms that operate without a central authority. They use smart contracts to facilitate peer-to-peer transactions directly on the blockchain.

Key Features of Decentralized Exchanges:
Non-Custodial: Users retain full control over their private keys and assets.
Decentralized Operations: No central entity manages the exchange.
Smart Contracts: Automated protocols execute trades securely and transparently.
Anonymity: No KYC requirements, preserving user privacy.
On-Chain Transactions: All activities are recorded on the blockchain.

Advantages of Decentralized Exchanges:
User Control: Full ownership of assets and private keys.
Privacy: No personal information required to trade.
Security: Less prone to hacking as there’s no central wallet to target.
Global Accessibility: Anyone with a cryptocurrency wallet can participate.

Disadvantages of Decentralized Exchanges:
Learning Curve: Requires knowledge of wallets, private keys, and blockchain basics.
Lower Liquidity: May lack the liquidity of centralized exchanges, especially for less popular tokens.
Limited Fiat Support: Rarely support direct fiat-to-crypto transactions.
Slippage and Fees: Price slippage and gas fees on blockchains like Ethereum can make transactions expensive.

Popular Decentralized Exchanges:
Uniswap
SushiSwap
PancakeSwap
PulseX`},
  2487: {id:2487,title:`Introduction to Cryptocurrency Exchanges`,type:"lesson",duration:"5m",content:`A cryptocurrency exchange is a digital marketplace where users can buy, sell, and trade cryptocurrencies. These platforms serve as intermediaries, enabling transactions between buyers and sellers. They play a crucial role in the cryptocurrency ecosystem by providing liquidity and access to a wide range of digital assets.

Key Functions of Cryptocurrency Exchanges:
Trading: Facilitates buying, selling, and exchanging cryptocurrencies.
Price Discovery: Helps determine the market value of cryptocurrencies.
Liquidity: Ensures a smooth flow of trades without significant price fluctuations.
Custody Services: Some exchanges provide wallets to store digital assets.
Fiat-to-Crypto Conversion: Allows users to purchase cryptocurrencies using traditional currencies like USD, EUR, ZAR or GBP.`},
  2488: {id:2488,title:`Additional Information about Cryptocurrency Exchanges`,type:"lesson",duration:"5m",content:`Types of Trading Offered:
1) Spot Trading: Buying and selling cryptocurrencies at current market prices.
2) Margin Trading: Borrowing funds to trade larger positions.
3) Futures and Derivatives: Trading contracts based on the future price of cryptocurrencies.

Exchange Fees:
Exchanges charge various fees, including:
1) Trading Fees: A percentage of each trade.
2) Withdrawal Fees: Charged when withdrawing funds.
3) Deposit Fees: For depositing fiat or cryptocurrency.

Security Measures:
1) Two-Factor Authentication (2FA): Enhances account security.
2) Cold Wallet Storage: Secure storage for funds not in active trading.
3) Insurance Funds: Some exchanges compensate users in case of a hack.

Regulatory Compliance:
Exchanges in certain jurisdictions must comply with regulations like:
1) KYC: Know Your Customer requirements.
2) AML: Anti-Money Laundering measures.
3) Licensing: Obtaining operational licenses from regulatory bodies.

Risks Associated with Exchanges:
1) Hacks: High-profile breaches can result in loss of funds.
2) Scams: Fake or poorly managed exchanges can defraud users.
3) Market Manipulation: Wash trading and pump-and-dump schemes may occur.`},
  2494: {id:2494,title:`MetaMask: What it is and how it works`,type:"lesson",duration:"20m",content:`What Is MetaMask?
MetaMask is a cryptocurrency wallet and gateway to blockchain applications. It allows users to interact with decentralized applications (dApps), manage digital assets, and securely store private keys directly from their web browser or mobile device.

MetaMask is commonly used with decentralized exchanges (DEXs) and dApps, making it an essential tool for navigating the decentralized web.

Key Features of MetaMask:
1) Non-Custodial Wallet: MetaMask gives users complete control over their private keys, meaning they retain full ownership of their funds.
2) Multi-Chain Support: While primarily designed for Ethereum, MetaMask can connect to multiple blockchains, including Binance Smart Chain (BSC), Polygon, and more.
3) Browser Integration: Available as a browser extension for Chrome, Firefox, Brave, and Edge.
4) Mobile App: Offers the same functionality on iOS and Android devices.
5) Interaction with dApps: Seamlessly connects to decentralized applications for trading, lending, gaming, and more.
6) Custom Tokens: Allows users to add and manage ERC-20, ERC-721, and other token types.

How MetaMask Works:
1. Installation and Setup
Browser Extension: Install MetaMask from the Chrome Web Store or other supported browsers.
Mobile App: Download from the Apple App Store or Google Play Store.
Account Creation: Set up an account by creating a wallet, setting a password, and securely storing your 12-word seed phrase, which is essential for wallet recovery.

2. Funding Your Wallet
Buy Crypto: Purchase cryptocurrencies directly through MetaMask using integrated services like Wyre or MoonPay.
Deposit Crypto: Send funds from another wallet or exchange to your MetaMask wallet address.

3. Connecting to a Blockchain Network
MetaMask connects to the Ethereum network by default. To interact with other blockchains (e.g., Binance Smart Chain or Polygon), users need to manually configure the network settings:
Open MetaMask.
Go to Settings > Networks.
Add the custom RPC details for the blockchain.

4. Interacting with dApps
Visit a dApp (e.g., Uniswap, OpenSea, or Aave) in your browser.
Click the Connect Wallet button.
Select MetaMask and approve the connection.

5. Making Transactions
Use MetaMask to:
Swap tokens via integrated services.
Stake tokens on decentralized finance (DeFi) platforms.
Buy NFTs on marketplaces.
Approve and confirm each transaction directly in MetaMask.

Why Use MetaMask?
Accessibility: Easily manage digital assets and interact with dApps.
Decentralization: Operates without a central authority, giving users full control.
Interoperability: Supports multiple blockchains and tokens.
Security: Private keys are encrypted and stored locally on the user’s device.

Best Practices for Using MetaMask:
Secure Your Seed Phrase: Store it offline in a safe place; never share it with anyone.
Enable Two-Factor Authentication: Add an extra layer of security when connecting to exchanges.
Beware of Phishing: Only use official links to download MetaMask or access dApps.
Double-Check Addresses: Verify recipient addresses before sending funds.
Use Hardware Wallets: Pair MetaMask with hardware wallets (like Ledger or Trezor) for enhanced security.`},
  2498: {id:2498,title:`Wallets and Security`,type:"lesson",duration:"5m",content:`Types of Wallets:
1) Hot Wallets: Connected to the internet, such as mobile apps or web wallets. Examples: MetaMask, Trust Wallet.
2) Cold Wallets: Offline storage, such as hardware wallets or paper wallets. Examples: Ledger, Trezor.
3) Hardware Wallets: Physical devices that store private keys offline for enhanced security.
4) Paper Wallets: A printed document containing private keys and wallet addresses.

How Wallets Work:
1) Private Keys: Your access key to funds, which must remain confidential.
2) Public Keys/Addresses: Shared with others to receive cryptocurrency.
3) Seed Phrases: A set of 12-24 words used to back up your wallet.

Best Practices for Security:
1) Keep Your Private Keys Secure: Never share them.
2) Beware of Phishing Scams: Double-check links and emails.
3) Use Two-Factor Authentication (2FA): Adds an extra layer of protection.
4) Regular Updates: Keep wallet software up to date.

Backup and Recovery:
1) Secure Storage: Keep seed phrases offline in a safe place.
2) Testing Recovery: Ensure you can recover your wallet before funding it.`},
  2500: {id:2500,title:`Cryptocurrency Mining and Staking`,type:"lesson",duration:"5m",content:`Mining:
What Is Mining?: A process where miners validate transactions and add them to the blockchain by solving cryptographic puzzles.
Proof-of-Work (PoW): The consensus mechanism used by Bitcoin and Ethereum (before Ethereum 2.0).
Hardware Requirements: ASICs (Application-Specific Integrated Circuits) or GPUs for mining.

Staking:
Proof-of-Stake (PoS): Users validate transactions and secure the network by locking up their cryptocurrency.
Staking Rewards: Earn a percentage of the staked amount as a reward.
Platforms for Staking: Centralized exchanges (e.g., Binance) or DeFi protocols (e.g., Lido).

Differences Between Mining and Staking:
Energy Efficiency: Staking is more eco-friendly.
Ease of Participation: Staking typically requires fewer technical resources.

Mining Pools:
Definition: Groups of miners pool their resources to increase chances of earning rewards.
Example: Antpool, F2Pool.`},
  2502: {id:2502,title:`Decentralized Finance (DeFi)`,type:"lesson",duration:"5m",content:`Overview of DeFi:
Definition: A financial system built on blockchain technology that eliminates intermediaries like banks.
Applications: Lending, borrowing, yield farming, and trading.

Popular DeFi Applications:
Uniswap: A decentralized exchange.
Aave: A lending and borrowing platform.
Compound: A platform for earning interest on cryptocurrency deposits.

Risks of DeFi:
Smart Contract Vulnerabilities: Bugs can lead to loss of funds.
Impermanent Loss: Temporary loss for liquidity providers when token prices fluctuate.
Rug Pulls: Developers withdrawing liquidity and abandoning the project.

How to Get Started in DeFi:
Create a wallet (e.g., MetaMask).
Connect to a DeFi platform.
Start with small amounts to minimize risk.`},
  2503: {id:2503,title:`Non-Fungible Tokens (NTFs)`,type:"lesson",duration:"5m",content:`What Are NFTs?
Unique digital assets stored on the blockchain.
Examples: Art, music, virtual real estate, in-game items.

How NFTs Work:
Token Standards: ERC-721 and ERC-1155 on Ethereum.
Ownership: Proven via blockchain records.

NFT Marketplaces:
OpenSea: A popular platform for buying and selling NFTs.
Rarible: Community-driven marketplace.

Risks and Considerations:
Speculation: Prices can be volatile.
Scams: Ensure authenticity before purchasing.
Environmental Impact: High energy usage on PoW blockchains.`},
  2504: {id:2504,title:`Cryptocurrency Regulations and Legal Considerations`,type:"lesson",duration:"5m",content:`Global Regulations:
1) Vary widely by country: Crypto-friendly nations (e.g., Malta) vs. restrictive nations (e.g., China).

Taxation:
1) Capital Gains Tax: Applied to profits from selling cryptocurrency.
2) Income Tax: Staking and mining rewards are often taxable.

Compliance:
1) Adherence to AML (Anti-Money Laundering) and KYC (Know Your Customer) policies.

Legal Risks:
1) Scams and fraud.
2) Legal repercussions for violating regulations.`},
  2505: {id:2505,title:`Use Case and Real-World Applications`,type:"lesson",duration:"5m",content:`Payments:
1) Faster and cheaper international transactions.
Example: Using Bitcoin, XRP or USDT / USDC for cross-border payments.

Tokenization:
1) Representing real-world assets like real estate or stocks on the blockchain.
Example: Fractional ownership of property.

Supply Chain:
1) Blockchain for product tracking and transparency.
Example: IBM Food Trust.

Gaming:
1) Blockchain-based games with play-to-earn models.
Example: Axie Infinity.

Identity and Governance:
1) Digital Identity: Blockchain-based identity systems.
2) Voting: Transparent and tamper-proof voting systems.`},
  2506: {id:2506,title:`Trading and Investing in Cryptocurrency`,type:"lesson",duration:"5m",content:`Trading Basics:
1) Spot Trading: Buying and selling actual cryptocurrency.
2) Margin Trading: Trading with borrowed funds.
3) Futures Trading: Speculating on the future price of an asset.

Technical Analysis:
Reading charts, candlesticks, and indicators.

Fundamental Analysis:
Evaluating project technology, team, and market potential.

Investment Strategies:
1) HODLing: Long-term holding.
2) Dollar-Cost Averaging (DCA): Regular investments over time.

Risk Management:
1) Setting stop-loss orders.
2) Diversifying portfolios.
3) Managing emotions.

We would recommend our Beginners Trading and Investing Course to master the basics of Trading and Investing. ($499)`},
  2507: {id:2507,title:`Smart Contracts`,type:"lesson",duration:"5m",content:`What Are Smart Contracts?
Automated agreements that execute when predefined conditions are met.

How They Work:
Written in programming languages like Solidity.

Use Cases
1) Financial services (e.g., DeFi protocols).
2) Supply chain automation.

Risks:
Bugs and vulnerabilities.`},
  2508: {id:2508,title:`Layer 2 Solutions`,type:"lesson",duration:"5m",content:`Scaling Challenges:
1) Blockchain scalability issues due to congestion and high fees.

Examples of Layer 2 Solutions:
1) Lightning Network: Bitcoin’s Layer 2.
2) Optimism and Arbitrum: Ethereum’s Layer 2 solutions.

Benefits:
1) Faster transactions.
2) Lower fees.`},
  2509: {id:2509,title:`Governance and DAOs (Decentralized Autonomous Organizations)`,type:"lesson",duration:"5m",content:`What Are DAOs?
Organizations managed by smart contracts and token-based voting.

Examples of DAOs:
MakerDAO, Uniswap governance.

Pros and Cons:
Pros: Decentralized decision-making.
Cons: Coordination challenges.`},
  2510: {id:2510,title:`Risks and Challenges in Cryptocurrency`,type:"lesson",duration:"5m",content:`Market Volatility:
Rapid price fluctuations.

Scams and Fraud:
Common schemes include Ponzi schemes and phishing attempts.

Environmental Concerns:
High energy consumption of PoW blockchains.

Regulatory Risks:
Impact of changing laws and regulations.`},
  2511: {id:2511,title:`Future Trends in Cryptocurrency`,type:"lesson",duration:"5m",content:`Web3:
Decentralized internet powered by blockchain.

Interoperability:
Projects like Polkadot and Cosmos enabling communication between blockchains.

The Metaverse:
Integration of blockchain in virtual worlds.

CBDCs:
Central Bank Digital Currencies being developed globally.`},
  2512: {id:2512,title:`How to get started in Cryptocurrency Safely`,type:"lesson",duration:"5m",content:`Choosing an Exchange:
Factors: Security, fees, reputation, user interface.

Starting Small:
Begin with small investments to reduce risk.

Crypto Communities:
Subscribe to our Fortitude Premium Membership to continuously stay up top date with what is going on in the cryptocurrency markets ($49 P/M)

Continuous Learning:
Stay updated on trends and developments in the cryptocurrency space.`},
  2635: {id:2635,title:`INTRODUCTION: WHY MOST TRADERS FAIL AT THIS STAGE`,type:"lesson",duration:"5m",content:``},
  2636: {id:2636,title:`INTRODUCTION: WHY MOST TRADERS FAIL AT THIS STAGE`,type:"lesson",duration:"5m",content:`INTRODUCTION: WHY MOST TRADERS FAIL AT THIS STAGE

By Day 4, most traders who quit have already accumulated enough knowledge to be dangerous. They understand market structure, liquidity, order blocks, and even manipulation — yet they still lose money consistently.

This failure does not come from poor analysis.

It comes from poor execution and poor risk management.

Retail traders believe:

“If my analysis is right, I should make money.”

Professional traders understand:

“If my execution and risk are controlled, the outcome of any single trade is irrelevant.”

Day 4 exists to bridge that gap.

This module transforms you from someone who can read markets into someone who can execute trades professionally, repeatedly, and sustainably.`},
  2637: {id:2637,title:`1. ANALYSIS VS EXECUTION – THE MOST IMPORTANT DISTINCTION`,type:"lesson",duration:"5m",content:``},
  2638: {id:2638,title:`2. RISK MANAGEMENT – THINKING LIKE A TRADING BUSINESS`,type:"lesson",duration:"5m",content:``},
  2639: {id:2639,title:`2. RISK MANAGEMENT – THINKING LIKE A TRADING BUSINESS`,type:"lesson",duration:"5m",content:``},
  2640: {id:2640,title:`3. POSITION SIZING – FROM FIRST PRINCIPLES`,type:"lesson",duration:"5m",content:``},
  2641: {id:2641,title:`4. STRUCTURAL STOP-LOSS PLACEMENT (NOT “SAFE STOPS”)`,type:"lesson",duration:"5m",content:``},
  2642: {id:2642,title:`5. TARGETING – WHERE PROFITS COME FROM`,type:"lesson",duration:"5m",content:``},
  2643: {id:2643,title:`6. R-MULTIPLES & EXPECTANCY – WHY WIN RATE IS IRRELEVANT`,type:"lesson",duration:"5m",content:``},
  2644: {id:2644,title:`7. FMF EXECUTION MODELS`,type:"lesson",duration:"5m",content:``},
  2645: {id:2645,title:`8. TRADE MANAGEMENT – WHAT NEVER CHANGES`,type:"lesson",duration:"5m",content:``},
  2646: {id:2646,title:`9. THE PSYCHOLOGY OF EXECUTION`,type:"lesson",duration:"5m",content:``},
  2647: {id:2647,title:`10. JOURNALING – YOUR FEEDBACK LOOP`,type:"lesson",duration:"5m",content:``},
  2648: {id:2648,title:`DAY 4 OUTCOME – WHAT YOU CAN NOW DO`,type:"exercise",duration:"5m",content:``},
  2652: {id:2652,title:`What This Workshop Is and Is Not`,type:"lesson",duration:"5m",content:``},
  2653: {id:2653,title:`What This Workshop Is and Is Not`,type:"lesson",duration:"5m",content:`The Fortitude Market Framework (FMF) Master Workshop is not a strategy, a signal service, or a shortcut to fast profits.
It is a professional framework for understanding, executing, and managing risk in financial markets using institutional logic rather than retail speculation.

FMF is designed to:
Build deep market understanding
Create execution consistency
Develop long-term trader competence
Remove emotional decision-making
Produce durability, not hype

FMF does not promise:
High win rates
Daily trades
Constant excitement
Guaranteed profits

It promises structure, clarity, and control.`},
  2654: {id:2654,title:`Why Most Traders Fail`,type:"lesson",duration:"5m",content:``},
  2655: {id:2655,title:`Why Most Traders Fail`,type:"lesson",duration:"5m",content:`Most traders fail because they:
Chase tools instead of understanding behavior
Confuse indicators with insight
Trade outcomes instead of probabilities
Lack a defined process
Abandon rules under pressure

FMF solves this by:
Explaining why price moves
Defining where trades make sense
Controlling how risk is applied
Standardizing execution behavior`},
  2656: {id:2656,title:`How to Use This Master Workshop`,type:"lesson",duration:"5m",content:`This workshop should be studied sequentially.

Do not skip ahead.
Do not rush.
Do not trade live until structure, liquidity, and execution are understood.

Fortitude Market Framework is cumulative. Each section depends on the previous one.`},
  2660: {id:2660,title:`1. What Trading Really Is`,type:"lesson",duration:"5m",content:`Trading is not prediction. Trading is not gambling. Trading is not about being right. At its core, trading is a structured decision-making process under conditions of uncertainty.

Every trade represents a transfer of risk between market participants.
When you place a trade, you are entering a competitive environment where capital flows from undisciplined participants to disciplined ones over time.

Professional traders do not seek certainty. They seek consistency. Consistency is achieved by executing a
defined process repeatedly over a large sample size. Losses are not failures; they are operational costs of
doing business.`},
  2662: {id:2662,title:`2. Market Participants`,type:"lesson",duration:"5m",content:`Markets are driven by different classes of participants, each with distinct objectives.

Retail traders typically trade small accounts and rely on indicators, patterns, and signals. They often react emotionally to price movements and news events.

Institutional participants such as banks, hedge funds, and asset managers operate with large capital bases and require liquidity to execute positions.

Institutions cannot enter or exit positions instantly without moving price. As a result, they must engineer
scenarios where liquidity becomes available.

This is achieved by pushing price toward areas where retail
traders are likely to place stop-loss orders or breakout entries.`},
  2664: {id:2664,title:`3. Why Price Moves`,type:"lesson",duration:"5m",content:`Price does not move randomly. While short-term fluctuations may appear chaotic, the underlying driver of all sustained price movement is liquidity.

Liquidity represents the availability of buy and sell orders at specific price levels. Markets move toward liquidity because large participants require opposing orders to fill their positions.

Common liquidity pools include equal highs, equal lows, prior session highs and lows, obvious support and
resistance levels, and technical breakout points.

These areas attract predictable behavior from inexperienced traders, making them ideal targets for institutional activity.`},
  2666: {id:2666,title:`4. The Indicator Illusion`,type:"lesson",duration:"5m",content:`Indicators are mathematical transformations of price data. They do not lead price; they follow it.

While indicators may appear to work temporarily, they fail during regime changes. If a simple indicator-based strategy provided a durable edge, it would be arbitraged out of existence by institutional capital.

The Fortitude Market Framework focuses on raw price behavior, structure, and liquidity dynamics rather than lagging tools.

This approach aligns your analysis with how professional money actually operates.`},
  2668: {id:2668,title:`5. Understanding the Chart`,type:"lesson",duration:"5m",content:`A price chart is a historical record of executed transactions. Each candlestick represents the outcome of a battle between buyers and sellers over a specific time period.

Strong directional candles indicate aggressive participation, while small or overlapping candles indicate indecision or balance.`},
  2670: {id:2670,title:`6. Trends, Ranges, and Control`,type:"lesson",duration:"5m",content:`Trends represent sustained control by one side of the market.

Higher highs and higher lows indicate buyer dominance, while lower highs and lower lows indicate seller dominance.

Ranges represent equilibrium, where neither side has clear control.

Most retail losses occur inside ranges due to overtrading and false breakouts.`},
  2672: {id:2672,title:`7. The Required Mental Shift`,type:"lesson",duration:"5m",content:`To succeed in trading, you must abandon the desire for constant action.

Professional traders spend most of their time waiting.

Your objective is not to trade frequently, but to trade selectively when conditions align with your framework.`},
  2674: {id:2674,title:`Day 1 Exercises`,type:"exercise",duration:"5m",content:`Exercise 1: Open a price chart and identify one clear trend, one clear range, and the most obvious high and low. Write down who you believe is in control and where retail traders are likely positioned.

Exercise 2: Write down three beliefs you previously held about trading. Challenge each belief based on what
you have learned today.

Day 1 is about truth, not tactics. Until you understand what moves markets and why most traders fail, no
strategy will save you.

Day 2 will build on this foundation by teaching you how to read market structure and
develop a directional narrative.`},
  2676: {id:2676,title:`Day 2 - Market Structure, Narrative & Bias Overview`,type:"lesson",duration:"5m",content:`Day 2 builds directly on the foundations established in Day 1.

If Day 1 taught you what moves markets, Day 2 teaches you how to read who is in control.

Market structure is the language institutions use to communicate intent.

Without understanding structure, traders react emotionally to price instead of interpreting it logically.`},
  2677: {id:2677,title:`1. What Market Structure Really Means`,type:"lesson",duration:"5m",content:``},
  2678: {id:2678,title:`1. What Market Structure Really Means`,type:"lesson",duration:"5m",content:`Market structure refers to the sequence of price movements that reveal control between buyers and sellers.

Structure is not about drawing arbitrary lines on a chart. It is about understanding whether the market is expanding, contracting, or transitioning. Professional traders use structure to determine context, not entries.

Structure answers three critical questions: Who is in control? Where is price relative to prior decision points?
And is the current move likely continuation or reversal?`},
  2679: {id:2679,title:`2. Swing Points and Valid Highs & Lows`,type:"lesson",duration:"5m",content:``},
  2680: {id:2680,title:`2. Swing Points and Valid Highs & Lows`,type:"lesson",duration:"5m",content:`Not every high or low on a chart is meaningful.

Valid swing points are areas where price made a decisive move away, indicating strong participation.

Weak highs and lows are often formed during low liquidity periods or corrective moves.

Professional traders focus on highs and lows that caused displacement.

Displacement is a strong, impulsive move that breaks prior structure. These areas become key reference points for future analysis.`},
  2681: {id:2681,title:`3. Internal vs External Structure`,type:"lesson",duration:"5m",content:`External structure represents the broader market direction on higher timeframes.

It defines the dominant trend or range. Internal structure exists within that external framework and represents short-term fluctuations.

Many traders fail by trading against external structure using internal signals.

The Fortitude Market Framework requires alignment: external structure provides bias, internal structure provides timing.`},
  2682: {id:2682,title:`4. Break of Structure vs Liquidity Grab`,type:"lesson",duration:"5m",content:`A break of structure occurs when price violates a prior high or low with conviction, suggesting a potential shift in control. However, not all breaks are genuine.

Liquidity grabs are false breaks designed to trigger stop-losses and breakout entries.

The difference lies in follow-through. True breaks show displacement and continuation.

Liquidity grabs show rejection and rapid reversal. Context from higher timeframes is essential to distinguish between the two.`},
  2683: {id:2683,title:`5. Timeframe Alignment`,type:"lesson",duration:"5m",content:`Markets are fractal, meaning structure exists on all timeframes.
However, not all timeframes carry equal weight.
Higher timeframes dictate direction, while lower timeframes refine execution.

A common mistake is analyzing too many timeframes.

The Fortitude approach uses a simplified hierarchy:
higher timeframe for narrative, execution timeframe for entries.
This reduces confusion and emotional decision-making.`},
  2684: {id:2684,title:`6. Building a Market Narrative`,type:"lesson",duration:"5m",content:`A market narrative is a logical explanation of what price is likely attempting to do.

It incorporates structure, liquidity, and time of day.
Narrative replaces prediction with reasoning.

A strong narrative answers: Where did price come from? Where is liquidity resting? And what would make
sense for price to do next? If you cannot articulate your narrative clearly, you should not be trading.`},
  2685: {id:2685,title:`7. Session-Based Structure`,type:"lesson",duration:"5m",content:`Different trading sessions exhibit different behaviors.

London and New York sessions provide the highest liquidity.

Many structural breaks occur during these sessions as institutional participation increases.

Understanding session behavior allows traders to anticipate when manipulation or expansion is likely.

This timing component is critical for precision and patience.`},
  2686: {id:2686,title:`Day 2 Exercises`,type:"exercise",duration:"5m",content:`Exercise 1: Identify external structure on a higher timeframe and internal structure on a lower timeframe. Write down which side is in control and why.

Exercise 2: Build a narrative for the next trading session. Include structure, liquidity targets, and invalidation
points.

Market structure is not about perfection. It is about probabilities and context.

Day 3 will expand on this foundation by exposing how liquidity and manipulation interact with structure to create high-probability opportunities.`},
  2698: {id:2698,title:`Day 3 - Liquidity, Manipulation, Precision & The AMD Model Overview`,type:"lesson",duration:"5m",content:`Day 3 exposes the mechanics that cause most retail traders to lose money repeatedly.

Once you understand liquidity and manipulation, market behavior stops feeling unfair or random.

This chapter explains why price often moves against you first — and how professionals exploit predictable human behavior to execute large positions.`},
  2699: {id:2699,title:`1. Liquidity: The Fuel of All Market Movement`,type:"lesson",duration:"5m",content:`Liquidity refers to the availability of buy and sell orders at specific price levels.

Large market participants require liquidity to enter and exit positions without excessive slippage.

Because retail traders place orders in predictable locations, liquidity naturally clusters around obvious highs, lows, breakout levels, and technical structures.

Markets are drawn to liquidity in the same way heat moves toward cold. Price seeks areas where opposing
orders exist.

Understanding where liquidity is resting allows traders to anticipate where price is most likely to travel next.`},
  2700: {id:2700,title:`1. Liquidity: The Fuel of All Market Movement`,type:"lesson",duration:"5m",content:``},
  2701: {id:2701,title:`2. Types of Liquidity Pools`,type:"lesson",duration:"5m",content:`Buy-side liquidity exists above highs where traders place stop-losses on short positions or breakout buy orders.

Sell-side liquidity exists below lows where long traders place protective stops.

Additional liquidity pools form around equal highs and lows, trendline breaks, and prior session highs and lows.

Retail traders are taught to trade these areas as signals.

Institutions view them as targets. This difference in perspective explains why breakout traders are frequently trapped.`},
  2702: {id:2702,title:`3. Manipulation: Engineering Liquidity`,type:"lesson",duration:"5m",content:`Manipulation is not illegal or malicious — it is a functional necessity.

Institutions must move price into liquidity pools to fill orders.

This process often creates sharp, emotional moves that trigger retail stop-losses and induce poor decision-making.

Manipulation typically occurs during high-liquidity sessions and is designed to appear convincing.

The goal is to force traders into the wrong side of the market before the true move begins.`},
  2703: {id:2703,title:`4. The AMD Model Explained`,type:"lesson",duration:"5m",content:`The Accumulation, Manipulation, Distribution (AMD) model provides a framework for understanding institutional order flow.

Accumulation represents a period of consolidation where positions are built quietly.

Manipulation is the false move designed to access liquidity.

Distribution is the true directional expansion.

AMD is not a rigid pattern but a behavioral model.

Recognizing these phases allows traders to align with distribution instead of becoming liquidity for it.`},
  2704: {id:2704,title:`5. Premium and Discount Zones`,type:"lesson",duration:"5m",content:`Professional traders seek favorable pricing.

Buying at a discount and selling at a premium increases probability and improves risk-reward.

Premium and discount zones are derived from recent price ranges and key structural points.

Retail traders often buy after expansion and sell after panic.

The Fortitude framework teaches patience and positioning before the move, not after it.`},
  2705: {id:2705,title:`6. Why Entries Feel Unfair`,type:"lesson",duration:"5m",content:`Many traders experience being stopped out just before price moves in their favor.

This is not bad luck. It is the result of placing stops in predictable locations.

Once you understand liquidity mechanics, these experiences become logical.`},
  2706: {id:2706,title:`Day 3 Exercises`,type:"exercise",duration:"5m",content:`Exercise 1: Identify buy-side and sell-side liquidity on a chart. Mark equal highs, equal lows, and session highs and lows.

Exercise 2: Identify an AMD sequence on historical price action. Label accumulation, manipulation, and
distribution phases.

Liquidity and manipulation are the bridge between structure and execution.

Day 4 will translate this understanding into precise, rule-based trade entries and professional risk management.`},
  2715: {id:2715,title:`Introduction: Why This Is The Most Important Day`,type:"lesson",duration:"5m",content:`If trading success were purely technical, most traders would already be profitable.

By Day 5, you as the student:
Understands how markets move
Can identify structure and liquidity
Knows how to execute and manage risk

Yet statistically, most will still fail.

Why?

Because the final barrier to profitability is not market knowledge.
It is self-management over time.

Day 5 is about transforming FMF from a system you understand into a process you can trust, follow, and repeat under pressure.

This is the day traders stop asking:
“Why didn’t this work?”

And start asking:
“Did I execute my process flawlessly?”`},
  2717: {id:2717,title:`1. The Real Psychology Problem (And Why Most Traders Misdiagnose It)`,type:"lesson",duration:"5m",content:`Most traders believe their problem is:
Fear
Greed
Lack of confidence

Those are symptoms, not causes.

The real psychological problems are:
Lack of trust in a defined process
Outcome dependency
Inconsistent rule application
Over-identification with individual trades

Psychology breaks down when process is unclear.

FMF fixes psychology by:
Removing discretion
Defining rules
Shifting focus from outcomes to execution quality`},
  2718: {id:2718,title:`2. Outcome Independence - The Core of Consistency`,type:"exercise",duration:"5m",content:`Retail traders emotionally attach to:
Winning trades (ego)
Losing trades (self-doubt)

Professional traders emotionally attach to:
Process adherence

In FMF:
A winning trade executed poorly is a failure
A losing trade executed perfectly is a success

This reframing is essential.

You are not paid for being right today.
You are paid for executing correctly across hundreds of trades.`},
  2719: {id:2719,title:`3. Consistency is Not Discipline - It is System Design`,type:"lesson",duration:"5m",content:`Most traders try to “be more disciplined”.

That fails.

FMF does not rely on willpower.

Instead, it:
Reduces decision points
Removes improvisation
Standardizes behavior

Consistency emerges automatically when:
Risk is fixed
Entries are predefined
Management rules are locked
Journaling is mandatory

You don’t “try” to be consistent.
You build a system that makes inconsistency difficult.`},
  2720: {id:2720,title:`4. Draw Downs, Losing Streaks & Emotional Stability`,type:"lesson",duration:"5m",content:`Every profitable trader experiences drawdowns.

FMF prepares you for them in advance.

Key truths:
Losing streaks are statistically inevitable
Drawdowns do not mean the system is broken
Changing rules mid-drawdown destroys expectancy

FMF rules during drawdowns:
Risk is never increased
Rules are never loosened
Sample size is respected

If execution quality remains high, nothing changes.`},
  2721: {id:2721,title:`5. The FMF Identity Shift (This is Where Most Fail)`,type:"lesson",duration:"5m",content:`Most retail traders identify as:
“Someone trying to make money trading”

FMF reframes identity to:
“An operator executing a probabilistic business model”

This shift removes:
Overtrading
Emotional urgency
The need to be active

Professional traders are comfortable doing nothing most days.

Mastery is not activity.
Mastery is selectivity.`},
  2722: {id:2722,title:`6. Boredom, Patience & Waiting for Real Setups`,type:"lesson",duration:"5m",content:`One of the most dangerous emotions in trading is boredom.

Boredom leads to:
Low-quality trades
Overtrading
Rule bending

FMF teaches that:
No trade is a valid decision
Waiting is part of the job
Most time is spent doing nothing

If you are constantly trading, you are doing it wrong.`},
  2723: {id:2723,title:`7. Daily, Weekly & Monthly FMF Routines`,type:"lesson",duration:"5m",content:`Daily:
Bias defined
High-impact news noted
Session plan written
No impulsive trades

Weekly:
Trade review
Execution error analysis
R-multiple tracking

Monthly:
Expectancy review
Drawdown assessment
Model refinement (never emotional changes)

Routine creates stability.
Stability creates confidence.`},
  2724: {id:2724,title:`8. The FMF Mastery Loop`,type:"lesson",duration:"5m",content:`FMF operates in a continuous loop:
Execute (without emotion)
Record (without judgment)
Review (with honesty)
Refine (with restraint)

This loop replaces:
Random improvement
Strategy hopping
Emotional resets

Mastery is iterative, not explosive.`},
  2725: {id:2725,title:`9. Knowing When NOT to Trade`,type:"lesson",duration:"5m",content:`One of the highest-level skills in FMF is trade avoidance.

You do not trade when:
Narrative is unclear
Liquidity is mid-range
Structure is choppy
Emotional state is compromised

Protecting capital is a skill, not cowardice.`},
  2726: {id:2726,title:`10. What Mastery Actually Looks Like`,type:"lesson",duration:"5m",content:`Mastery is not:
Big wins
Social media validation
High win rates

Mastery is:
Emotional neutrality
Small controlled losses
Boring consistency
Trust in process
Longevity

A mastered trader is predictable in behavior, not outcomes.`},
  2727: {id:2727,title:`Day 5 Outcome - The Final Transformation`,type:"exercise",duration:"5m",content:`By the end of Day 5, you as the student:
Trusts their FMF model
Executes without emotional interference
Accepts losses professionally
Measures success by process, not money
Operates like a trader, not a gambler

This is not the end of learning.

This is the beginning of professional trading.`},
  2728: {id:2728,title:`The Fortitude Standard`,type:"lesson",duration:"5m",content:`FMF does not promise:
Fast money
Easy trades
Constant wins

It delivers:
Structure
Control
Longevity
Professional competence

That is the difference.`},
  2742: {id:2742,title:`2. Market Participants`,type:"lesson",duration:"5m",content:`Markets are driven by different classes of participants, each with distinct objectives.

Retail traders typically trade small accounts and rely on indicators, patterns, and signals.

They often react emotionally to price movements and news events. Institutional participants such as banks, hedge funds, and asset managers operate with large capital bases and require liquidity to execute positions.

Institutions cannot enter or exit positions instantly without moving price. As a result, they must engineer
scenarios where liquidity becomes available.

This is achieved by pushing price toward areas where retail traders are likely to place stop-loss orders or breakout entries.`},
  2743: {id:2743,title:`3. Why Price Moves`,type:"lesson",duration:"5m",content:`Price does not move randomly.

While short-term fluctuations may appear chaotic, the underlying driver of all sustained price movement is liquidity.

Liquidity represents the availability of buy and sell orders at specific price levels.

Markets move toward liquidity because large participants require opposing orders to fill their positions.

Common liquidity pools include equal highs, equal lows, prior session highs and lows, obvious support and
resistance levels, and technical breakout points.

These areas attract predictable behavior from inexperienced traders, making them ideal targets for institutional activity.`},
  2744: {id:2744,title:`4. The Indicator Illusion`,type:"lesson",duration:"5m",content:`Indicators are mathematical transformations of price data.

They do not lead price; they follow it.

While indicators may appear to work temporarily, they fail during regime changes.

If a simple indicator-based strategy provided a durable edge, it would be arbitraged out of existence by institutional capital.

The Fortitude Market Framework focuses on raw price behavior, structure, and liquidity dynamics rather than lagging tools.

This approach aligns your analysis with how professional money actually operates.`},
  2745: {id:2745,title:`5. Understanding the Chart`,type:"lesson",duration:"5m",content:`A price chart is a historical record of executed transactions.

Each candlestick represents the outcome of a battle between buyers and sellers over a specific time period.

Strong directional candles indicate aggressive participation, while small or overlapping candles indicate indecision or balance.`},
  2746: {id:2746,title:`6. Trends, Ranges, and Control`,type:"lesson",duration:"5m",content:`Trends represent sustained control by one side of the market.

Higher highs and higher lows indicate buyer dominance, while lower highs and lower lows indicate seller dominance.

Ranges represent equilibrium, where neither side has clear control.

Most retail losses occur inside ranges due to overtrading and false breakouts.`},
  2748: {id:2748,title:`7. The Required Mental Shift`,type:"lesson",duration:"5m",content:`To succeed in trading, you must abandon the desire for constant action.

Professional traders spend most of their time waiting.

Your objective is not to trade frequently, but to trade selectively when conditions align with your framework.`},
  2749: {id:2749,title:`Day 1 Exercises`,type:"exercise",duration:"5m",content:`Exercise 1: Open a price chart and identify one clear trend, one clear range, and the most obvious high and low. Write down who you believe is in control and where retail traders are likely positioned.

Exercise 2: Write down three beliefs you previously held about trading. Challenge each belief based on what
you have learned today.

Day 1 is about truth, not tactics. Until you understand what moves markets and why most traders fail, no
strategy will save you.

Day 2 will build on this foundation by teaching you how to read market structure and
develop a directional narrative.`},
  2750: {id:2750,title:`Day 1 - Market Foundations, The Reality of Trading & How Price Actually Moves Overview`,type:"lesson",duration:"5m",content:`This workbook is designed to fundamentally rewire how you understand financial markets.

Day 1 lays the foundation for everything that follows. Without this understanding, no strategy, model, or indicator will ever work consistently.

This is not surface-level education. This is professional-grade market literacy.`},
};

const COURSE_DATA = [
  {
    id:"intro",title:`Introduction to Trading & Investing`,subtitle:`Free — No subscription required`,
    tier:"free",badge:"FREE",color:"#29a8ff",
    duration:"3h 20m",totalLessons:14,
    description:`The essential foundation every market participant needs. Understand how stocks work, how money is made, and the realities of risk before committing a single dollar.`,
    outcomes:["Understand how stocks and financial markets work", "Distinguish investing from trading", "Apply basic risk management principles", "Read price action with a structured lens"],
    sections:[
    {title:`Understanding Stocks`,lessonIds:[1077, 1078, 1079, 1081, 1082]},
    {title:`Investment Strategy & Analysis`,lessonIds:[1083, 1084, 1085, 1086, 1087]},
    {title:`Risk, Leverage & Conclusion`,lessonIds:[1088, 1089, 1090, 1268]}
    ]
  },
  {
    id:"beginners",title:`Beginners Trading & Investing Course`,subtitle:`Core — $45/mo`,
    tier:"45",badge:"CORE",color:"#29a8ff",
    duration:"8h 45m",totalLessons:37,
    description:`A complete beginner-to-competent curriculum. Forex fundamentals, market structure, technical analysis, risk management, and execution — all in one structured programme.`,
    outcomes:["Understand forex market mechanics", "Master candlesticks, trendlines, Fibonacci & structure", "Build rule-based risk management", "Execute structured trades with defined invalidation"],
    sections:[
    {title:`Forex Foundations`,lessonIds:[1551, 1552, 1553, 1554, 1556]},
    {title:`Chart Types & Timeframes`,lessonIds:[1557, 1558, 1559, 1560, 1561]},
    {title:`Platform & Risk Management`,lessonIds:[1562, 1563, 1564, 1565, 1566]},
    {title:`Technical Analysis`,lessonIds:[1567, 1568, 1569, 1570, 1571, 1572]},
    {title:`Fibonacci & Candlestick Patterns`,lessonIds:[1573, 1574, 1575, 1576, 1577, 1578]},
    {title:`Entry Edges & Advanced Bias`,lessonIds:[1707, 1708, 1709, 1803, 1804, 1805, 1806, 1807, 1808, 1809]}
    ]
  },
  {
    id:"crypto",title:`Cryptocurrency Course`,subtitle:`Core — $45/mo`,
    tier:"45",badge:"CORE",color:"#29a8ff",
    duration:"5h 30m",totalLessons:42,
    description:`From blockchain basics to advanced DeFi, exchanges, and structural analysis applied to digital assets. The complete crypto education.`,
    outcomes:["Understand the crypto ecosystem and blockchain", "Navigate exchanges, wallets and DeFi safely", "Apply FMF structural analysis to crypto markets", "Identify high-probability setups in digital assets"],
    sections:[
    {title:`Crypto Ecosystem Foundations`,lessonIds:[1269, 1274, 1284, 1286, 1287, 1288]},
    {title:`Blockchain Technology`,lessonIds:[1289, 1290, 1292, 1293, 1295, 1296, 1297, 1298]},
    {title:`Crypto Basics & Getting Started`,lessonIds:[1519, 1520, 1521, 1522, 1523, 1524, 1525, 1526]},
    {title:`Advanced Concepts`,lessonIds:[1527, 1528, 2485, 2486, 2487, 2488]},
    {title:`Wallets, DeFi & Web3`,lessonIds:[2494, 2498, 2500, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512]}
    ]
  },
  {
    id:"advanced",title:`Advanced Trading & Investing Course`,subtitle:`Professional — $65/mo`,
    tier:"65",badge:"PRO",color:"#d0d8e8",
    duration:"6h 15m",totalLessons:19,
    description:`The full institutional methodology. Advanced market structure, liquidity engineering, order blocks, and the complete FMF framework applied at a professional level.`,
    outcomes:["Master advanced market structure & BOS theory", "Understand institutional liquidity engineering", "Apply order blocks, breaker blocks & AMD model", "Trade with full multi-timeframe confluence"],
    sections:[
    {title:`Advanced Market Structure`,lessonIds:[1324, 1327, 1328, 1329, 1330]},
    {title:`Liquidity & Order Flow`,lessonIds:[1331, 1336, 1337, 1338, 1339, 1340]},
    {title:`ICT Daily Bias Framework`,lessonIds:[1803, 1804, 1805, 1806, 1807, 1808, 1809, 2288]}
    ]
  },
  {
    id:"workshop",title:`5-Day Professional Trading Workshop`,subtitle:`Add-on Programme`,
    tier:"addon",badge:"WORKSHOP",color:"#e91ea7",
    duration:"8h 00m",totalLessons:43,
    description:`Zero to market fluency in 5 days. The complete FMF methodology condensed into an intensive professional sprint. We don't teach indicators. We teach market intent.`,
    outcomes:["Market foundations from scratch in one sprint", "Master structure, liquidity & the AMD model", "Build a live executable trade model", "Develop professional-grade mental discipline"],
    sections:[
    {title:`Introduction & Framework`,lessonIds:[2653, 2655, 2656]},
    {title:`Day 1 — Market Foundations & The Reality of Trading`,lessonIds:[2750, 2660, 2662, 2664, 2666, 2668, 2670, 2672, 2674]},
    {title:`Day 2 — Market Structure, Narrative & Bias`,lessonIds:[2676, 2678, 2680, 2681, 2682, 2683, 2684, 2685, 2686]},
    {title:`Day 3 — Liquidity, Manipulation & the AMD Model`,lessonIds:[2698, 2699, 2701, 2702, 2703, 2704, 2705, 2706]},
    {title:`Day 4 — Execution, Risk & Model Integration`,lessonIds:[2636]},
    {title:`Day 5 — Psychology, Consistency & Mastery`,lessonIds:[2715, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728]}
    ]
  },
];

const getCourseProgress = (course, completedIds) => {
  const all = course.sections.flatMap(s => s.lessonIds);
  const done = all.filter(id => completedIds.has(id)).length;
  return { done, total: all.length, pct: all.length ? Math.round((done / all.length) * 100) : 0 };
};

// ── Render lesson content (text with basic formatting) ──────────────────
const LessonContent = ({ text }) => {
  if (!text) return <p style={{ color: C.textMuted, fontStyle: "italic" }}>Lesson content not available.</p>;

  // Split into blocks and render each
  const blocks = [];
  let bulletGroup = [];

  const flushBullets = () => {
    if (bulletGroup.length > 0) {
      blocks.push({ type: 'bullets', items: [...bulletGroup] });
      bulletGroup = [];
    }
  };

  text.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) { flushBullets(); blocks.push({ type: 'spacer' }); return; }

    // ## Heading
    if (trimmed.startsWith('## ')) {
      flushBullets();
      blocks.push({ type: 'heading', text: trimmed.slice(3).trim() });
      return;
    }
    // Bullet
    if (trimmed.startsWith('• ')) {
      bulletGroup.push(trimmed.slice(2).trim());
      return;
    }
    // Numbered item  e.g. "1:" or "1."
    if (/^\d+[.:]\s/.test(trimmed)) {
      flushBullets();
      blocks.push({ type: 'numbered', text: trimmed });
      return;
    }
    // All-caps short line = section heading
    if (trimmed.length < 90 && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed) && !trimmed.startsWith('•')) {
      flushBullets();
      blocks.push({ type: 'heading', text: trimmed });
      return;
    }
    flushBullets();
    blocks.push({ type: 'text', text: trimmed });
  });
  flushBullets();

  // Merge consecutive text blocks into paragraphs
  const merged = [];
  let textAcc = [];
  const flushText = () => { if (textAcc.length) { merged.push({ type: 'para', lines: [...textAcc] }); textAcc = []; } };
  blocks.forEach(b => {
    if (b.type === 'text') { textAcc.push(b.text); return; }
    if (b.type === 'spacer') { flushText(); return; }
    flushText();
    merged.push(b);
  });
  flushText();

  return (
    <div style={{ color: C.textMuted, lineHeight: 1.85, fontSize: 13 }}>
      {merged.map((b, i) => {
        if (b.type === 'heading') return (
          <div key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: C.accent, textTransform: 'uppercase', marginTop: i > 0 ? 20 : 0, marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${C.accentDim}` }}>{b.text}</div>
        );
        if (b.type === 'para') return (
          <p key={i} style={{ marginBottom: 14 }}>{b.lines.join(' ')}</p>
        );
        if (b.type === 'bullets') return (
          <ul key={i} style={{ marginBottom: 14, paddingLeft: 0, listStyle: 'none' }}>
            {b.items.map((item, j) => (
              <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, flexShrink: 0, marginTop: 8 }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        if (b.type === 'numbered') return (
          <div key={i} style={{ marginBottom: 10, padding: '8px 12px', background: 'rgba(41,168,255,.04)', borderLeft: `2px solid ${C.accentDim}`, borderRadius: '0 4px 4px 0', fontSize: 13, color: C.text }}>{b.text}</div>
        );
        return null;
      })}
    </div>
  );
};

// ── AI Tutor ────────────────────────────────────────────────────────────
const CourseTutor = ({ lesson, course, lessonDb }) => {
  const lessonData = lessonDb[lesson.id] || {};
  const [msgs, setMsgs] = useState([{
    role: "assistant",
    text: `I'm your AI tutor for **${lessonData.title || lesson.title}**.\n\nAsk me to explain any concept from this lesson, give you real market examples, test your understanding, or connect it to what comes next.`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const lessonContent = lessonData.content ? lessonData.content.slice(0, 2000) : '';
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an expert trading educator for the Fortitude platform — an institutional-grade trading education platform built on the Fortitude Market Framework (FMF).

You are helping a student studying: "${lessonData.title || lesson.title}" in the course "${course.title}".

The lesson content is:
---
${lessonContent}
---

Your role: world-class trading tutor. Be precise, intellectually honest, and practically grounded. Use real market examples. Reinforce correct thinking. Challenge assumptions constructively. Keep responses focused — this is a conversational interface, not an essay. Use markdown **bold** for key terms. Never give financial advice or specific trade recommendations.`,
          messages: [
            ...msgs.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
            { role: "user", content: q }
          ]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "I couldn't generate a response. Please try again.";
      setMsgs(m => [...m, { role: "assistant", text }]);
    } catch (e) {
      setMsgs(m => [...m, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const PROMPTS = ["Give me a real example", "Test my understanding", "Most common mistake?", "Connect to next lesson"];

  const renderMsg = (text) => text.split('\n').map((line, j, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return <span key={j}>{parts.map((p, k) => p.startsWith("**") ? <strong key={k} style={{ color: C.accent }}>{p.slice(2, -2)}</strong> : p)}{j < arr.length - 1 && <br />}</span>;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(8,10,15,.97)", borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
      <div style={{ padding: "11px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10, background: "rgba(41,168,255,.05)", flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#29a8ff,#e91ea7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IC n="intel" s={13} c="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text, letterSpacing: ".04em" }}>AI TUTOR</div>
          <div style={{ fontSize: 10, color: C.accent }}>Lesson-aware · Powered by Claude</div>
        </div>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, display: "inline-block", animation: "pu 2s infinite" }} />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: 10, WebkitOverflowScrolling: "touch" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: 8, flexDirection: m.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
            {m.role === "assistant" && (
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#29a8ff,#e91ea7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: 2 }}>
                <IC n="intel" s={10} c="#fff" />
              </div>
            )}
            <div style={{ maxWidth: "84%", padding: "9px 12px", borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", background: m.role === "user" ? "rgba(41,168,255,.14)" : "rgba(17,21,32,.9)", border: `1px solid ${m.role === "user" ? "rgba(41,168,255,.25)" : C.border}`, fontSize: 12, color: C.text, lineHeight: 1.75 }}>
              {renderMsg(m.text)}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#29a8ff,#e91ea7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IC n="intel" s={10} c="#fff" />
            </div>
            <div style={{ padding: "10px 14px", borderRadius: "10px 10px 10px 2px", background: "rgba(17,21,32,.9)", border: `1px solid ${C.border}`, display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.accent, display: "inline-block", animation: `pu 1.2s ${i * 0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ padding: "6px 10px", display: "flex", gap: 5, flexWrap: "wrap", borderTop: `1px solid ${C.border}20` }}>
        {PROMPTS.map((p, i) => (
          <button key={i} onClick={() => setInput(p)} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: "rgba(41,168,255,.07)", border: `1px solid rgba(41,168,255,.18)`, color: C.accent, cursor: "pointer", whiteSpace: "nowrap", WebkitTapHighlightColor: "transparent" }}>{p}</button>
        ))}
      </div>

      <div style={{ padding: "9px 10px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 7, alignItems: "flex-end", flexShrink: 0 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask anything about this lesson…" rows={1} style={{ flex: 1, background: "rgba(17,21,32,.8)", border: `1px solid ${C.border}`, borderRadius: 7, padding: "8px 10px", fontSize: 13, color: C.text, resize: "none", outline: "none", fontFamily: "Inter,sans-serif", lineHeight: 1.5 }} />
        <button onClick={send} disabled={!input.trim() || loading} style={{ width: 34, height: 34, borderRadius: 7, background: input.trim() && !loading ? C.accent : C.border, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .15s" }}>
          <IC n="send" s={13} c={C.bg} />
        </button>
      </div>
    </div>
  );
};

// ── Lesson viewer ────────────────────────────────────────────────────────
const LessonViewer = ({ lessonId, course, lessonDb, completedIds, onBack, onNext, onPrev, onComplete, hasNext, hasPrev, lessonIndex, totalLessons }) => {
  const [tab, setTab] = useState("content");
  const [notes, setNotes] = useState("");
  const lesson = lessonDb[lessonId] || { id: lessonId, title: `Lesson ${lessonId}`, content: "", type: "lesson", duration: "—" };
  const isDone = completedIds.has(lessonId);

  const typeLabel = { lesson: "Lesson", quiz: "Quiz", exercise: "Exercise" };
  const typeColor = { lesson: C.accent, quiz: C.gold, exercise: C.pink };

  return (
    <div className="fi">
      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6 }} onClick={onBack}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Course
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 1 }}>{course.title}</div>
          <div style={{ fontSize: 14, color: C.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lesson.title}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 3, background: `${typeColor[lesson.type] || C.accent}18`, color: typeColor[lesson.type] || C.accent, border: `1px solid ${typeColor[lesson.type] || C.accent}40`, letterSpacing: ".06em", textTransform: "uppercase" }}>{typeLabel[lesson.type] || "Lesson"}</span>
          <button className="btn bg" style={{ padding: "6px 10px", fontSize: 12, minHeight: 0 }} disabled={!hasPrev} onClick={onPrev}>‹</button>
          <button className="btn bg" style={{ padding: "6px 10px", fontSize: 12, minHeight: 0 }} disabled={!hasNext} onClick={onNext}>›</button>
          {!isDone
            ? <button className="btn bp" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6 }} onClick={onComplete}><IC n="check" s={11} c={C.bg} />Mark Complete</button>
            : <span className="tg ta" style={{ padding: "6px 12px" }}>✓ Complete</span>
          }
        </div>
      </div>

      {/* Two col */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr min(360px,40%)", gap: 14, alignItems: "start" }}>

        {/* LEFT */}
        <div>
          {/* Header card */}
          <div style={{ background: `linear-gradient(135deg,rgba(13,16,24,.97),rgba(13,16,24,.85))`, border: `1px solid ${course.color}30`, borderRadius: 8, padding: "18px 20px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: "100%", background: `radial-gradient(ellipse at right,${course.color}08,transparent)`, pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, color: C.text, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>{lesson.title}</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {[
                    { l: "Est. Read", v: lesson.duration },
                    { l: "Type", v: lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1) },
                    { l: "Lesson", v: `${lessonIndex + 1} of ${totalLessons}` },
                    { l: "Status", v: isDone ? "✓ Done" : "In progress", c: isDone ? C.accent : C.textDim },
                  ].map(m => (
                    <div key={m.l}>
                      <div style={{ fontSize: 9, color: C.textDim, letterSpacing: ".08em", textTransform: "uppercase" }}>{m.l}</div>
                      <div style={{ fontSize: 12, color: m.c || C.text, marginTop: 2, fontFamily: "JetBrains Mono, monospace" }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {isDone && (
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${C.accent}20`, border: `2px solid ${C.accent}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IC n="check" s={16} c={C.accent} />
                </div>
              )}
            </div>
            {/* Course progress bar at bottom */}
            <div style={{ marginTop: 14, background: C.border, borderRadius: 2, height: 2 }}>
              <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg,${course.color},${course.color}80)`, width: `${totalLessons > 0 ? Math.round(((lessonIndex + 1) / totalLessons) * 100) : 0}%`, transition: "width .4s ease" }} />
            </div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 5 }}>Lesson {lessonIndex + 1} of {totalLessons} in this course</div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
            {[["content", "Content"], ["notes", "My Notes"], ["resources", "Resources"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: "9px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 500, color: tab === id ? C.accent : C.textMuted, borderBottom: `2px solid ${tab === id ? C.accent : "transparent"}`, marginBottom: -1, transition: "all .15s", whiteSpace: "nowrap", WebkitTapHighlightColor: "transparent" }}>{label}</button>
            ))}
          </div>

          {tab === "content" && (
            <div>
              <LessonContent text={lesson.content} />
              {!isDone && (
                <div style={{ marginTop: 24, padding: "14px 16px", background: `${course.color}08`, border: `1px solid ${course.color}25`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                  <span style={{ fontSize: 12, color: C.textMuted }}>Finished this lesson?</span>
                  <button className="btn bp" style={{ padding: "8px 18px", fontSize: 11 }} onClick={onComplete}>Mark Complete →</button>
                </div>
              )}
            </div>
          )}

          {tab === "notes" && (
            <div>
              <div style={{ fontSize: 11, color: C.textDim, marginBottom: 10 }}>Your private notes for this lesson.</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={`Add notes for "${lesson.title}"…`} style={{ width: "100%", minHeight: 220, background: "rgba(13,16,24,.8)", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px", fontSize: 13, color: C.text, resize: "vertical", outline: "none", fontFamily: "Inter,sans-serif", lineHeight: 1.7 }} />
            </div>
          )}

          {tab === "resources" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ icon: "📄", label: "Lesson PDF Reference", size: "Coming soon" }, { icon: "📊", label: "Chart Examples", size: "Coming soon" }, { icon: "📋", label: "Practice Checklist", size: "Coming soon" }].map((r, i) => (
                <div key={i} className="mc" style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", opacity: .55 }}>
                  <span style={{ fontSize: 20 }}>{r.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: C.text }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: C.textDim }}>{r.size}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — sticky AI tutor */}
        <div style={{ position: "sticky", top: 0, height: "min(calc(100vh - 120px), 680px)" }}>
          <CourseTutor lesson={lesson} course={course} lessonDb={lessonDb} />
        </div>
      </div>
    </div>
  );
};

// ── Course detail ────────────────────────────────────────────────────────
const CourseDetail = ({ course, lessonDb, completedIds, onBack, onStartLesson }) => {
  const [openSection, setOpenSection] = useState(0);
  const prog = getCourseProgress(course, completedIds);
  const allIds = course.sections.flatMap(s => s.lessonIds);
  const nextId = allIds.find(id => !completedIds.has(id)) || allIds[0];

  return (
    <div className="fi">
      <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }} onClick={onBack}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        All Courses
      </button>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,rgba(13,16,24,.97),rgba(13,16,24,.82))`, border: `1px solid ${course.color}28`, borderRadius: 10, padding: "22px 24px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: 180, background: `radial-gradient(ellipse at top right,${course.color}12,transparent)`, pointerEvents: "none" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", gap: 7, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", padding: "2px 8px", borderRadius: 3, background: `${course.color}18`, color: course.color, border: `1px solid ${course.color}40` }}>{course.badge}</span>
              <span style={{ fontSize: 9, color: C.textDim, letterSpacing: ".05em", padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 3 }}>{course.subtitle}</span>
            </div>
            <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 20, fontWeight: 300, color: C.text, letterSpacing: ".04em", marginBottom: 8 }}>{course.title}</h2>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.8, maxWidth: 480, marginBottom: 14 }}>{course.description}</p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[{ l: "Lessons", v: prog.total }, { l: "Duration", v: course.duration }, { l: "Sections", v: course.sections.length }, { l: "Complete", v: `${prog.done}/${prog.total}` }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }}>{m.l}</div>
                  <div className="mn" style={{ fontSize: 15, color: C.text }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="37" fill="none" stroke={C.border} strokeWidth="4" />
              <circle cx="45" cy="45" r="37" fill="none" stroke={course.color} strokeWidth="4"
                strokeDasharray={`${(prog.pct / 100) * 2 * Math.PI * 37} ${2 * Math.PI * 37}`}
                strokeLinecap="round" transform="rotate(-90 45 45)"
                style={{ filter: `drop-shadow(0 0 6px ${course.color}60)`, transition: "stroke-dasharray .6s ease" }} />
              <text x="45" y="40" textAnchor="middle" fill={course.color} fontFamily="JetBrains Mono" fontSize="17">{prog.pct}%</text>
              <text x="45" y="56" textAnchor="middle" fill={C.textDim} fontFamily="Inter" fontSize="8" letterSpacing=".08em">COMPLETE</text>
            </svg>
            <button className="btn bp" style={{ width: "100%", padding: "9px 14px", marginTop: 10, fontSize: 12 }} onClick={() => onStartLesson(nextId)}>
              {prog.pct === 0 ? "Start Course" : prog.pct === 100 ? "Review Course" : "Continue →"}
            </button>
          </div>
        </div>
      </div>

      {/* Outcomes */}
      <div className="mc" style={{ marginBottom: 14, padding: "14px 18px" }}>
        <div className="sl">What You'll Learn</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 }}>
          {course.outcomes.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${course.color}16`, border: `1px solid ${course.color}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 3 }}>
                <IC n="check" s={8} c={course.color} />
              </div>
              <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>{o}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum */}
      <div className="sl">Curriculum — {prog.total} Lessons</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {course.sections.map((section, si) => {
          const secDone = section.lessonIds.filter(id => completedIds.has(id)).length;
          const isOpen = openSection === si;
          return (
            <div key={si} style={{ background: "rgba(13,16,24,.82)", border: `1px solid ${isOpen ? C.accentDim : C.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color .2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", cursor: "pointer", userSelect: "none" }} onClick={() => setOpenSection(isOpen ? -1 : si)}>
                <div style={{ width: 24, height: 24, borderRadius: 5, background: secDone === section.lessonIds.length ? C.accentGlow : "rgba(17,21,32,.6)", border: `1px solid ${secDone === section.lessonIds.length ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {secDone === section.lessonIds.length
                    ? <IC n="check" s={10} c={C.accent} />
                    : <span style={{ fontSize: 10, color: C.textDim, fontFamily: "JetBrains Mono" }}>{si + 1}</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{section.title}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{secDone}/{section.lessonIds.length} complete</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" style={{ transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "none", flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
              </div>

              {isOpen && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  {section.lessonIds.map((lid, li) => {
                    const l = lessonDb[lid] || { title: `Lesson ${lid}`, type: "lesson", duration: "—" };
                    const done = completedIds.has(lid);
                    const typeColor = { lesson: C.accent, quiz: C.gold, exercise: C.pink };
                    return (
                      <div key={lid}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px 10px 52px", borderBottom: li < section.lessonIds.length - 1 ? `1px solid ${C.border}25` : "none", cursor: "pointer", transition: "background .12s" }}
                        onClick={() => onStartLesson(lid)}
                        onMouseEnter={e => e.currentTarget.style.background = C.surfaceAlt}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: done ? C.accent : "rgba(17,21,32,.8)", border: `1px solid ${done ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {done ? <IC n="check" s={9} c={C.bg} /> : <span style={{ fontSize: 9, color: C.textDim }}>{li + 1}</span>}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: done ? C.textMuted : C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
                          <span style={{ fontSize: 10, color: C.textDim }}>{l.duration}</span>
                          <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${typeColor[l.type] || C.accent}12`, color: typeColor[l.type] || C.accent, border: `1px solid ${typeColor[l.type] || C.accent}25`, textTransform: "uppercase", letterSpacing: ".05em" }}>{l.type || "lesson"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Main Education component ─────────────────────────────────────────────
const Education = () => {
  const [view, setView] = useState("library");
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedIds, setCompletedIds] = useState(new Set());

  const activeCourse = COURSE_DATA.find(c => c.id === activeCourseId);
  const allCourseIds = activeCourse ? activeCourse.sections.flatMap(s => s.lessonIds) : [];
  const currentIdx = activeLessonId ? allCourseIds.indexOf(activeLessonId) : -1;

  const markComplete = () => {
    if (!activeLessonId) return;
    setCompletedIds(prev => new Set([...prev, activeLessonId]));
    // Auto-advance if there's a next lesson
    if (currentIdx < allCourseIds.length - 1) {
      setTimeout(() => setActiveLessonId(allCourseIds[currentIdx + 1]), 400);
    }
  };

  // ── Library ──
  if (view === "library") return (
    <div className="fi">
      <div style={{ marginBottom: 20 }}>
        <h1 className="df df-h1" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 28, fontWeight: 300, marginBottom: 6 }}>Education Framework</h1>
        <p style={{ color: C.textMuted, fontSize: 13 }}>155 real lessons across 5 courses. Structured progression from foundation to advanced institutional methodology.</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 20 }}>
        {[
          { l: "Courses", v: COURSE_DATA.length, c: C.accent },
          { l: "Total Lessons", v: COURSE_DATA.reduce((a, c) => a + c.totalLessons, 0), c: C.accent },
          { l: "Completed", v: completedIds.size, c: completedIds.size > 0 ? C.accent : C.textMuted },
          { l: "Hours of Content", v: "27h+", c: C.gold },
        ].map(m => (
          <div key={m.l} className="mc" style={{ textAlign: "center", padding: "12px 10px" }}>
            <div className="mn" style={{ fontSize: 22, color: m.c, lineHeight: 1.1 }}>{m.v}</div>
            <div style={{ fontSize: 10, color: C.textDim, marginTop: 4, letterSpacing: ".04em" }}>{m.l}</div>
          </div>
        ))}
      </div>

      {/* Course grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 14 }}>
        {COURSE_DATA.map(course => {
          const prog = getCourseProgress(course, completedIds);
          const locked = course.tier === "addon";
          return (
            <div key={course.id} className="mc"
              style={{ cursor: locked ? "default" : "pointer", opacity: locked ? .6 : 1, padding: 0, overflow: "hidden", transition: "all .2s", border: `1px solid ${C.border}` }}
              onClick={() => !locked && (setActiveCourseId(course.id), setView("course"))}
              onMouseEnter={e => { if (!locked) { e.currentTarget.style.borderColor = `${course.color}55`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 28px ${course.color}12`; } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ height: 3, background: `linear-gradient(90deg,${course.color},${course.color}60)` }} />
              <div style={{ padding: "16px 16px 14px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 7, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", padding: "2px 7px", borderRadius: 3, background: `${course.color}18`, color: course.color, border: `1px solid ${course.color}38` }}>{course.badge}</span>
                      {locked && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: "rgba(233,30,167,.1)", color: C.pink, border: "1px solid rgba(233,30,167,.2)" }}>ADD-ON</span>}
                    </div>
                    <div style={{ fontSize: 14, color: C.text, fontWeight: 500, lineHeight: 1.35, marginBottom: 3 }}>{course.title}</div>
                    <div style={{ fontSize: 11, color: C.textDim }}>{course.subtitle}</div>
                  </div>
                  {/* Mini donut */}
                  <svg width="42" height="42" viewBox="0 0 42 42" style={{ flexShrink: 0 }}>
                    <circle cx="21" cy="21" r="16" fill="none" stroke={C.border} strokeWidth="3" />
                    <circle cx="21" cy="21" r="16" fill="none" stroke={course.color} strokeWidth="3"
                      strokeDasharray={`${(prog.pct / 100) * 2 * Math.PI * 16} ${2 * Math.PI * 16}`}
                      strokeLinecap="round" transform="rotate(-90 21 21)" />
                    <text x="21" y="25" textAnchor="middle" fill={course.color} fontFamily="JetBrains Mono" fontSize="8">{prog.pct}%</text>
                  </svg>
                </div>
                <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{course.description}</p>
                <div className="pb" style={{ marginBottom: 7 }}>
                  <div className="pf" style={{ width: `${prog.pct}%`, background: `linear-gradient(90deg,${course.color},${course.color}80)` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: C.textDim }}>{prog.done}/{prog.total} lessons · {course.duration}</span>
                  <span style={{ fontSize: 11, color: locked ? C.pink : course.color, fontWeight: 500 }}>
                    {locked ? "Add-on required" : prog.pct === 0 ? "Start →" : prog.pct === 100 ? "Review →" : "Continue →"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Course detail ──
  if (view === "course" && activeCourse) return (
    <CourseDetail
      course={activeCourse}
      lessonDb={LESSON_DB}
      completedIds={completedIds}
      onBack={() => setView("library")}
      onStartLesson={lid => { setActiveLessonId(lid); setView("lesson"); }}
    />
  );

  // ── Lesson viewer ──
  if (view === "lesson" && activeCourse && activeLessonId) return (
    <LessonViewer
      lessonId={activeLessonId}
      course={activeCourse}
      lessonDb={LESSON_DB}
      completedIds={completedIds}
      onBack={() => setView("course")}
      onNext={() => currentIdx < allCourseIds.length - 1 && setActiveLessonId(allCourseIds[currentIdx + 1])}
      onPrev={() => currentIdx > 0 && setActiveLessonId(allCourseIds[currentIdx - 1])}
      onComplete={markComplete}
      hasNext={currentIdx < allCourseIds.length - 1}
      hasPrev={currentIdx > 0}
      lessonIndex={currentIdx}
      totalLessons={allCourseIds.length}
    />
  );

  return null;
};


const EconomicCalendar = () => {
  return (
    <div className="fi" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>
      <div style={{ marginBottom:16, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28, fontWeight:300, marginBottom:4}}>Economic Calendar</h1>
            <p style={{ color:C.textMuted, fontSize:13 }}>High-impact macro events · Filter by currency and impact level · Data via TradingView</p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {[{label:"High",color:C.pink},{label:"Medium",color:C.gold},{label:"Low",color:C.textDim}].map(i=>(
              <div key={i.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:i.color, display:"inline-block" }}/>
                <span style={{ fontSize:11, color:C.textMuted }}>{i.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex:1, background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", backdropFilter:"blur(8px)" }}>
        <TVCalendarWidget height={700}/>
      </div>
      <div style={{ marginTop:8, display:"flex", justifyContent:"flex-end" }}>
        <a href="https://www.tradingview.com/economic-calendar/" rel="noopener nofollow" target="_blank" style={{ fontSize:11, color:C.accent, textDecoration:"none" }}>Open full calendar on TradingView ↗</a>
      </div>
    </div>
  );
};

const COMMUNITY_SEED = [
  { id:1,  u:"Admin",     tag:"Admin",  tc:"td",  avatar:"A", time:"08:00", text:"Good morning. Market structure discussion is open. Keep contributions analytical and framework-based.", reactions:[{e:"👍",n:4}] },
  { id:2,  u:"T.Adeyemi", tag:"FMF",   tc:"tg2", avatar:"T", time:"09:14", text:"DXY structure looks compressive ahead of the NY session. Equal lows sitting below 103.40 — watching for a liquidity sweep before any directional commitment.", reactions:[{e:"🔥",n:3},{e:"👍",n:2}] },
  { id:3,  u:"K.Morrow",  tag:"Member",tc:"tb",  avatar:"K", time:"09:28", text:"Structural bias on EURUSD H4 shifted bearish after the break of the most recent lower high. Risk defined accordingly.", reactions:[{e:"👍",n:5}] },
  { id:4,  u:"J.Ashford", tag:"FMF",   tc:"tg2", avatar:"J", time:"09:41", text:"XAUUSD showing classic inducement behavior above 2040. No structural confirmation yet. Monitoring, not positioned.", reactions:[{e:"🧠",n:6},{e:"👍",n:1}] },
  { id:5,  u:"Admin",     tag:"Admin", tc:"td",  avatar:"A", time:"09:55", text:"Reminder: Chart analysis discussions are structural only. Specific entry prices and signals are not permitted per community guidelines.", reactions:[] },
  { id:6,  u:"P.Nkosi",   tag:"Member",tc:"tb",  avatar:"P", time:"10:07", text:"In a compression range, does liquidity engineering at both ends indicate accumulation or distribution? Looking for framework perspective.", reactions:[{e:"🤔",n:4},{e:"👍",n:2}] },
  { id:7,  u:"T.Adeyemi", tag:"FMF",   tc:"tg2", avatar:"T", time:"10:22", text:"@P.Nkosi Context dependent. Engineering at both sides typically precedes a directional expansion. The side that breaks last tends to be the engineered sweep — the true direction is opposite.", reactions:[{e:"🔥",n:8},{e:"🧠",n:5}] },
  { id:8,  u:"S.Okafor",  tag:"Member",tc:"tb",  avatar:"S", time:"10:45", text:"GBPUSD: higher timeframe bearish order block holding as resistance. Aligns with current DXY compression thesis.", reactions:[{e:"👍",n:3}] },
];

const AVATAR_COLORS = ["#29a8ff","#e91ea7","#c8a96e","#7c6aff","#3ecf8e","#ff6b6b"];
function avatarColor(name){ let h=0; for(let c of name) h=(h*31+c.charCodeAt(0))%AVATAR_COLORS.length; return AVATAR_COLORS[h]; }

const Community = () => {
  const [messages, setMessages] = useState(COMMUNITY_SEED);
  const [msg, setMsg] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const ME = { u:"J.Harrison", tag:"Member", tc:"tb", avatar:"J" };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = () => {
    if (!msg.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
    setMessages(prev => [...prev, {
      id: Date.now(), u:ME.u, tag:ME.tag, tc:ME.tc, avatar:ME.avatar,
      time, text:msg.trim(), reactions:[],
      replyTo: replyTo ? { u:replyTo.u, text:replyTo.text.slice(0,60)+"…" } : null,
    }]);
    setMsg(""); setReplyTo(null);
  };

  const addReaction = (id, emoji) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== id) return m;
      const existing = m.reactions.find(r => r.e === emoji);
      if (existing) return { ...m, reactions: m.reactions.map(r => r.e===emoji ? {...r,n:r.n+1} : r) };
      return { ...m, reactions:[...m.reactions, {e:emoji,n:1}] };
    }));
  };

  const ONLINE = [{u:"T.Adeyemi",t:"FMF",tc:"tg2"},{u:"J.Ashford",t:"FMF",tc:"tg2"},{u:"K.Morrow",t:"Member",tc:"tb"},{u:"S.Okafor",t:"Member",tc:"tb"},{u:"Admin",t:"Admin",tc:"td"}];
  const QUICK_REACTIONS = ["👍","🔥","🧠","🤔","💯"];

  return (
    <div className="fi community-chat-wrap" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", maxHeight:820 }}>

      {/* Header */}
      <div style={{ marginBottom:14, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:2}}>Fortitude Community</h1>
            <p style={{ color:C.textMuted,fontSize:13 }}>Professional market discussion. Structural analysis only.</p>
          </div>
          <div style={{ display:"flex", gap:16, alignItems:"center" }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, color:C.textDim, letterSpacing:".08em", textTransform:"uppercase", marginBottom:2 }}>Online</div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block",animation:"pu 2s infinite" }}/>
                <span style={{ fontSize:13, fontWeight:600, color:C.accent }}>{ONLINE.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rules banner */}
        <div className="comm-rules" style={{ display:"flex", gap:24, padding:"10px 16px", background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:6, marginTop:12 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:10, fontWeight:600, color:C.accent, letterSpacing:".08em", textTransform:"uppercase" }}>✓ Permitted</span>
            <span style={{ fontSize:11, color:C.textMuted }}>Market structure · Framework discussion · Risk methodology</span>
          </div>
          <div className="comm-rules-divider" style={{ width:1, background:C.border }}/>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:10, fontWeight:600, color:C.pink, letterSpacing:".08em", textTransform:"uppercase" }}>✕ Not Permitted</span>
            <span style={{ fontSize:11, color:C.textMuted }}>Signal requests · Profit flexing · Predictions · Emotional venting</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="community-grid" style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:14, flex:1, minHeight:0 }}>

        {/* Chat panel */}
        <div style={{ display:"flex", flexDirection:"column", background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden" }}>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"16px 12px", display:"flex", flexDirection:"column", gap:2 }}>
            {messages.map((m, i) => {
              const isMe = m.u === ME.u;
              const prevSame = i > 0 && messages[i-1].u === m.u;
              const ac = avatarColor(m.u);
              return (
                <div key={m.id}
                  onMouseEnter={() => setHoverId(m.id)}
                  onMouseLeave={() => setHoverId(null)}
                  style={{ display:"flex", flexDirection:"column", alignItems: isMe ? "flex-end" : "flex-start", marginTop: prevSame ? 2 : 10, position:"relative" }}>

                  {/* Sender name + time — only on first in group */}
                  {!prevSame && (
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3, flexDirection: isMe ? "row-reverse" : "row" }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:`${ac}22`, border:`1px solid ${ac}60`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:11, fontWeight:700, color:ac }}>{m.avatar}</span>
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:ac }}>{m.u}</span>
                      <span className={`tg ${m.tc}`} style={{ fontSize:8 }}>{m.tag}</span>
                      <span className="mn" style={{ fontSize:10, color:C.textDim }}>{m.time}</span>
                    </div>
                  )}

                  {/* Reply preview */}
                  {m.replyTo && (
                    <div style={{ fontSize:11, color:C.textDim, borderLeft:`2px solid ${C.accent}`, paddingLeft:8, marginBottom:4, maxWidth:420, marginLeft: isMe ? 0 : 36 }}>
                      <span style={{ color:C.accent, fontWeight:600 }}>{m.replyTo.u}: </span>{m.replyTo.text}
                    </div>
                  )}

                  {/* Bubble */}
                  <div style={{ maxWidth:"70%", marginLeft: isMe ? 0 : 36 }}>
                    <div style={{
                      padding:"9px 13px", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      background: isMe ? `${C.accent}22` : "rgba(17,21,32,.9)",
                      border:`1px solid ${isMe ? C.accent+"40" : C.border}`,
                      fontSize:13, color:C.text, lineHeight:1.65,
                    }}>
                      {m.text}
                    </div>

                    {/* Reactions */}
                    {m.reactions.length > 0 && (
                      <div style={{ display:"flex", gap:4, marginTop:4, flexWrap:"wrap", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                        {m.reactions.map(r => (
                          <span key={r.e} onClick={() => addReaction(m.id, r.e)} style={{ fontSize:11, padding:"2px 7px", borderRadius:10, background:"rgba(17,21,32,.9)", border:`1px solid ${C.border}`, cursor:"pointer", display:"flex", alignItems:"center", gap:4, color:C.textMuted }}>
                            {r.e} <span style={{ color:C.accent }}>{r.n}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover actions */}
                  {hoverId === m.id && (
                    <div style={{ position:"absolute", top:-8, right: isMe ? "auto" : 0, left: isMe ? 0 : "auto", display:"flex", gap:3, background:"rgba(13,16,24,.96)", border:`1px solid ${C.border}`, borderRadius:8, padding:"3px 6px", zIndex:10 }}>
                      {QUICK_REACTIONS.map(e => (
                        <span key={e} onClick={() => addReaction(m.id, e)} style={{ fontSize:14, cursor:"pointer", padding:"2px 4px", borderRadius:4 }}
                          onMouseEnter={ev => ev.currentTarget.style.background="rgba(41,168,255,.12)"}
                          onMouseLeave={ev => ev.currentTarget.style.background="transparent"}>
                          {e}
                        </span>
                      ))}
                      <div style={{ width:1, background:C.border, margin:"0 2px" }}/>
                      <span onClick={() => { setReplyTo(m); inputRef.current?.focus(); }} style={{ fontSize:11, color:C.textDim, cursor:"pointer", padding:"2px 6px", borderRadius:4, display:"flex", alignItems:"center" }}
                        onMouseEnter={ev => ev.currentTarget.style.color=C.accent}
                        onMouseLeave={ev => ev.currentTarget.style.color=C.textDim}>
                        ↩ Reply
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={endRef}/>
          </div>

          {/* Reply bar */}
          {replyTo && (
            <div style={{ padding:"8px 14px", background:"rgba(41,168,255,.06)", borderTop:`1px solid ${C.accent}30`, display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ flex:1, borderLeft:`2px solid ${C.accent}`, paddingLeft:10 }}>
                <div style={{ fontSize:11, color:C.accent, fontWeight:600, marginBottom:2 }}>{replyTo.u}</div>
                <div style={{ fontSize:11, color:C.textDim }}>{replyTo.text.slice(0,80)}…</div>
              </div>
              <span onClick={() => setReplyTo(null)} style={{ fontSize:16, color:C.textDim, cursor:"pointer", padding:"0 4px" }}>✕</span>
            </div>
          )}

          {/* Input */}
          <div style={{ padding:"10px 12px", borderTop:`1px solid ${C.border}`, display:"flex", gap:8, alignItems:"flex-end", background:"rgba(8,10,15,.6)" }}>
            <textarea
              ref={inputRef}
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); send(); }}}
              placeholder="Contribute to the structural discussion…  (Enter to send, Shift+Enter for new line)"
              style={{ flex:1, background:"rgba(17,21,32,.85)", border:`1px solid ${C.border}`, color:C.text, borderRadius:8, padding:"10px 14px", fontSize:13, fontFamily:"Inter,sans-serif", resize:"none", minHeight:42, maxHeight:120, outline:"none", lineHeight:1.5, transition:"border-color .2s" }}
              onFocus={e => e.target.style.borderColor=C.accent}
              onBlur={e => e.target.style.borderColor=C.border}
              rows={1}
            />
            <button onClick={send} style={{ width:40, height:40, borderRadius:8, background: msg.trim() ? C.accent : C.border, border:"none", cursor: msg.trim() ? "pointer" : "default", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={msg.trim()?"#080a0f":C.textDim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="comm-sidebar" style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {/* Online members */}
          <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, padding:14 }}>
            <div className="sl">Online Now</div>
            {ONLINE.map((m,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:i<ONLINE.length-1?`1px solid ${C.border}`:"none" }}>
                <span style={{ width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block",animation:"pu 2s infinite",boxShadow:`0 0 5px ${C.accent}` }}/>
                <span style={{ flex:1, fontSize:12, color:C.textMuted }}>{m.u}</span>
                <span className={`tg ${m.tc}`} style={{ fontSize:8 }}>{m.t}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, padding:14 }}>
            <div className="sl">Today</div>
            {[{l:"Messages",v:messages.length},{l:"Active",v:ONLINE.length},{l:"Reactions",v:messages.reduce((a,m)=>a+m.reactions.reduce((b,r)=>b+r.n,0),0)}].map(s=>(
              <div key={s.l} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{s.l}</span>
                <span className="mn" style={{ fontSize:12,color:C.accent }}>{s.v}</span>
              </div>
            ))}
          </div>

          {/* Community rules */}
          <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, padding:14 }}>
            <div className="sl">Guidelines</div>
            {["Structural analysis only","No signal sharing","Respect all members","Framework-based discussion","Admin decisions are final"].map((r,i) => (
              <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", borderBottom:i<4?`1px solid ${C.border}`:"none" }}>
                <span style={{ fontSize:10, color:C.accent, marginTop:1 }}>✓</span>
                <span style={{ fontSize:11, color:C.textMuted, lineHeight:1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SUBSCRIPTION & ACCESS ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

// Tier definitions — single source of truth
const TIERS = {
  free: { id:"free", label:"Free",         monthly:0,  annual:0,  color:C.textMuted, order:0 },
  "45": { id:"45",   label:"Core",         monthly:45, annual:36, color:C.accent,    order:1 },
  "65": { id:"65",   label:"Professional", monthly:65, annual:52, color:C.accent,    order:2 },
  "95": { id:"95",   label:"Elite",        monthly:95, annual:76, color:C.accent,    order:3 },
};

// Access control matrix — single source of truth
const ACCESS = {
  dashboard:       { free:"limited", "45":true, "65":true, "95":true },
  intelligence:    { free:false,     "45":true, "65":true, "95":true },
  journal:         { free:false,     "45":false,"65":true, "95":true },
  behavioral:      { free:false,     "45":false,"65":true, "95":true },
  cognitive:       { free:false,     "45":false,"65":true, "95":true },
  coach:           { free:false,     "45":false,"65":true, "95":true },
  education:       { free:true,      "45":true, "65":true, "95":true },
  calendar:        { free:false,     "45":true, "65":true, "95":true },
  community:       { free:false,     "45":true, "65":true, "95":true },
  account:         { free:true,      "45":true, "65":true, "95":true },
  admin:           { free:false,     "45":false,"65":false,"95":false },
  // Add-on products (require active subscription)
  advanced_course: { free:false,     "45":true, "65":true, "95":true },
  workshop:        { free:false,     "45":true, "65":true, "95":true },
  mentorship:      { free:false,     "45":true, "65":true, "95":true },
};

// AI usage caps by tier (requests/day)
const AI_CAPS = {
  free:0, "45":5, "65":10, "95":999,
};

// Check access for a given tier + feature
function canAccess(tier, feature) {
  const rule = ACCESS[feature];
  if (!rule) return false;
  // Lifetime bypasses all subscription validation
  return rule[tier] === true || rule[tier] === "limited";
}

function isLimited(tier, feature) {
  return ACCESS[feature]?.[tier] === "limited";
}

// Upgrade recommendation for a blocked feature
function requiredTier(feature) {
  const rule = ACCESS[feature];
  if (!rule) return "95";
  for (const t of ["45","65","95"]) {
    if (rule[t] === true) return t;
  }
  return "95";
}

// ── Gate Wall Component ───────────────────────────────────────────────────────
const GateWall = ({ feature, currentTier, setPage, readOnly = false, hasData = false }) => {
  const req = requiredTier(feature);
  const tierMeta = TIERS[req] || TIERS["95"];
  const featureLabels = {
    journal:"Performance Journal", behavioral:"Behavioral Intelligence", cognitive:"Cognitive Intelligence",
    coach:"Performance Coach", intelligence:"Market Intelligence", calendar:"Economic Calendar", community:"Community",
    admin:"Administration",
  };
  const label = featureLabels[feature] || feature;

  return (
    <div className="fi" style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380,textAlign:"center",padding:48 }}>
      <div style={{ width:52,height:52,borderRadius:"50%",background:`${readOnly?C.gold:tierMeta.color}18`,border:`1px solid ${readOnly?C.gold:tierMeta.color}40`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
        <IC n={readOnly?"lock":"shield"} s={22} c={readOnly?C.gold:tierMeta.color}/>
      </div>

      {readOnly ? (
        <>
          <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:22,fontWeight:300,color:C.text,marginBottom:10 }}>Subscription Inactive</div>
          <div style={{ fontSize:13,color:C.textMuted,lineHeight:2,maxWidth:400,marginBottom:8 }}>
            Your subscription is no longer active. Access to <span style={{ color:C.text }}>{label}</span> has been suspended.
          </div>
          {hasData && (
            <div style={{ padding:"10px 18px",background:"rgba(200,169,110,.06)",border:`1px solid ${C.goldDim}`,borderRadius:6,marginBottom:20,maxWidth:400 }}>
              <div style={{ fontSize:12,color:C.gold,marginBottom:3,fontWeight:500 }}>Data Preserved</div>
              <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.8 }}>
                All journal entries, behavioral metrics, and coaching history are preserved in full. Access resumes immediately upon reactivating your subscription. No data has been deleted.
              </div>
            </div>
          )}
          {!hasData && <div style={{ height:20 }}/>}
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn bp" style={{ minWidth:180,padding:"12px 24px" }} onClick={()=>setPage("pricing")}>
              Reactivate Subscription
            </button>
            <button className="btn bg" style={{ padding:"12px 20px" }} onClick={()=>setPage("account")}>
              Account
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:22,fontWeight:300,color:C.text,marginBottom:10 }}>Access Restricted</div>
          <div style={{ fontSize:13,color:C.textMuted,lineHeight:2,maxWidth:400,marginBottom:6 }}>
            <span style={{ color:C.text }}>{label}</span> requires{" "}
            <span style={{ color:tierMeta.color,fontWeight:500 }}>{tierMeta.label} membership</span>
            {` (${tierMeta.price}${tierMeta.billing})`} or above.
          </div>
          <div style={{ fontSize:12,color:C.textDim,marginBottom:24,maxWidth:360,lineHeight:1.8 }}>
            Upgrade to unlock this feature. All data accumulated on a higher tier is preserved if you downgrade.
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn bp" style={{ minWidth:180,padding:"12px 24px" }} onClick={()=>setPage("pricing")}>
              View Membership Options
            </button>
            <button className="btn bg" style={{ padding:"12px 20px" }} onClick={()=>setPage("account")}>
              Account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ── AI Usage Meter ────────────────────────────────────────────────────────────
const AIUsageMeter = ({ tier, used, setPage }) => {
  const cap = AI_CAPS[tier];
  const unlimited = cap >= 999;
  const pct = unlimited ? 100 : Math.min(100, Math.round((used / cap) * 100));
  const nearLimit = !unlimited && pct >= 80;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,padding:"11px 16px",background:"rgba(13,16,24,.82)",border:`1px solid ${nearLimit?C.gold:C.border}`,borderRadius:6,backdropFilter:"blur(8px)" }}>
      <IC n="zap" s={13} c={nearLimit?C.gold:C.accent}/>
      <span style={{ fontSize:12,color:C.textMuted }}>AI analyses today:</span>
      {unlimited
        ? <span className="mn" style={{ fontSize:12,color:C.accent }}>Unlimited</span>
        : <>
            <div style={{ flex:1,maxWidth:140 }}><div className="pb"><div className="pf" style={{ width:`${pct}%`,background:nearLimit?C.gold:undefined }}/></div></div>
            <span className="mn" style={{ fontSize:12,color:nearLimit?C.gold:C.accent }}>{used}/{cap}</span>
          </>
      }
      {nearLimit && <button className="btn bg" style={{ fontSize:10,padding:"3px 10px",borderColor:C.gold,color:C.gold }} onClick={()=>setPage("account")}>Upgrade</button>}
    </div>
  );
};

// ── Pricing Page (standalone) ─────────────────────────────────────────────────
const Pricing = ({ currentTier, setPage, onUpgrade, subStatus, setSubStatus }) => {
  const [selectedAddon, setSelectedAddon] = useState(null);
  const [billingAnnual, setBillingAnnual] = useState(true);

  const TIER_FEATURES = {
    free:     ["Beginner Trading Course","Beginner Crypto Course","Platform login"],
    "45":     ["Full Dashboard","Market Intelligence","AI Chart Analysis (5/day)","Community Chat","Market Updates"],
    "65":     ["Everything in Core","Trading Journal","Performance Metrics","Behavioral Analytics","Performance Coach","Pre-Commitment System","Cognitive Dashboard","AI Chart Analysis (10/day)"],
    "95":     ["Everything in Professional","Unlimited AI Chart Analysis","Unlimited Journal Imports","Priority AI Response","Full Behavioral Engine Access","Live Broker Sync"],

  };

  const ADDONS = [
    { id:"advanced_course", label:"Advanced Trading Course", price:"$495", note:"Requires active subscription", desc:"In-depth structural analysis methodology. Institutional framework extension." },
    { id:"workshop",        label:"Workshop Series",         price:"$495", note:"Requires active subscription", desc:"Live workshop recordings. Applied FMF techniques across multiple asset classes." },
    { id:"mentorship",      label:"Mentorship Program",      price:"$2,995",note:"Recommended: Pro or Full Access",        desc:"Direct coaching engagement. Personalised performance review and structural guidance." },
  ];

  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Membership</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Structured access. No hidden terms.</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:520 }}>Access to structured market intelligence and disciplined performance tools. Select the tier appropriate to your current stage of development.</p>
      </div>

      {/* Billing toggle */}
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}>
        <span style={{ fontSize:12,color:billingAnnual?C.textDim:C.text,fontWeight:billingAnnual?400:600 }}>Monthly</span>
        <div onClick={()=>setBillingAnnual(v=>!v)} style={{
          width:40,height:22,borderRadius:11,cursor:"pointer",transition:"background .2s",
          background:billingAnnual?C.accent:"rgba(255,255,255,.12)",position:"relative",flexShrink:0,
        }}>
          <div style={{
            position:"absolute",top:3,left:billingAnnual?21:3,width:16,height:16,
            borderRadius:"50%",background:"#fff",transition:"left .2s",
          }}/>
        </div>
        <span style={{ fontSize:12,color:billingAnnual?C.text:C.textDim,fontWeight:billingAnnual?600:400 }}>Annual</span>
        {billingAnnual && <span style={{ fontSize:10,fontWeight:700,color:C.accent,letterSpacing:".06em",padding:"2px 8px",border:`1px solid ${C.accent}40`,borderRadius:3 }}>SAVE 20%</span>}
      </div>

      {/* Tier cards */}
      <div className="pricing-grid" style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:24 }}>
        {["free","45","65","95"].map(tid => {
          const t = TIERS[tid];
          const isCurrent = t.id === currentTier;
          const isBelow = t.order < TIERS[currentTier].order;
          const price = t.monthly === null ? "$3,995" : t.monthly === 0 ? "$0" : billingAnnual ? `$${t.annual}` : `$${t.monthly}`;
          const billing = t.monthly === null ? "one-time" : t.monthly === 0 ? "" : billingAnnual ? "/month, billed annually" : "/month";
          return (
            <div key={t.id} style={{ border:`1px solid ${isCurrent?t.color:C.border}`,borderRadius:8,padding:18,background:isCurrent?`linear-gradient(135deg,rgba(13,16,24,.95),${t.color}08)`:"rgba(13,16,24,.82)",backdropFilter:"blur(8px)",display:"flex",flexDirection:"column",transition:"all .2s",position:"relative" }}
              onMouseEnter={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=C.accent+"50"; }}
              onMouseLeave={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=C.border; }}>
              {t.id==="95" && <div style={{ position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#fff",fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"2px 10px",borderRadius:"0 0 5px 5px" }}>Most Popular</div>}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11,fontWeight:600,color:isCurrent?t.color:C.textMuted,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6 }}>{t.label}</div>
                <div className="mn" style={{ fontSize:24,color:isCurrent?t.color:C.text,fontWeight:400,lineHeight:1 }}>{price}</div>
                <div style={{ fontSize:10,color:C.textDim,marginTop:3 }}>{billing||"free forever"}</div>
                {billingAnnual && t.monthly && t.monthly > 0 && (
                  <div style={{ fontSize:9,color:C.accent,marginTop:4 }}>
                    Save ${(t.monthly - t.annual) * 12}/yr
                  </div>
                )}
              </div>
              <hr className="dv" style={{ margin:"10px 0" }}/>
              <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7,marginBottom:14 }}>
                {TIER_FEATURES[t.id].map(f=>(
                  <div key={f} style={{ display:"flex",gap:7,alignItems:"flex-start" }}>
                    <IC n="check" s={10} c={isCurrent?t.color:C.textDim}/>
                    <span style={{ fontSize:11,color:isCurrent?C.textMuted:C.textDim,lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              {isCurrent
                ? <div style={{ textAlign:"center",fontSize:11,fontWeight:600,color:t.color,padding:"8px 0",border:`1px solid ${t.color}40`,borderRadius:4 }}>Current Plan</div>
                : isBelow
                ? <div style={{ textAlign:"center",fontSize:11,color:C.textDim,padding:"8px 0" }}>Downgrade</div>
                : <button className="btn bp" style={{ width:"100%",fontSize:11,padding:"9px 0" }} onClick={()=>{onUpgrade(t.id);setSubStatus&&setSubStatus("active");}}>
                    Upgrade
                  </button>
              }
            </div>
          );
        })}
      </div>

      {/* Add-on products */}
      <div className="sl">Programs & Courses</div>
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
        {ADDONS.map(a => {
          const accessible = canAccess(currentTier, a.id);
          return (
            <div key={a.id} className="mc" style={{ display:"flex",alignItems:"center",gap:18,opacity:accessible?1:.6 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                  <span style={{ fontSize:14,fontWeight:500,color:C.text }}>{a.label}</span>
                  {!accessible && <span className="tg td">Subscription Required</span>}
                </div>
                <div style={{ fontSize:12,color:C.textMuted,marginBottom:4 }}>{a.desc}</div>
                <div style={{ fontSize:11,color:C.textDim }}>{a.note}</div>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div className="mn" style={{ fontSize:20,color:C.gold,fontWeight:400,marginBottom:8 }}>{a.price}</div>
                <button className="btn bg" style={{ fontSize:11 }} disabled={!accessible}>
                  {accessible ? "Purchase" : "Requires Subscription"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional tone note */}
      <div style={{ padding:"14px 18px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
        <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>
          All subscriptions process via Stripe. Monthly plans bill on the same date each month. Annual plans are charged in full at the start of each billing year at a 20% discount. Downgrade takes effect at the end of the current billing period — no data is deleted. Lifetime membership is a one-time payment with no recurring charges. Programs and courses require an active subscription to access; if your subscription lapses, content is preserved in read-only mode and resumes on reactivation.
        </div>
      </div>
    </div>
  );
};

// ── Account Page ──────────────────────────────────────────────────────────────
const Account = ({ currentTier, setTier, setPage, aiUsed, subStatus, setSubStatus, onUpgrade }) => {
  const [tab, setTab] = useState("subscription");
  const tier = TIERS[currentTier];

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Account</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Subscription management, usage tracking, and security settings.</p>
      </div>

      {/* Profile strip */}
      <div className="mc" style={{ marginBottom:18,borderColor:tier.color,display:"flex",gap:18,alignItems:"center",padding:"14px 20px" }}>
        <div style={{ width:44,height:44,borderRadius:"50%",background:`${tier.color}18`,border:`1px solid ${tier.color}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:19,color:tier.color,fontFamily:"Inter,sans-serif",fontWeight:700 }}>J</span>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:500,color:C.text,marginBottom:2 }}>J. Harrison</div>
          <div style={{ fontSize:12,color:C.textMuted }}>j.harrison@email.com</div>
        </div>
        <div style={{ marginLeft:"auto",display:"flex",gap:10,alignItems:"center" }}>
          <div style={{ textAlign:"right",marginRight:8 }}>
            <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase" }}>Current Plan</div>
            <div style={{ fontSize:13,fontWeight:600,color:tier.color }}>{tier.label} — {tier.price}{tier.billing}</div>
          </div>
          <span className="tg" style={{ background:`${tier.color}18`,color:tier.color,border:`1px solid ${tier.color}40` }}>Active</span>
          <button className="btn bg">Edit Profile</button>
          <button className="btn bg" style={{ display:"flex",alignItems:"center",gap:6 }}><IC n="logout" s={13}/>Sign Out</button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display:"flex",gap:2,marginBottom:16,borderBottom:`1px solid ${C.border}`,paddingBottom:0,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none" }}>
        {[{id:"subscription",label:"Subscription"},{id:"usage",label:"AI Usage & Limits"},{id:"security",label:"Security"}].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"10px 16px",cursor:"pointer",fontSize:12,fontWeight:500,color:tab===t.id?C.accent:C.textMuted,borderBottom:`2px solid ${tab===t.id?C.accent:"transparent"}`,transition:"all .2s",marginBottom:-1,whiteSpace:"nowrap",WebkitTapHighlightColor:"transparent" }}>{t.label}</div>
        ))}
      </div>

      {tab==="subscription" && (
        <div className="fi">
          {/* Current plan detail */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14 }}>
            <div className="mc" style={{ borderColor:subStatus==="active"?tier.color:C.gold }}>
              <div className="sl">Active Plan</div>
              <div style={{ fontSize:20,color:subStatus==="active"?tier.color:C.gold,fontWeight:600,marginBottom:6,fontFamily:"Inter,sans-serif",letterSpacing:".02em" }}>{tier.label}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {[
                  {l:"Status",      v:subStatus==="active"?"Active":"Suspended", c:subStatus==="active"?C.accent:C.gold},
                  {l:"Billing",     v:tier.billing||"One-time",                   c:C.text},
                  {l:"AI Analyses", v:AI_CAPS[currentTier]>=999?"Unlimited":`${AI_CAPS[currentTier]}/day`, c:C.accent},
                  {l:"Next billing",v:"23 Mar 2026", c:C.textMuted},
                ].map(r=>(
                  <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:12,color:C.textMuted }}>{r.l}</span>
                    <span className="mn" style={{ fontSize:12,color:r.c }}>{r.v}</span>
                  </div>
                ))}
              </div>
              {/* Downgrade/lapse rules — shown when active */}
              {subStatus==="active" && currentTier!=="free" && (
                <div style={{ marginTop:12,padding:"10px 12px",background:"rgba(13,16,24,.6)",borderRadius:5,border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6 }}>Downgrade policy</div>
                  <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>Journal becomes read-only. Coach history preserved. No data deleted. Takes effect end of billing period.</div>
                </div>
              )}
            </div>
            <div className="mc">
              <div className="sl">Tier Simulator <span style={{ fontSize:10,color:C.textDim,fontWeight:400,textTransform:"none",letterSpacing:0 }}>(demo — change access level)</span></div>
              <div style={{ fontSize:12,color:C.textMuted,marginBottom:12 }}>Switch tier to preview access gates across the platform.</div>
              {Object.values(TIERS).map(t=>(
                <div key={t.id} onClick={()=>{setTier(t.id);if(t.id==="free")setSubStatus("active");}} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",background:t.color }}/>
                    <span style={{ fontSize:12,color:currentTier===t.id?t.color:C.textMuted,fontWeight:currentTier===t.id?600:400 }}>{t.label}</span>
                  </div>
                  <span style={{ fontSize:11,color:t.color }}>{t.price}{t.billing}</span>
                </div>
              ))}

              {/* Subscription status toggle for demo */}
              <div style={{ marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8 }}>Simulate Subscription State</div>
                <div style={{ display:"flex",gap:8 }}>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="active"?C.accent:C.border,color:subStatus==="active"?C.accent:C.textMuted }} onClick={()=>setSubStatus("active")}>Active</button>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="expired"?C.gold:C.border,color:subStatus==="expired"?C.gold:C.textMuted }} onClick={()=>setSubStatus("expired")}>Lapsed</button>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="cancelled"?C.pink:C.border,color:subStatus==="cancelled"?C.pink:C.textMuted }} onClick={()=>setSubStatus("cancelled")}>Cancelled</button>
                </div>
                <div style={{ fontSize:11,color:C.textDim,marginTop:8,lineHeight:1.7 }}>
                  {subStatus==="expired"&&"Subscription lapsed. Premium features frozen. Data preserved. Reactivate to restore access."}
                  {subStatus==="cancelled"&&"Subscription cancelled. Access ends at period close. Data preserved for 30 days post-expiry."}
                  {subStatus==="active"&&"Subscription active. All tier-appropriate features accessible."}
                </div>
              </div>
            </div>
          </div>
          <button className="btn bp" style={{ width:"100%" }} onClick={()=>setPage("pricing")}>View All Plans & Upgrade</button>
        </div>
      )}

      {tab==="usage" && (
        <div className="fi">
          <div className="session-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18 }}>
            {[{l:"Chart Analyses Today",v:`${aiUsed}/${AI_CAPS[currentTier]>=999?"∞":AI_CAPS[currentTier]}`,c:C.accent},{l:"Coach Sessions",v:"3 this month",c:C.accent},{l:"Journal Imports",v:currentTier==="65"||currentTier==="95"?"Unlimited":"N/A",c:C.textMuted}].map(m=>(
              <div key={m.l} className="mc" style={{ textAlign:"center" }}>
                <div className="sl" style={{ textAlign:"center" }}>{m.l}</div>
                <div className="mn" style={{ fontSize:20,color:m.c }}>{m.v}</div>
              </div>
            ))}
          </div>
          <div className="sl">Daily AI Caps by Tier</div>
          <div className="mob-table-wrap" style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
            <table>
              <thead><tr><th>Tier</th><th>Chart Analysis</th><th>Journal AI</th><th>Coach Messages</th><th>Caching</th></tr></thead>
              <tbody>
                {[
                  {t:"Free",          chart:"0",    journal:"—",       coach:"—",         cache:"N/A"},
                  {t:"Fortitude",     chart:"5/day",journal:"—",       coach:"—",         cache:"Yes"},
                  {t:"Fortitude Pro", chart:"10/day",journal:"Batch",  coach:"20/session",cache:"Yes"},
                  {t:"Full Access",   chart:"∞ (fair-use)",journal:"∞",coach:"∞",          cache:"Yes"},
                  {t:"Lifetime",      chart:"∞ (fair-use)",journal:"∞",coach:"∞",          cache:"Yes"},
                ].map((r,i)=>(
                  <tr key={i}><td style={{ fontWeight:currentTier===Object.keys(TIERS)[i]?600:400,color:Object.values(TIERS)[i].color }}>{r.t}</td><td className="mn" style={{ fontSize:12 }}>{r.chart}</td><td className="mn" style={{ fontSize:12 }}>{r.journal}</td><td className="mn" style={{ fontSize:12 }}>{r.coach}</td><td className="mn" style={{ fontSize:12,color:C.accent }}>{r.cache}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:14,padding:"12px 16px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
            <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>AI cost protection: Identical chart submissions within 24h return cached analysis. Background behavioral metric recalculation is batched every 30 minutes. Fair-use cap applies to unlimited tiers at 50 chart analyses/24h.</div>
          </div>
        </div>
      )}

      {tab==="security" && (
        <div className="fi">
          <div className="mc" style={{ marginBottom:14 }}>
            <div className="sl">Account Credentials</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12 }}>
              <div><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>Email Address</label><input className="inp" defaultValue="j.harrison@email.com"/></div>
              <div><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>New Password</label><input className="inp" type="password" placeholder="••••••••"/></div>
            </div>
            <div style={{ marginTop:14 }}><button className="btn bp">Save Changes</button></div>
          </div>
          <div className="mc">
            <div className="sl">Data & Privacy</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["Journal data is stored server-side and never shared with third parties.","Downgrading preserves all data in read-only format.","Account deletion removes all data permanently after 30-day grace period.","AI analysis inputs are not used for model training."].map((t,i)=>(
                <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                  <IC n="check" s={11} c={C.accent}/>
                  <span style={{ fontSize:12,color:C.textMuted,lineHeight:1.7 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14 }}><button className="btn bg" style={{ borderColor:C.pinkDim,color:C.pink,fontSize:11 }}>Request Account Deletion</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Admin Page ────────────────────────────────────────────────────────────────
const Admin = ({ setPage }) => {
  const TIER_DIST = [{t:"Free",v:142,c:C.textMuted},{t:"Fortitude $45",v:78,c:C.accent},{t:"Pro $65",v:43,c:C.pink},{t:"Full $95",v:17,c:C.gold},{t:"Lifetime",v:4,c:C.pink}];
  const total = TIER_DIST.reduce((a,t)=>a+t.v,0);
  return (
    <div className="fi">
      <div style={{ marginBottom:22 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Administration</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Platform management, subscription oversight, and AI cost controls.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        {[{l:"Total Members",v:"284",s:"+12 this month",c:C.accent},{l:"Active Subscriptions",v:"142",s:"50% conversion",c:C.accent},{l:"MRR",v:"$9,840",s:"+$420 this month",c:C.gold},{l:"AI Calls Today",v:"347",s:"Within budget",c:C.accent},{l:"Flagged",v:"3",s:"Requires review",c:C.pink}].map(m=>(
          <div key={m.l} className="mc" style={{ borderColor:m.c==="C.pink"?C.pinkDim:undefined }}>
            <div className="sl">{m.l}</div>
            <div className="mn" style={{ fontSize:22,color:m.c,fontWeight:400 }}>{m.v}</div>
            <div style={{ fontSize:11,color:C.textDim,marginTop:2 }}>{m.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14 }}>
        {/* Tier distribution */}
        <div className="mc">
          <div className="sl">Subscription Distribution</div>
          {TIER_DIST.map(t=>(
            <div key={t.t} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
              <span style={{ fontSize:12,color:C.textMuted,width:100,flexShrink:0 }}>{t.t}</span>
              <div style={{ flex:1,height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
                <div style={{ width:`${(t.v/total)*100}%`,height:"100%",borderRadius:3,background:t.c,transition:"width .8s ease" }}/>
              </div>
              <span className="mn" style={{ fontSize:11,color:t.c,width:28,textAlign:"right" }}>{t.v}</span>
            </div>
          ))}
        </div>

        {/* AI cost controls */}
        <div className="mc">
          <div className="sl">AI Cost Protection Layer</div>
          {[
            {l:"Free tier",       cap:"Blocked",    used:"0",    c:C.textDim},
            {l:"Fortitude $45",   cap:"5/day",      used:"312",  c:C.accent},
            {l:"Fortitude Pro",   cap:"10/day",     used:"287",  c:C.pink},
            {l:"Full Access",     cap:"Fair-use",   used:"48",   c:C.gold},
            {l:"Cache hit rate",  cap:"—",          used:"34%",  c:C.accent},
          ].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12,color:C.textMuted }}>{r.l}</span>
              <div style={{ display:"flex",gap:16 }}>
                <span style={{ fontSize:11,color:C.textDim }}>{r.cap}</span>
                <span className="mn" style={{ fontSize:11,color:r.c }}>{r.used}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14 }}>
        <div>
          <div className="sl">Post Market Update</div>
          <div className="mc">
            <input className="inp" placeholder="Update title..." style={{ marginBottom:10 }}/>
            <textarea className="inp" placeholder="Market update content..." style={{ minHeight:70,resize:"vertical",fontFamily:"inherit",marginBottom:10 }}/>
            <button className="btn bp">Publish Update</button>
          </div>
        </div>
        <div>
          <div className="sl">Access Gate Override</div>
          <div className="mc">
            <div style={{ fontSize:12,color:C.textMuted,marginBottom:12 }}>Manual subscription override for specific users. Server-side enforcement applies regardless.</div>
            <input className="inp" placeholder="User email..." style={{ marginBottom:10 }}/>
            <select className="inp" style={{ marginBottom:10 }}>
              {Object.values(TIERS).map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <button className="btn bg" style={{ width:"100%" }}>Apply Override</button>
          </div>
        </div>
      </div>

      <div className="sl">Recent Activity</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <table>
          <thead><tr><th>User</th><th>Event</th><th>Tier</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[
              {u:"T.Adeyemi",  e:"Chart upload",    t:"45",  time:"09:12",s:"Analysed",tc:"ta"},
              {u:"K.Morrow",   e:"Coach session",   t:"65",  time:"09:28",s:"Complete", tc:"ta"},
              {u:"J.Ashford",  e:"Chart upload",    t:"45",  time:"10:01",s:"Flagged",  tc:"td"},
              {u:"M.Okafor",   e:"Tier upgrade",    t:"95",  time:"10:44",s:"$45→$95",  tc:"tg2"},
              {u:"P.Nkosi",    e:"Journal import",  t:"65",  time:"11:02",s:"Complete", tc:"ta"},
            ].map((r,i)=>(
              <tr key={i}>
                <td>{r.u}</td>
                <td style={{ color:C.text }}>{r.e}</td>
                <td><span className="tg ta" style={{ fontSize:9 }}>{TIERS[r.t]?.label||r.t}</span></td>
                <td className="mn" style={{ fontSize:11 }}>{r.time}</td>
                <td><span className={`tg ${r.tc}`}>{r.s}</span></td>
                <td><div style={{ display:"flex",gap:6 }}>
                  <button className="btn bg" style={{ padding:"3px 10px",fontSize:11 }}>View</button>
                  <button className="btn bg" style={{ padding:"3px 10px",fontSize:11,borderColor:C.pinkDim,color:C.pink }}>Flag</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Database schema reference */}
      <div style={{ marginTop:24 }}>
        <div className="sl">Database Schema Reference</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8 }}>
          {[
            { table:"users", fields:["id (uuid)","email","password_hash","role (user/admin)","membership_tier","subscription_status","created_at","updated_at"] },
            { table:"subscriptions", fields:["id","user_id","tier","stripe_subscription_id","start_date","end_date","status (active/cancelled/expired)"] },
            { table:"one_time_purchases", fields:["id","user_id","product_type (course/workshop/mentorship)","payment_id","purchase_date","active (boolean)"] },
            { table:"trades", fields:["id","user_id","instrument","direction","entry/exit_price","lot_size","net_pl","r_multiple","open_time","close_time","session_tag"] },
            { table:"performance_metrics", fields:["user_id","win_rate","expectancy","profit_factor","risk_consistency_score","revenge_score","fatigue_score","discipline_index","updated_at"] },
            { table:"ai_analysis_history", fields:["id","user_id","type (chart/journal/coach)","input_reference","output_text","created_at"] },
          ].map(s=>(
            <div key={s.table} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:6,padding:14,backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:10,fontWeight:700,color:C.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,fontFamily:"JetBrains Mono" }}>{s.table}</div>
              {s.fields.map(f=>(
                <div key={f} style={{ fontSize:11,color:C.textMuted,fontFamily:"JetBrains Mono",padding:"3px 0",borderBottom:`1px solid ${C.border}` }}>{f}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Backend enforcement rules */}
      <div style={{ marginTop:20 }}>
        <div className="sl">Backend Enforcement Rules</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8 }}>
          {[
            { tier:"Free",         color:C.textMuted, rules:["Block /api/journal endpoints","Block /api/ai/chart","Block /api/coach","Allow /api/education","Allow /api/auth"] },
            { tier:"$45 Fortitude",color:C.accent,    rules:["Allow /api/intelligence (5/day cap)","Block /api/journal","Block /api/coach","Allow /api/community","Stripe subscription validation on each request"] },
            { tier:"$65 Pro",      color:C.pink,   rules:["Allow /api/journal","Allow /api/coach","Allow /api/behavioral","AI cap: 10/day","Cache identical chart submissions 24h"] },
            { tier:"$95 / Lifetime",color:C.gold,     rules:["All endpoints unlocked","Fair-use cap: 50 chart analyses/24h","Background behavioral batching every 30min","Lifetime: bypass subscription validation entirely"] },
          ].map(r=>(
            <div key={r.tier} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${r.color}40`,borderRadius:6,padding:14,backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:11,fontWeight:600,color:r.color,letterSpacing:".06em",textTransform:"uppercase",marginBottom:10 }}>{r.tier}</div>
              {r.rules.map((rule,i)=>(
                <div key={i} style={{ display:"flex",gap:8,padding:"4px 0",borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:r.color,fontSize:10,marginTop:2 }}>›</span>
                  <span style={{ fontSize:11,color:C.textMuted,fontFamily:"JetBrains Mono" }}>{rule}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop:10,padding:"12px 16px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
          <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>
            <strong style={{ color:C.text }}>Enforcement principles:</strong> Server-side only — never rely on frontend gating as the sole control. Stripe webhooks validate subscription status on every premium API call. Downgrade takes effect end of billing period; features enter read-only state, no data deleted. Lifetime purchases bypass all subscription_status checks.
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL — subscription state + access enforcement
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [authed,    setAuthed]    = useState(false);
  const [page,      setPage]      = useState("dashboard");
  const [mobNavOpen, setMobNavOpen] = useState(false);
  useEffect(() => { 
    window.__fortitudeNav = setPage; 
    // Ensure viewport meta for proper mobile scaling
    let vp = document.querySelector('meta[name=viewport]');
    if(!vp){vp=document.createElement('meta');vp.name='viewport';document.head.appendChild(vp);}
    vp.content='width=device-width,initial-scale=1,viewport-fit=cover';
    return () => { delete window.__fortitudeNav; }; 
  }, []);
  const [tier,      setTier]      = useState("65");
  const [aiUsed,    setAiUsed]    = useState(2);
  const [subStatus, setSubStatus] = useState("active");

  // ── Set favicon dynamically from embedded icon ──────────────────────────────
  useEffect(() => {
    // Inject Counter-Strike font link into head
    if (!document.querySelector("link[data-fortitude-font]")) {
      const fontLink = document.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href = "https://fonts.cdnfonts.com/css/counter-strike";
      fontLink.setAttribute("data-fortitude-font", "1");
      document.head.insertBefore(fontLink, document.head.firstChild);
    }
    // Favicon + title
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = ICON_FAV;
    document.title = "Fortitude | Market Intelligence Platform";
  }, []);

  const NAV = [
    { id:"dashboard",   label:"Dashboard",              icon:"dashboard" },
    { id:"intelligence",label:"Market Intelligence",    icon:"intel" },
    { id:"journal",     label:"Performance Journal",    icon:"journal" },
    { id:"behavioral",  label:"Behavioral Intelligence",icon:"brain" },
    { id:"cognitive",   label:"Cognitive Intelligence", icon:"zap" },
    { id:"coach",       label:"Performance Coach",      icon:"coach" },
    { id:"education",   label:"Education",              icon:"edu" },
    { id:"calendar",    label:"Economic Calendar",      icon:"cal"  },
    { id:"community",   label:"Community",              icon:"comm" },
    { id:"pricing",     label:"Membership",             icon:"shield" },
    { id:"account",     label:"Account",                icon:"acct" },
    { id:"admin",       label:"Admin",                  icon:"admin" },
  ];

  const PAGES = {
    dashboard:   Dashboard,
    intelligence:Intelligence,
    journal:     Journal,
    behavioral:  BehavioralEngine,
    cognitive:   CognitiveIntelligence,
    coach:       Coach,
    education:   Education,
    calendar:    EconomicCalendar,
    community:   Community,
    pricing:     Pricing,
    account:     Account,
    admin:       Admin,
  };

  // ── Access enforcement per spec ──────────────────────────────────────────────
  // Rules:
  // 1. Lifetime overrides everything — always granted
  // 2. Free tier — only free-flagged features accessible
  // 3. Active subscription — access per tier matrix
  // 4. Expired/cancelled subscription — premium features frozen (read-only where data exists)
  // 5. Never delete user data on downgrade
  // 6. Account + pricing + education always accessible
  const ALWAYS_OPEN = new Set(["account","pricing","education"]);

  const renderPage = () => {
    // Admin is gated to admin role (production: server-side role check)
    if (page === "admin") {
      if (tier === "admin") {
        return <Admin setPage={setPage}/>;
      }
      return <GateWall feature="admin" currentTier={tier} setPage={setPage}/>;
    }
    // Always-accessible pages
    if (ALWAYS_OPEN.has(page)) {
      const P = PAGES[page];
      if (!P) return null;
      return <P currentTier={tier} setTier={setTier} setPage={setPage} aiUsed={aiUsed} subStatus={subStatus} setSubStatus={setSubStatus} onUpgrade={t=>{setTier(t);setSubStatus("active");}}/>;
    }
    // Expired subscription — data preserved, access frozen
    // Journal, coach, behavioral, cognitive: show read-only gate (data preserved message)
    // Other paid features: show reactivation gate
    if (subStatus !== "active" && tier !== "free") {
      const dataPreserved = new Set(["journal","behavioral","cognitive","coach"]);
      return <GateWall feature={page} currentTier={tier} setPage={setPage} readOnly={true} hasData={dataPreserved.has(page)}/>;
    }
    // Standard tier-based access check
    const rule = ACCESS[page];
    if (rule !== undefined) {
      const granted = canAccess(tier, page);
      if (!granted) {
        return <GateWall feature={page} currentTier={tier} setPage={setPage} readOnly={false}/>;
      }
    }
    const P = PAGES[page] || Dashboard;
    return <P setPage={setPage} currentTier={tier} aiUsed={aiUsed}/>;
  };

  if (!authed) return <><style>{STYLES}</style><Login onLogin={()=>setAuthed(true)}/></>;

  const currentTierMeta = TIERS[tier] || TIERS["65"];

  const MOB_NAV = [
    { id:"dashboard",   icon:"dashboard", label:"Home"     },
    { id:"intelligence",icon:"intel",     label:"Intel"    },
    { id:"calendar",    icon:"cal",       label:"Calendar" },
    { id:"journal",     icon:"journal",   label:"Journal"  },
    { id:"community",   icon:"comm",      label:"Chat"     },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <style>{`
        /* ── Default (desktop) ─────────────────────────────────── */
        .desk-sidebar{display:flex;flex-direction:column}
        .mob-topbar,.mob-bottomnav,.mob-spacer{display:none}

        /* ── Mobile breakpoint ─────────────────────────────────── */
        @media(max-width:768px){
          /* Structure */
          .desk-sidebar{display:none!important}
          .mob-topbar{display:flex!important}
          .mob-bottomnav{display:flex!important}
          .mob-spacer{display:block!important;height:calc(52px + env(safe-area-inset-top,0px));flex-shrink:0}
          .main-content{padding:12px 12px 72px!important;overflow-x:hidden}

          /* Grids — single column */
          .dash-grid,.analyses-grid,.community-grid{grid-template-columns:1fr!important;gap:10px!important}
          .session-grid{grid-template-columns:1fr!important;gap:8px!important}
          /* Grids — two column (compact) */
          .stats-grid{grid-template-columns:1fr 1fr!important;gap:8px!important}
          @media(max-width:340px){.stats-grid{grid-template-columns:1fr!important}}
          .pricing-grid{grid-template-columns:1fr 1fr!important;gap:8px!important}
          @media(max-width:400px){.pricing-grid{grid-template-columns:1fr!important}}
          .liq-grid{grid-template-columns:1fr 1fr!important;gap:8px!important}

          /* Hide elements that don't work on mobile */
          .dash-cal-mobile{display:none!important}
          .comm-sidebar{display:none!important}
          .mob-hide{display:none!important}

          /* Cards — tighter padding */
          .mc{padding:12px!important}

          /* Touch targets */
          .ni{min-height:44px!important;padding:10px 12px!important}
          .btn{min-height:44px!important;padding:10px 16px!important}
          input.inp,select.inp,textarea.inp{font-size:16px!important} /* prevent iOS zoom */

          /* Typography scale-down */
          .df-h1{font-size:20px!important;letter-spacing:.04em!important}
          .mob-fs12{font-size:12px!important}
          .sl{margin-bottom:8px!important}

          /* Tables — horizontal scroll */
          .mob-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
          table{min-width:480px}

          /* PDI banner — stack vertically */
          .pdi-banner{flex-direction:column!important;gap:10px!important;padding:12px!important}
          .pdi-banner .pdi-chevron{display:none!important}
          .pdi-meta-row{gap:8px!important;flex-wrap:wrap!important}

          /* Community rules banner — stack */
          .comm-rules{flex-direction:column!important;gap:6px!important;padding:10px 12px!important}
          .comm-rules-divider{display:none!important}

          /* Chat height on mobile */
          .community-chat-wrap{height:calc(100dvh - 200px)!important;max-height:none!important}

          /* Page header — remove clock widget on mobile */
          .dash-header-clock{display:none!important}
          /* Dash header stacking */
          .dash-header{margin-bottom:14px!important}
          .dash-header h1{font-size:20px!important;margin-bottom:3px!important}
          .dash-header p{font-size:12px!important}

          /* Journal tabs — full width */
          .journal-tabs button{padding:10px 14px!important;font-size:12px!important}

          /* Section gaps */
          .fi > *{margin-bottom:10px}

          /* Intelligence upload drop zone */
          .upload-zone{padding:32px 16px!important}

          /* Pricing: hide comparison table */
          .pricing-compare{display:none!important}
        }

        /* ── Always-on mobile chrome styles ──────────────────────── */
        .mob-topbar{
          position:fixed;top:0;left:0;right:0;height:52px;z-index:100;
          background:rgba(8,10,15,.98);border-bottom:1px solid ${C.border};
          align-items:center;justify-content:space-between;padding:0 14px;
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          padding-top:env(safe-area-inset-top,0px);
          height:calc(52px + env(safe-area-inset-top,0px));
        }
        .mob-bottomnav{
          position:fixed;bottom:0;left:0;right:0;height:58px;z-index:100;
          background:rgba(8,10,15,.98);border-top:1px solid ${C.border};
          align-items:stretch;
          backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
          padding-bottom:env(safe-area-inset-bottom,0px);
        }
        .mob-navitem{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:3px;padding:6px 4px;cursor:pointer;flex:1;min-width:0;
          color:${C.textDim};font-size:9px;letter-spacing:.03em;text-transform:uppercase;
          transition:color .15s;-webkit-tap-highlight-color:transparent;
          border-top:2px solid transparent;transition:all .15s;
        }
        .mob-navitem.mob-active{color:${C.accent};border-top-color:${C.accent}}
        .mob-navitem span{
          overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
          max-width:100%;text-align:center;
        }

        /* Drawer */
        .mob-drawer{position:fixed;inset:0;z-index:200;display:flex}
        .mob-overlay{position:absolute;inset:0;background:rgba(4,6,12,.9)}
        .mob-panel{
          position:relative;width:272px;max-width:85vw;height:100%;overflow-y:auto;
          background:rgba(8,10,15,.99);border-right:1px solid ${C.border};
          display:flex;flex-direction:column;padding:0;
          backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
          animation:slideLeft .22s cubic-bezier(.25,.46,.45,.94);
        }
        .mob-panel-inner{padding:20px 10px;flex:1;display:flex;flex-direction:column}
        @keyframes slideLeft{from{transform:translateX(-100%)}to{transform:translateX(0)}}

        /* Safe area insets for notched phones */
        @supports(padding:max(0px)){
          .mob-topbar{padding-left:max(14px,env(safe-area-inset-left));padding-right:max(14px,env(safe-area-inset-right))}
          .main-content{padding-left:max(12px,env(safe-area-inset-left))!important;padding-right:max(12px,env(safe-area-inset-right))!important}
        }
      `}</style>

      <div style={{ display:"flex",minHeight:"100vh",position:"relative" }}>
        <BgSVG/>
        <div style={{ position:"fixed",inset:0,background:"rgba(6,8,16,.84)",zIndex:0,pointerEvents:"none" }}/>

        {/* Mobile top bar */}
        <div className="mob-topbar">
          <div style={{ display:"flex",alignItems:"center",gap:9 }}>
            <img src={ICON_NAV} alt="Fortitude" style={{ width:26,height:26,objectFit:"contain",filter:"drop-shadow(0 0 4px rgba(41,168,255,0.3))" }}/>
            <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:15,letterSpacing:".08em",color:C.text}}>FORTITUDE</div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ padding:"3px 8px",background:`${currentTierMeta.color}15`,borderRadius:4,border:`1px solid ${currentTierMeta.color}30` }}>
              <span style={{ fontSize:10,color:currentTierMeta.color,fontWeight:600 }}>{currentTierMeta.label}</span>
            </div>
            <div onClick={()=>setMobNavOpen(true)} style={{ cursor:"pointer",padding:"4px",WebkitTapHighlightColor:"transparent" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobNavOpen && (
          <div className="mob-drawer">
            <div className="mob-overlay" onClick={()=>setMobNavOpen(false)}/>
            <div className="mob-panel"><div className="mob-panel-inner" style={{ paddingTop:"max(20px,env(safe-area-inset-top))" }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,paddingBottom:14,borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <img src={ICON_NAV} alt="Fortitude" style={{ width:34,height:34,objectFit:"contain",filter:"drop-shadow(0 0 5px rgba(41,168,255,0.25))" }}/>
                  <div>
                    <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:17,letterSpacing:".08em",color:C.text}}>FORTITUDE</div>
                    <div style={{ fontSize:8,color:C.textMuted,letterSpacing:".14em",textTransform:"uppercase",marginTop:1 }}>Performance Operating System</div>
                  </div>
                </div>
                <div onClick={()=>setMobNavOpen(false)} style={{ color:C.textDim,fontSize:18,cursor:"pointer",padding:4,lineHeight:1 }}>✕</div>
              </div>
              <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:1 }}>
                {NAV.map(n => {
                  const granted = ACCESS[n.id]===undefined || canAccess(tier,n.id);
                  const isActive = page===n.id;
                  return (
                    <div key={n.id} className={`ni${isActive?" ac":""}`} style={{ opacity:granted?1:0.42 }}
                      onClick={()=>{ if(granted){ setPage(n.id); setMobNavOpen(false); } }}>
                      <IC n={n.icon} s={14}/>
                      <span style={{ flex:1 }}>{n.label}</span>
                      {!granted && <IC n="lock" s={10} c={C.textDim}/>}
                    </div>
                  );
                })}
              </nav>
              <div style={{ paddingTop:12,borderTop:`1px solid ${C.border}`,marginTop:8 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"5px 8px",background:`${currentTierMeta.color}10`,borderRadius:5,border:`1px solid ${currentTierMeta.color}30` }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:currentTierMeta.color }}/>
                  <span style={{ fontSize:11,color:currentTierMeta.color,fontWeight:600 }}>{currentTierMeta.label}</span>
                  {AI_CAPS[tier]<999 && <span className="mn" style={{ fontSize:10,color:C.textDim,marginLeft:"auto" }}>{aiUsed}/{AI_CAPS[tier]} AI</span>}
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:9 }}>
                  <div style={{ width:30,height:30,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontSize:13,color:C.accent,fontFamily:"Inter,sans-serif",fontWeight:700 }}>J</span>
                  </div>
                  <div>
                    <div style={{ fontSize:12,color:C.text,fontWeight:500 }}>J. Harrison</div>
                    <div style={{ fontSize:10,color:C.textDim }}>j.harrison@email.com</div>
                  </div>
                </div>
              </div>
            </div></div>
          </div>
        )}

        {/* Desktop sidebar */}
        <div className="desk-sidebar" style={{ width:240,background:"rgba(10,13,20,.93)",borderRight:`1px solid ${C.border}`,padding:"22px 10px",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto",zIndex:2,backdropFilter:"blur(16px)" }}>
          <div style={{ padding:"0 8px 20px",borderBottom:`1px solid ${C.border}`,marginBottom:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
              <img src={ICON_NAV} alt="Fortitude" style={{ width:40,height:40,objectFit:"contain",flexShrink:0,filter:"drop-shadow(0 0 5px rgba(41,168,255,0.25))" }}/>
              <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:22,fontWeight:300,letterSpacing:".08em",color:C.text}}>FORTITUDE</div>
            </div>
            <div style={{ fontSize:9,color:C.textMuted,letterSpacing:".16em",textTransform:"uppercase",marginTop:2,fontFamily:"'Inter',sans-serif",fontWeight:500 }}>Performance Operating System</div>
          </div>
          <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:1 }}>
            {NAV.map(n => {
              const granted = ACCESS[n.id]===undefined || canAccess(tier,n.id);
              const isActive = page===n.id;
              return (
                <div key={n.id} className={`ni${isActive?" ac":""}`} style={{ opacity:granted?1:0.42,position:"relative" }} onClick={()=>setPage(n.id)}>
                  <IC n={n.icon} s={14}/>
                  <span style={{ flex:1 }}>{n.label}</span>
                  {!granted && <IC n="lock" s={10} c={C.textDim}/>}
                </div>
              );
            })}
          </nav>
          <div style={{ paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:"6px 8px",background:`${currentTierMeta.color}10`,borderRadius:5,border:`1px solid ${currentTierMeta.color}30` }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:currentTierMeta.color }}/>
              <span style={{ fontSize:11,color:currentTierMeta.color,fontWeight:600 }}>{currentTierMeta.label}</span>
              {AI_CAPS[tier]<999 && <span className="mn" style={{ fontSize:10,color:C.textDim,marginLeft:"auto" }}>{aiUsed}/{AI_CAPS[tier]} AI</span>}
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:9 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <span style={{ fontSize:13,color:C.accent,fontFamily:"Inter,sans-serif",fontWeight:700 }}>J</span>
              </div>
              <div>
                <div style={{ fontSize:12,color:C.text,fontWeight:500 }}>J. Harrison</div>
                <div style={{ fontSize:10,color:C.textDim }}>j.harrison@email.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="main-content" style={{ flex:1,padding:"28px 32px",overflowY:"auto",overflowX:"hidden",position:"relative",zIndex:1,WebkitOverflowScrolling:"touch",overscrollBehavior:"contain" }}>
          <div className="mob-spacer" style={{ height:52 }}/>
          {page==="intelligence" && canAccess(tier,"intelligence") && (
            <div style={{ marginBottom:16 }}>
              <AIUsageMeter tier={tier} used={aiUsed} setPage={setPage}/>
            </div>
          )}
          {renderPage()}
        </main>

        {/* Mobile bottom nav */}
        <div className="mob-bottomnav">
          {MOB_NAV.map(n => {
            const granted = ACCESS[n.id]===undefined || canAccess(tier,n.id);
            return (
              <div key={n.id} className={`mob-navitem${page===n.id?" mob-active":""}`}
                style={{ opacity:granted?1:0.38 }}
                onClick={()=>granted&&setPage(n.id)}>
                <IC n={n.icon} s={20} c={page===n.id?C.accent:C.textDim}/>
                <span>{n.label}</span>
              </div>
            );
          })}
          <div className="mob-navitem" onClick={()=>setMobNavOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="1.6" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <span>More</span>
          </div>
        </div>

      </div>
    </>
  );
}
