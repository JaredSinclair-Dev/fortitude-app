import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#080a0f", surface: "#0d1018", surfaceAlt: "#111520",
  border: "#18202e", borderHover: "#243040",
  accent: "#29a8ff", accentDim: "#1a6ea8", accentGlow: "rgba(41,168,255,0.10)",
  pink: "#e91ea7", pinkDim: "#9c1470", pinkGlow: "rgba(233,30,167,0.09)",
  gold: "#d0d8e8", goldDim: "#6b7a8f", goldGlow: "rgba(208,216,232,0.07)",
  text: "#eef2f8", textMuted: "#d0dae8", textDim: "#a8b8cc",
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
  body{background:${C.bg};color:${C.text};font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
  .df{font-family:'Counter-Strike','Inter',sans-serif;letter-spacing:.06em;font-weight:400}
  .mn{font-family:'JetBrains Mono',monospace}
  @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pu{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes dr{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
  .fi{animation:fi .4s ease forwards}
  .pu{animation:pu 2s infinite}
  .ni{display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:6px;cursor:pointer;transition:all .2s;color:${C.textMuted};font-size:13px;font-weight:500;letter-spacing:.01em;border:1px solid transparent;white-space:nowrap;overflow:hidden}
  .ni:hover{background:${C.surfaceAlt};color:${C.text}}
  .ni.ac{background:${C.accentGlow};color:${C.accent};border-color:rgba(41,168,255,.2)}
  .mc{background:rgba(13,16,24,.82);border:1px solid ${C.border};border-radius:8px;padding:20px;transition:border-color .2s;backdrop-filter:blur(8px)}
  .mc:hover{border-color:rgba(41,168,255,.18)}
  .btn{padding:10px 20px;border-radius:5px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.06em;text-transform:uppercase;border:none;font-family:'Inter',sans-serif}
  .bp{background:${C.accent};color:${C.bg}}.bp:hover{background:#45baff}
  .bg{background:transparent;color:${C.textMuted};border:1px solid ${C.border}}.bg:hover{border-color:${C.accent};color:${C.accent};background:${C.accentGlow}}
  .tg{display:inline-flex;align-items:center;padding:3px 8px;border-radius:3px;font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase}
  .ta{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .td{background:${C.pinkGlow};color:${C.pink};border:1px solid rgba(233,30,167,.22)}
  .tg2{background:${C.goldGlow};color:${C.gold};border:1px solid rgba(208,216,232,.2)}
  .tb{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .sl{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${C.textDim};margin-bottom:12px}
  .inp{background:rgba(17,21,32,.85);border:1px solid ${C.border};color:${C.text};border-radius:5px;padding:10px 14px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;width:100%;backdrop-filter:blur(4px)}
  .inp:focus{border-color:${C.accent}}
  .inp option{background:${C.surfaceAlt}}
  .pb{height:3px;border-radius:2px;background:${C.border};overflow:hidden}
  .pf{height:100%;border-radius:2px;background:linear-gradient(90deg,${C.accent},${C.pink})}
  table{width:100%;border-collapse:collapse}
  th{text-align:left;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${C.textDim};padding:8px 12px;border-bottom:1px solid ${C.border}}
  td{padding:11px 12px;border-bottom:1px solid ${C.border};font-size:14px;color:${C.textMuted}}
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
    // ── Navigation ──────────────────────────────────────────────────────────
    dashboard:   <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    intel:       <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    edu:         <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    comm:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    acct:        <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    shield:      <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    admin:       <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 1 1-14.14 14.14A10 10 0 0 1 19.07 4.93z"/></>,
    journal:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    coach:       <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    cal:         <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    ref:         <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    quant:       <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    brain:       <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.96-3.1A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.96-3.1A2.5 2.5 0 0 0 14.5 2Z"/></>,
    zap:         <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    // ── Actions & UI ────────────────────────────────────────────────────────
    logout:      <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    send:        <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check:       <><polyline points="20 6 9 17 4 12"/></>,
    lock:        <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    unlock:      <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>,
    upload:      <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    download:    <><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/></>,
    search:      <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    filter:      <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    settings:    <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    close:       <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus:        <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus:       <><line x1="5" y1="12" x2="19" y2="12"/></>,
    chevron_r:   <><polyline points="9 18 15 12 9 6"/></>,
    chevron_d:   <><polyline points="6 9 12 15 18 9"/></>,
    arrow_r:     <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    arrow_up:    <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    arrow_dn:    <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    copy:        <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    external:    <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    refresh:     <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    bell:        <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    bell_off:    <><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/></>,
    eye:         <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    star:        <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    // ── Data / Charts ───────────────────────────────────────────────────────
    chart:       <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    bar_chart:   <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    pie_chart:   <><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></>,
    trend_up:    <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    trend_dn:    <><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></>,
    trend_flat:  <><line x1="22" y1="12" x2="2" y2="12"/><polyline points="16 6 22 12 16 18"/></>,
    activity:    <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    target:      <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    // ── Finance / Markets ────────────────────────────────────────────────────
    dollar:      <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    gold:        <><circle cx="12" cy="12" r="8"/><path d="M12 4v16M8 8h8M8 16h8"/></>,
    oil:         <><path d="M3 6l3-3 4 4 4-4 3 3"/><path d="M3 18c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V8H3v10z"/></>,
    bond:        <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    crypto:      <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5"/><path d="M12 4.5A2.5 2.5 0 0 1 14.5 2"/><path d="M14.5 2c1.38 0 2.5 1.12 2.5 2.5v1"/><path d="M17 5.5c0 1.38-1.12 2.5-2.5 2.5"/><rect x="6" y="8" width="12" height="12" rx="2"/><path d="M9 14h6M9 11h4"/></>,
    indices:     <><path d="M3 3h18v18H3z" rx="2"/><path d="M8 17l4-8 4 8"/><path d="M10 13h4"/></>,
    fx:          <><circle cx="9" cy="9" r="6"/><circle cx="15" cy="15" r="6"/></>,
    // ── Macro / Events ──────────────────────────────────────────────────────
    bank:        <><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></>,
    inflation:   <><path d="M2 20h20"/><path d="M5 20V10l7-7 7 7v10"/><path d="M9 20v-5h6v5"/></>,
    employment:  <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    gdp:         <><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 17V9l5 5 5-9"/></>,
    geopolitical:<><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    war:         <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
    energy:      <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    fiscal:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    trade:       <><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
    regulation:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    // ── Status / Indicators ─────────────────────────────────────────────────
    alert:       <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    warning:     <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info:        <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    success:     <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    breaking:    <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    confirmed:   <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    developing:  <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    conflicting: <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    live:        <><circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4"/><path d="M17.7 6.3a8 8 0 0 1 0 11.4"/><path d="M3.5 3.5a13 13 0 0 0 0 17"/><path d="M20.5 3.5a13 13 0 0 1 0 17"/></>,
    // ── Regime / Market state ───────────────────────────────────────────────
    risk_on:     <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    risk_off:    <><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></>,
    inflation_r: <><path d="M2 20h20M5 20V10l7-7 7 7v10M9 20v-5h6v5"/></>,
    deflation_r: <><path d="M2 4h20M5 4v10l7 7 7-7V4M9 14v5h6v-5"/></>,
    // ── QRA specific ────────────────────────────────────────────────────────
    impact:      <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1" fill="currentColor"/></>,
    confidence:  <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    urgency:     <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    what:        <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    why:         <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>,
    immediate:   <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    secondary:   <><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></>,
    watch:       <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    invalidate:  <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    forward:     <><circle cx="12" cy="12" r="10"/><polyline points="12 8 16 12 12 16"/><line x1="8" y1="12" x2="16" y2="12"/></>,
    ai:          <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.96-3.1A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.96-3.1A2.5 2.5 0 0 0 14.5 2Z"/></>,
    narrative:   <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    heatmap:     <><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></>,
    feed:        <><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1" fill="currentColor"/></>,
    report:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    morning:     <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    weekly:      <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    trader:      <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,
    investor:    <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></>,
    // ── Misc ────────────────────────────────────────────────────────────────
    trend:       <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    cal_check:   <><path d="M21 10H3M16 2v4M8 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="m9 16 2 2 4-4"/></>,
    globe:       <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    news:        <><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/></>,
    broker:      <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[n] || p.alert}</svg>;
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

// ── API Client ────────────────────────────────────────────────────────────────
const API_BASE = "https://fortitude-backend-production-4ca8.up.railway.app/api/v1";
const api = {
  async post(path, body, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST", headers, credentials: "include",
      body: JSON.stringify(body),
    });
    return res.json();
  },
  async put(path, body, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method: "PUT", headers, credentials: "include",
      body: JSON.stringify(body),
    });
    return res.json();
  },
  async get(path, token = null) {
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { headers, credentials: "include" });
    return res.json();
  },
  async del(path, token = null) {
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { method: "DELETE", headers, credentials: "include" });
    return res.json();
  },
};
const mapTier = (t) => ({ free:"free", core_45:"45", pro_65:"65", elite_95:"95", lifetime:"lifetime" }[t] || "free");
const isOwnerEmail = (email) => email === "jared@fortitude.trade" || email === "deacon@fortitude.trade";

// ── Country dial codes (top trading nations + comprehensive list) ─────────────
const DIAL_CODES = [
  { code:"ZA", name:"South Africa",     dial:"+27"  },
  { code:"US", name:"United States",    dial:"+1"   },
  { code:"GB", name:"United Kingdom",   dial:"+44"  },
  { code:"AU", name:"Australia",        dial:"+61"  },
  { code:"CA", name:"Canada",           dial:"+1"   },
  { code:"NG", name:"Nigeria",          dial:"+234" },
  { code:"KE", name:"Kenya",            dial:"+254" },
  { code:"GH", name:"Ghana",            dial:"+233" },
  { code:"AE", name:"UAE",              dial:"+971" },
  { code:"SG", name:"Singapore",        dial:"+65"  },
  { code:"NZ", name:"New Zealand",      dial:"+64"  },
  { code:"DE", name:"Germany",          dial:"+49"  },
  { code:"FR", name:"France",           dial:"+33"  },
  { code:"NL", name:"Netherlands",      dial:"+31"  },
  { code:"CH", name:"Switzerland",      dial:"+41"  },
  { code:"JP", name:"Japan",            dial:"+81"  },
  { code:"IN", name:"India",            dial:"+91"  },
  { code:"BR", name:"Brazil",           dial:"+55"  },
  { code:"MX", name:"Mexico",           dial:"+52"  },
  { code:"ZW", name:"Zimbabwe",         dial:"+263" },
  { code:"ZM", name:"Zambia",           dial:"+260" },
  { code:"UG", name:"Uganda",           dial:"+256" },
  { code:"TZ", name:"Tanzania",         dial:"+255" },
  { code:"MY", name:"Malaysia",         dial:"+60"  },
  { code:"PH", name:"Philippines",      dial:"+63"  },
  { code:"PK", name:"Pakistan",         dial:"+92"  },
  { code:"EG", name:"Egypt",            dial:"+20"  },
  { code:"MA", name:"Morocco",          dial:"+212" },
  { code:"ES", name:"Spain",            dial:"+34"  },
  { code:"IT", name:"Italy",            dial:"+39"  },
  { code:"SE", name:"Sweden",           dial:"+46"  },
  { code:"NO", name:"Norway",           dial:"+47"  },
  { code:"DK", name:"Denmark",          dial:"+45"  },
  { code:"IL", name:"Israel",           dial:"+972" },
  { code:"TR", name:"Turkey",           dial:"+90"  },
  { code:"OM", name:"Oman",             dial:"+968" },
  { code:"QA", name:"Qatar",            dial:"+974" },
  { code:"SA", name:"Saudi Arabia",     dial:"+966" },
  { code:"HK", name:"Hong Kong",        dial:"+852" },
  { code:"ID", name:"Indonesia",        dial:"+62"  },
  { code:"TH", name:"Thailand",         dial:"+66"  },
  { code:"VN", name:"Vietnam",          dial:"+84"  },
  { code:"AR", name:"Argentina",        dial:"+54"  },
  { code:"CO", name:"Colombia",         dial:"+57"  },
  { code:"CL", name:"Chile",            dial:"+56"  },
  { code:"RU", name:"Russia",           dial:"+7"   },
  { code:"PL", name:"Poland",           dial:"+48"  },
  { code:"PT", name:"Portugal",         dial:"+351" },
  { code:"IE", name:"Ireland",          dial:"+353" },
  { code:"BE", name:"Belgium",          dial:"+32"  },
  { code:"AT", name:"Austria",          dial:"+43"  },
  { code:"OTHER", name:"Other",         dial:""     },
];

// ── Country dial codes (top trading nations + comprehensive list) ─────────────


const Login = ({ onLogin }) => {
  const [mode,      setMode]      = useState("login"); // login | register
  const [step,      setStep]      = useState(1);       // register step 1 or 2
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  // Login fields
  const [email,     setEmail]     = useState("");
  const [pass,      setPass]      = useState("");

  // Register step 1
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [regEmail,  setRegEmail]  = useState("");
  const [regPass,   setRegPass]   = useState("");

  // Register step 2
  const [phone,     setPhone]     = useState("");
  const [dialCode,  setDialCode]  = useState(DIAL_CODES[0]);
  const [country,   setCountry]   = useState(DIAL_CODES[0]);
  const [geoLoaded, setGeoLoaded] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Auto-detect country from IP on mount
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(d => {
        const found = DIAL_CODES.find(c => c.code === d.country_code);
        if (found) { setDialCode(found); setCountry(found); }
        setGeoLoaded(true);
      })
      .catch(() => setGeoLoaded(true));
  }, []);

  const switchMode = (m) => { setMode(m); setStep(1); setError(""); };

  const handleLogin = async () => {
    if (!email || !pass) { setError("Please enter your email and password."); return; }
    // Demo bypass for preview/testing
    if (email.toLowerCase() === "fort" && pass === "Fort") {
      onLogin({ token: "demo-token", user: { id:"demo", email:"demo@fortitude.trade", first_name:"Fortitude", last_name:"Demo", membership_tier:"elite_95", subscription_status:"active", role:"admin" } });
      return;
    }
    setError(""); setLoading(true);
    try {
      const data = await api.post("/auth/login", { email, password: pass });
      if (data.success) {
        localStorage.setItem("fis_token", data.data.accessToken);
        localStorage.setItem("fis_user", JSON.stringify(data.data.user));
        onLogin({ token: data.data.accessToken, user: data.data.user });
      } else {
        setError(data.error?.message || "Invalid email or password.");
      }
    } catch { setError("Unable to connect. Please try again."); }
    finally { setLoading(false); }
  };

  const handleStep1 = () => {
    if (!firstName.trim()) { setError("Please enter your first name."); return; }
    if (!lastName.trim())  { setError("Please enter your last name."); return; }
    if (!regEmail.trim())  { setError("Please enter your email address."); return; }
    if (!regPass || regPass.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (!/[A-Z]/.test(regPass)) { setError("Password must contain at least one uppercase letter."); return; }
    if (!/[0-9]/.test(regPass)) { setError("Password must contain at least one number."); return; }
    setError("");
    setStep(2);
  };

  const handleRegister = async () => {
    setError(""); setLoading(true);
    try {
      const fullPhone = phone ? `${dialCode.dial}${phone.replace(/^0+/, "")}` : "";
      const regData = await api.post("/auth/register", {
        email:        regEmail,
        password:     regPass,
        first_name:   firstName.trim(),
        last_name:    lastName.trim(),
        phone:        fullPhone || null,
        country:      country.name,
        country_code: country.code,
        dialing_code: dialCode.dial,
        source:       "web",
      });
      if (regData.success) {
        // Auto-login immediately after registration
        const loginData = await api.post("/auth/login", { email: regEmail, password: regPass });
        if (loginData.success) {
          localStorage.setItem("fis_token", loginData.data.accessToken);
          localStorage.setItem("fis_user", JSON.stringify(loginData.data.user));
          onLogin({ token: loginData.data.accessToken, user: loginData.data.user });
        } else {
          setError("Account created! Please sign in.");
          switchMode("login");
        }
      } else {
        setError(regData.error?.message || "Something went wrong. Please try again.");
        setStep(1);
      }
    } catch (err) { setError(err?.message || "Unable to connect. Please try again."); setStep(1); }
    finally { setLoading(false); }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) { setError("Please enter your email address first."); return; }
    setError(""); setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setForgotSent(true);
    } catch { setError("Unable to send reset email. Please try again."); }
    finally { setLoading(false); }
  };

  const INP = { className:"inp", style:{ width:"100%" } };
  const LBL = { style:{ fontSize:11, color:"#7a8fa8", display:"block", marginBottom:5, letterSpacing:".06em", textTransform:"uppercase" } };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
      <BgSVG/>
      <div style={{ position:"absolute", inset:0, background:"rgba(6,8,16,.78)" }}/>
      <div className="fi" style={{ position:"relative", zIndex:1, width:"min(420px,94vw)", padding:"clamp(24px,5vw,40px)", background:"rgba(13,16,24,.93)", border:`1px solid #18202e`, borderRadius:10, backdropFilter:"blur(16px)", boxShadow:"0 0 60px rgba(41,168,255,.07)" }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:8 }}>
            <img src={ICON_LOGIN} alt="Fortitude" style={{ width:48, height:48, objectFit:"contain", filter:"drop-shadow(0 0 7px rgba(41,168,255,0.32))" }}/>
            <div className="df" style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:32, fontWeight:300, letterSpacing:".06em", color:"#dce6f5" }}>FORTITUDE</div>
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"#7a8fa8", letterSpacing:".18em", textTransform:"uppercase", fontWeight:500 }}>Market Intelligence Platform</div>
        </div>

        {/* Mode tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid #18202e`, marginBottom:24 }}>
          {["login","register"].map(m => (
            <div key={m} onClick={() => switchMode(m)} style={{ flex:1, textAlign:"center", padding:"9px 0", fontSize:12, fontWeight:500, cursor:"pointer", color:mode===m?"#29a8ff":"#7a8fa8", borderBottom:`2px solid ${mode===m?"#29a8ff":"transparent"}`, transition:"all .2s", marginBottom:-1, textTransform:"capitalize", letterSpacing:".04em" }}>
              {m === "login" ? "Sign In" : "Create Account"}
            </div>
          ))}
        </div>

        {/* Error */}
        {error && <div style={{ marginBottom:16, padding:"10px 14px", background:"rgba(233,30,167,.08)", border:`1px solid #e91ea7`, borderRadius:6, fontSize:12, color:"#e91ea7" }}>{error}</div>}

        {/* ── FORGOT PASSWORD FORM ──────────────────────────────────────── */}
        {mode === "login" && forgotMode && !forgotSent && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ padding:"10px 14px", background:"rgba(41,168,255,.05)", border:"1px solid rgba(41,168,255,.15)", borderRadius:6, fontSize:12, color:"#b8c8d8", lineHeight:1.7 }}>
              Enter your email address and we'll send you a link to reset your password.
            </div>
            <div><label style={{ fontSize:11, color:"#7a8fa8", display:"block", marginBottom:5, letterSpacing:".06em", textTransform:"uppercase" }}>Email Address</label>
              <input className="inp" style={{ width:"100%" }} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key==="Enter" && handleForgotPassword()}/>
            </div>
            <button className="btn bp" style={{ width:"100%", padding:12, opacity:loading ? .6 : 1 }} onClick={handleForgotPassword} disabled={loading}>
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
            <div style={{ textAlign:"center" }}>
              <span style={{ fontSize:12, color:"#29a8ff", cursor:"pointer" }} onClick={() => { setForgotMode(false); setError(""); }}>← Back to Sign In</span>
            </div>
          </div>
        )}

        {mode === "login" && forgotMode && forgotSent && (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ padding:"16px", background:"rgba(41,168,255,.06)", border:"1px solid rgba(41,168,255,.2)", borderRadius:8, textAlign:"center" }}>
              <div style={{ marginBottom:10, display:"flex", justifyContent:"center" }}><IC n="report" s={28} c={C.accent}/></div>
              <div style={{ fontSize:14, color:"#dce6f5", fontWeight:500, marginBottom:6 }}>Check your inbox</div>
              <div style={{ fontSize:12, color:"#b8c8d8", lineHeight:1.7 }}>If an account exists for <strong style={{ color:"#29a8ff" }}>{email}</strong>, a password reset link has been sent.</div>
            </div>
            <button className="btn bg" style={{ width:"100%", padding:11 }} onClick={() => { setForgotMode(false); setForgotSent(false); setError(""); }}>← Back to Sign In</button>
          </div>
        )}

        {/* ── LOGIN FORM ─────────────────────────────────────────────────── */}
        {mode === "login" && !forgotMode && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div><label {...LBL}>Email Address</label><input {...INP} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}/></div>
            <div><label {...LBL}>Password</label><input {...INP} type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key==="Enter" && handleLogin()}/></div>
            <button className="btn bp" style={{ width:"100%", padding:12, marginTop:4, opacity:loading ? .6 : 1 }} onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in…" : "Access Platform"}
            </button>
            <div style={{ textAlign:"center", marginTop:4 }}>
              <span style={{ fontSize:12, color:"#29a8ff", cursor:"pointer" }} onClick={() => { setForgotMode(true); setError(""); setForgotSent(false); }}>Forgot password?</span>
            </div>
          </div>
        )}

        {/* ── REGISTER STEP 1: Name + Credentials ────────────────────────── */}
        {mode === "register" && step === 1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label {...LBL}>First Name</label><input {...INP} type="text" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)}/></div>
              <div><label {...LBL}>Last Name</label><input {...INP} type="text" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)}/></div>
            </div>
            <div><label {...LBL}>Email Address</label><input {...INP} type="email" placeholder="you@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)}/></div>
            <div>
              <label {...LBL}>Password</label>
              <input {...INP} type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" value={regPass} onChange={e => setRegPass(e.target.value)} onKeyDown={e => e.key==="Enter" && handleStep1()}/>
              {regPass && (
                <div style={{ display:"flex", gap:8, marginTop:6 }}>
                  {[["8+ chars", regPass.length>=8], ["Uppercase", /[A-Z]/.test(regPass)], ["Number", /[0-9]/.test(regPass)]].map(([l,ok]) => (
                    <span key={l} style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:ok?"rgba(41,168,255,.1)":"rgba(255,255,255,.04)", color:ok?"#29a8ff":"#7a8fa8", border:`1px solid ${ok?"rgba(41,168,255,.3)":"#18202e"}` }}>{ok?"✓":""} {l}</span>
                  ))}
                </div>
              )}
            </div>
            <button className="btn bp" style={{ width:"100%", padding:12, marginTop:4 }} onClick={handleStep1}>Continue →</button>
            <div style={{ textAlign:"center", fontSize:11, color:"#7a8fa8" }}>Step 1 of 2 — Account credentials</div>
          </div>
        )}

        {/* ── REGISTER STEP 2: Phone + Country ───────────────────────────── */}
        {mode === "register" && step === 2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ padding:"10px 14px", background:"rgba(41,168,255,.05)", border:`1px solid rgba(41,168,255,.15)`, borderRadius:6, fontSize:12, color:"#b8c8d8" }}>
              Creating account for <strong style={{ color:"#dce6f5" }}>{firstName} {lastName}</strong> — <span style={{ color:"#29a8ff" }}>{regEmail}</span>
            </div>

            {/* Phone */}
            <div>
              <label {...LBL}>Phone Number <span style={{ color:"#7a8fa8", textTransform:"none", letterSpacing:0 }}>(optional)</span></label>
              <div style={{ display:"flex", gap:8 }}>
                <select className="inp" style={{ width:110, flexShrink:0 }} value={dialCode.code} onChange={e => setDialCode(DIAL_CODES.find(d => d.code===e.target.value) || DIAL_CODES[0])}>
                  {DIAL_CODES.filter(d=>d.dial).map(d => (
                    <option key={d.code} value={d.code}>{d.dial} {d.code}</option>
                  ))}
                </select>
                <input className="inp" style={{ flex:1 }} type="tel" placeholder="Phone number" value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d\s\-]/g,""))}/>
              </div>
            </div>

            {/* Country */}
            <div>
              <label {...LBL}>Country {!geoLoaded && <span style={{ color:"#29a8ff" }}>— detecting…</span>}</label>
              <select className="inp" style={{ width:"100%" }} value={country.code} onChange={e => setCountry(DIAL_CODES.find(d => d.code===e.target.value) || DIAL_CODES[0])}>
                {DIAL_CODES.map(d => (
                  <option key={d.code} value={d.code}>{d.name}</option>
                ))}
              </select>
              {geoLoaded && country.code !== "OTHER" && (
                <div style={{ fontSize:11, color:"#29a8ff", marginTop:5 }}>✓ Location auto-detected — change if incorrect</div>
              )}
            </div>

            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              <button className="btn bg" style={{ flex:1, padding:11 }} onClick={() => { setStep(1); setError(""); }}>← Back</button>
              <button className="btn bp" style={{ flex:2, padding:11, opacity:loading ? .6 : 1 }} onClick={handleRegister} disabled={loading}>
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </div>
            <div style={{ textAlign:"center", fontSize:11, color:"#7a8fa8" }}>Step 2 of 2 — Contact details</div>
          </div>
        )}

        <div style={{ marginTop:20, padding:"10px 14px", background:"rgba(13,16,24,.6)", borderRadius:6, border:`1px solid #18202e` }}>
          <p style={{ fontSize:11, color:"#7a8fa8", textAlign:"center", lineHeight:1.7, margin:0 }}>Fortitude is an educational platform. Content does not constitute financial advice.</p>
        </div>
      </div>
    </div>
  );


};


// ── TradingView Economic Calendar Widget ──────────────────────────────────────
const TVCalendarWidget = ({ height = 650 }) => {
  const container = useRef();
  useEffect(() => {
    if (!container.current) return;
    // Clear previous instance to prevent duplicates on re-render
    container.current.innerHTML = '<div class="tradingview-widget-container__widget" style="width:100%;height:100%"></div>';
    const config = {
      colorTheme: "dark",
      isTransparent: true,
      width: "100%",
      height: height,
      locale: "en",
      importanceFilter: "-1,0,1",
      countryFilter: "us,eu,gb,jp,cn,au,ca,ch,nz",
    };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.current.appendChild(script);
    return () => { if (container.current) container.current.innerHTML = ""; };
  }, [height]);
  return (
    <div className="tradingview-widget-container" ref={container} style={{ width:"100%", minHeight:height, borderRadius:8, overflow:"hidden" }}/>
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


const TRADE_DATA = [];

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

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL MARKET PULSE — Trading Session Map
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL MARKET PULSE — Interactive World Map + Sessions + Intelligence
// ═══════════════════════════════════════════════════════════════════════════════
const MOCK_CONNECTIONS = [];

const MOCK_SYNCED_TRADES = [];

// Key macro events shown on the Global Market Pulse map
const MAP_EVENTS = [
  {lbl:"Federal Reserve",  type:"Monetary Policy", imp:9, desc:"Higher for longer confirmed. USD supported. Rate cuts deferred to Q3+."},
  {lbl:"Bank of Japan",    type:"Monetary Policy", imp:8, desc:"Policy normalisation accelerating. Carry trade unwind risk elevated."},
  {lbl:"ECB Frankfurt",    type:"Monetary Policy", imp:7, desc:"Rate path uncertain. Incoming data will drive the next move."},
  {lbl:"US CPI Release",   type:"Inflation Data",  imp:8, desc:"Below consensus — disinflation intact. Dovish repricing underway."},
  {lbl:"Red Sea Tensions", type:"Geopolitical",    imp:8, desc:"12% of global trade rerouted. Shipping costs elevated. Oil +3.8%."},
  {lbl:"IMF Warning",      type:"Economic Data",   imp:7, desc:"Global growth cut to 2.7%. Stagflation risk flagged for first time since 2022."},
  {lbl:"OPEC+ Dubai",      type:"Energy",          imp:7, desc:"Output unchanged. Geopolitical premium supporting crude near $85/bbl."},
];


const GlobalMarketPulse = () => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const frameRef  = useRef(0);
  const rotRef    = useRef([-15, -18]);
  const worldRef  = useRef(null);
  const hovRef    = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [now,     setNow]     = useState(new Date());
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const utc   = now.getUTCHours() + now.getUTCMinutes()/60 + now.getUTCSeconds()/3600;
  const dayN  = now.getUTCDay();
  const fxWknd = dayN===6 || (dayN===0 && utc<22) || (dayN===5 && utc>=22);

  const MARKETS = [
    { id:"tokyo",   name:"Tokyo",    lat:35.68, lng:139.69, tz:"Asia/Tokyo",       open:0,    close:9,   openCol:"#29a8ff", closedCol:"#e91ea7" },
    { id:"london",  name:"London",   lat:51.51, lng:-0.13,  tz:"Europe/London",    open:7,    close:16,  openCol:"#29a8ff", closedCol:"#e91ea7" },
    { id:"newyork", name:"New York", lat:40.71, lng:-74.01, tz:"America/New_York", open:13.5, close:20,  openCol:"#29a8ff", closedCol:"#e91ea7" },
  ];

  const fmt    = tz => { try { return new Intl.DateTimeFormat("en-GB",{timeZone:tz,hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date()); } catch { return "--:--:--"; } };
  const fmtSec = sec => { const a=Math.abs(sec),h=Math.floor(a/3600),m=Math.floor((a%3600)/60),s=String(Math.floor(a%60)).padStart(2,"0"); return h>0?`${h}h ${m}m`:`${m}m ${s}s`; };
  const mktOpen = m => !fxWknd && utc>=m.open && utc<m.close;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const loadScript = (src, cb) => {
      if (document.querySelector(`script[src="${src}"]`)) { cb(); return; }
      const s = document.createElement("script"); s.src=src; s.onload=cb; document.head.appendChild(s);
    };
    const startDraw = () => {
      if (!window.d3||!window.topojson) return;
      window.d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(w => {
        worldRef.current = w; setLoaded(true);
        const draw = () => {
          const cv = canvasRef.current; if (!cv) return;
          const ctx = cv.getContext("2d");
          const W = cv.width, H = cv.height;
          const f = ++frameRef.current;
          const rot = rotRef.current;
          rot[0] += 0.008;
          const R  = Math.min(W, H) * 0.46;
          const cx = W/2, cy = H/2;
          const proj = window.d3.geoOrthographic().scale(R).translate([cx,cy]).rotate(rot).clipAngle(90);
          const path = window.d3.geoPath().context(ctx).projection(proj);

          ctx.clearRect(0,0,W,H);

          // Ocean
          const ocean = ctx.createRadialGradient(cx,cy,0,cx,cy,R);
          ocean.addColorStop(0,"#0a1628"); ocean.addColorStop(.7,"#060e1c"); ocean.addColorStop(1,"#030810");
          ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fillStyle=ocean; ctx.fill();

          // Graticule
          ctx.beginPath(); path(window.d3.geoGraticule().step([30,30])());
          ctx.strokeStyle="rgba(41,168,255,0.04)"; ctx.lineWidth=.4; ctx.stroke();

          const wd = worldRef.current;
          if (wd) {
            const land = window.topojson.feature(wd, wd.objects.countries);
            ctx.beginPath(); path(land); ctx.fillStyle="#0f1d30"; ctx.fill();

            // Day/night
            const nowD=new Date(), utcD=nowD.getUTCHours()+nowD.getUTCMinutes()/60;
            const doy=Math.floor((nowD-new Date(nowD.getFullYear(),0,0))/864e5);
            const decl=-23.45*Math.cos((360/365)*(doy+10)*Math.PI/180)*Math.PI/180;
            const snLng=-(utcD-12)*15;
            const nPts=[];
            for(let la=-88;la<=88;la+=2){const laR=la*Math.PI/180,dn=Math.cos(laR)*Math.cos(decl);if(Math.abs(dn)<.001)continue;const cosH=-(Math.sin(laR)*Math.sin(decl))/dn;if(Math.abs(cosH)>1)continue;nPts.push([snLng-Math.acos(cosH)*180/Math.PI,la]);}
            if(nPts.length>4){const nGeo={type:"Polygon",coordinates:[[...nPts,[snLng-180,-90],[snLng+180,-90],[snLng+180,90],[snLng-180,90],nPts[0]]]};ctx.beginPath();path({type:"Feature",geometry:nGeo});ctx.fillStyle="rgba(0,3,12,0.48)";ctx.fill();}

            ctx.beginPath(); path(window.topojson.mesh(wd,wd.objects.countries,(a,b)=>a!==b));
            ctx.strokeStyle="rgba(41,168,255,0.08)"; ctx.lineWidth=.3; ctx.stroke();
            ctx.beginPath(); path(land); ctx.strokeStyle="rgba(41,168,255,0.18)"; ctx.lineWidth=.5; ctx.stroke();
          }

          // Globe rim + specular
          ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.strokeStyle="rgba(41,168,255,0.12)"; ctx.lineWidth=1; ctx.stroke();
          const spec=ctx.createRadialGradient(cx-R*.28,cy-R*.25,0,cx-R*.28,cy-R*.25,R*.5);
          spec.addColorStop(0,"rgba(255,255,255,0.04)"); spec.addColorStop(1,"transparent");
          ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fillStyle=spec; ctx.fill();

          // Three market dots
          const isVis=(la,lo)=>{const[rx,ry]=rot,lat1=ry*Math.PI/180,lon1=rx*Math.PI/180,lat2=la*Math.PI/180,lon2=lo*Math.PI/180;return Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1+Math.PI)<0;};
          const nowU=new Date(),utcU=nowU.getUTCHours()+nowU.getUTCMinutes()/60,dayU=nowU.getUTCDay(),wkU=dayU===6||(dayU===0&&utcU<22)||(dayU===5&&utcU>=22);

          MARKETS.forEach((m,mi) => {
            if (!isVis(m.lat,m.lng)) return;
            const p=proj([m.lng,m.lat]); if(!p) return;
            const open=!wkU&&utcU>=m.open&&utcU<m.close;
            const col=open?m.openCol:m.closedCol;
            const hov=hovRef.current?.id===m.id;

            // Glow when open
            if (open) {
              const glow=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],30);
              glow.addColorStop(0,"rgba(41,168,255,0.14)"); glow.addColorStop(1,"transparent");
              ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(p[0],p[1],30,0,Math.PI*2); ctx.fill();
            }

            // Pulse ring
            const pulse=open?0.45+0.35*Math.sin(f*0.06+mi*2.1):0.15;
            const pulseR=open?11+4*Math.sin(f*0.06+mi*2.1):9;
            ctx.beginPath(); ctx.arc(p[0],p[1],pulseR,0,Math.PI*2);
            ctx.strokeStyle=open?`rgba(41,168,255,${pulse})`:`rgba(233,30,167,${pulse})`;
            ctx.lineWidth=1; ctx.stroke();

            // Core dot
            ctx.beginPath(); ctx.arc(p[0],p[1],4,0,Math.PI*2); ctx.fillStyle=col; ctx.fill();

            // City label + status — always visible
            ctx.font=`600 ${hov?11:10}px Inter,sans-serif`;
            ctx.fillStyle=open?"#eef2f8":"rgba(233,30,167,0.85)";
            ctx.fillText(m.name, p[0]+10, p[1]+4);
            ctx.font="9px Inter,sans-serif";
            ctx.fillStyle=open?"rgba(41,168,255,0.75)":"rgba(233,30,167,0.5)";
            ctx.fillText(open?"Open":"Closed", p[0]+10, p[1]+15);
          });

          animRef.current = requestAnimationFrame(draw);
        };
        draw();
      });
    };
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js",
      ()=>loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js",startDraw));
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const handleMouseMove = e => {
    const cv=canvasRef.current; if(!cv||!window.d3) return;
    const rect=cv.getBoundingClientRect();
    const sx=cv.width/rect.width, sy=cv.height/rect.height;
    const mx=(e.clientX-rect.left)*sx, my=(e.clientY-rect.top)*sy;
    const R=Math.min(cv.width,cv.height)*0.46;
    const proj=window.d3.geoOrthographic().scale(R).translate([cv.width/2,cv.height/2]).rotate(rotRef.current).clipAngle(90);
    const isVis=(la,lo)=>{const[rx,ry]=rotRef.current,lat1=ry*Math.PI/180,lon1=rx*Math.PI/180,lat2=la*Math.PI/180,lon2=lo*Math.PI/180;return Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1+Math.PI)<0;};
    let found=null;
    MARKETS.forEach(m=>{if(!isVis(m.lat,m.lng))return;const p=proj([m.lng,m.lat]);if(p&&Math.hypot(mx-p[0],my-p[1])<20)found=m;});
    hovRef.current=found; setHovered(found?.id||null);
  };

  const overlap = !fxWknd && MARKETS.filter(m=>mktOpen(m)).length>1;

  return (
    <div style={{ background:"rgba(6,8,16,.95)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, overflow:"hidden" }}>

      {/* ── Header ── */}
      <div style={{ padding:"10px 18px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <IC n="globe" s={13} c={C.accent}/>
          <span style={{ fontSize:11, fontWeight:600, color:C.text, letterSpacing:".08em", textTransform:"uppercase" }}>Global Market Sessions</span>
          {overlap && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:"rgba(41,168,255,.08)", color:C.accent, border:"1px solid rgba(41,168,255,.2)", fontWeight:600 }}>{MARKETS.filter(m=>mktOpen(m)).map(m=>m.name).join(" + ")} Overlap</span>}
          {!fxWknd && !overlap && <div style={{ display:"flex", alignItems:"center", gap:5 }}><div style={{ width:5,height:5,borderRadius:"50%",background:"#29ff88",boxShadow:"0 0 5px #29ff88"}}/><span style={{ fontSize:10, color:C.textDim }}>Live</span></div>}
          {fxWknd && <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:"rgba(255,255,255,.04)", color:C.textDim, border:"1px solid rgba(255,255,255,.06)" }}>FX Closed — Weekend</span>}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:10, color:C.textDim }}>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:5,height:5,borderRadius:"50%",background:"#29a8ff"}}/> Open</div>
            <div style={{ display:"flex", alignItems:"center", gap:4 }}><div style={{ width:5,height:5,borderRadius:"50%",background:"#e91ea7"}}/> Closed</div>
          </div>
        </div>
      </div>

      {/* ── Session clocks — horizontal strip above the globe ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        {MARKETS.map((m,i) => {
          const open=mktOpen(m), col=open?m.openCol:m.closedCol;
          const pct=open?Math.min(100,((utc-m.open)/(m.close-m.open))*100):0;
          const cd=fxWknd?"—":open?fmtSec((m.close-utc)*3600):fmtSec(((m.open-utc+24)%24)*3600);
          return (
            <div key={m.id} style={{ padding:"12px 18px", borderRight:i<2?"1px solid rgba(255,255,255,.05)":"none" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:col,boxShadow:open?`0 0 6px ${col}80`:"none",transition:"all .5s"}}/>
                  <span style={{ fontSize:12, fontWeight:600, color:C.text }}>{m.name}</span>
                </div>
                <span style={{ fontSize:10, padding:"2px 6px", borderRadius:3, background:`${col}12`, color:col, border:`1px solid ${col}28`, fontWeight:600 }}>{fxWknd?"Closed":open?"Open":"Closed"}</span>
              </div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:22, fontWeight:700, color:open?"#eef2f8":`rgba(233,30,167,.7)`, lineHeight:1, marginBottom:7 }}>{fmt(m.tz)}</div>
              <div style={{ height:2, background:"rgba(255,255,255,.05)", borderRadius:2, overflow:"hidden", marginBottom:5 }}>
                <div style={{ height:"100%", width:`${pct}%`, background:col, transition:"width 1s linear" }}/>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
                <span style={{ color:C.textDim }}>{fxWknd?"FX Closed":open?"Closes in":"Opens in"}</span>
                <span style={{ color:col, fontFamily:"JetBrains Mono,monospace" }}>{cd}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Full-width globe canvas ── */}
      <div style={{ position:"relative", background:"#030810" }}>
        <canvas
          ref={canvasRef} width={900} height={440}
          style={{ width:"100%", height:"auto", display:"block" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { hovRef.current=null; setHovered(null); }}
        />
        {!loaded && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontSize:11, color:C.textDim }}>Loading…</span>
          </div>
        )}
        {/* Hover tooltip */}
        {hovered && (() => {
          const m=MARKETS.find(x=>x.id===hovered); if(!m) return null;
          const open=mktOpen(m);
          const pct=open?Math.min(100,((utc-m.open)/(m.close-m.open))*100):0;
          const cd=fxWknd?"—":open?fmtSec((m.close-utc)*3600):fmtSec(((m.open-utc+24)%24)*3600);
          return (
            <div style={{ position:"absolute", bottom:12, left:14, background:"rgba(6,8,20,.97)", border:"1px solid rgba(255,255,255,.1)", borderRadius:8, padding:"10px 14px", minWidth:180, pointerEvents:"none" }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:2 }}>{m.name}</div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:20, fontWeight:700, color:open?"#eef2f8":"rgba(233,30,167,.8)", lineHeight:1, marginBottom:5 }}>{fmt(m.tz)}</div>
              <div style={{ fontSize:10, color:open?m.openCol:m.closedCol, marginBottom:open?5:0 }}>{open?"Session open":"Session closed"}</div>
              {open && <>
                <div style={{ height:2, background:"rgba(255,255,255,.06)", borderRadius:2, overflow:"hidden", marginBottom:4 }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:m.openCol }}/>
                </div>
                <div style={{ fontSize:10, color:C.textDim }}>Closes in {cd}</div>
              </>}
              {!open && !fxWknd && <div style={{ fontSize:10, color:C.textDim }}>Opens in {cd}</div>}
            </div>
          );
        })()}
      </div>

      {/* ── Market Events strip ── */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", padding:"10px 18px" }}>
        <div style={{ fontSize:9, fontWeight:600, color:C.textDim, letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>Key Market Events</div>
        <div style={{ display:"flex", gap:8, overflowX:"auto", scrollbarWidth:"none" }}>
          {MAP_EVENTS.map((ev,i) => (
            <div key={i} style={{ flexShrink:0, width:200, padding:"9px 12px", borderRadius:6, background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.07)", transition:"border-color .15s", cursor:"default" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.15)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
                <span style={{ fontSize:11, fontWeight:500, color:C.text }}>{ev.lbl}</span>
                <span style={{ fontSize:9, color:C.textDim }}>{ev.imp}/10</span>
              </div>
              <div style={{ fontSize:9, color:C.textDim, marginBottom:4, textTransform:"uppercase", letterSpacing:".04em" }}>{ev.type}</div>
              <div style={{ fontSize:10, color:C.textMuted, lineHeight:1.5 }}>{ev.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const QuantIntelWidget = ({ currentTier, setPage }) => {
  const isElite = currentTier === "95" || currentTier === "lifetime";
  const [view, setView] = useState("trader");
  const [pulseOn, setPulseOn] = useState(true);
  useEffect(() => { const t = setInterval(() => setPulseOn(p => !p), 1800); return () => clearInterval(t); }, []);

  const LIVE_DATA = {
    regime: "Risk-Off",  regimeColor:"#e91ea7",
    bias: { gold:1, dxy:1, oil:1, spx:-1 },
    volatility: 7,
    narratives: ["Hawkish Fed","Geopolitical Risk","USD Strength"],
    session: "LDN–NY Overlap",
    sessionOutlook: "Elevated volatility expected. Watch XAUUSD for distribution above recent highs.",
    keyLevel: { asset:"XAU/USD", level:"2,312", type:"Supply", note:"Previous daily high — institutional distribution zone" },
    signal: { bias:"Bearish gold short-term", confidence:"Medium", trigger:"Break below 2,290 confirms", invalidation:"Close above 2,320" },
  };

  const biasArrow = b => b > 0 ? <IC n="arrow_up" s={11} c="#29a8ff"/> : b < 0 ? <IC n="arrow_dn" s={11} c="#e91ea7"/> : <IC n="trend_flat" s={11} c="#7a8fa8"/>;

  return (
    <div style={{ background:"rgba(6,8,16,.9)", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"12px 18px", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <IC n="quant" s={14} c={isElite?C.accent:C.textDim}/>
          <span style={{ fontSize:11, fontWeight:600, color:C.text, letterSpacing:".08em", textTransform:"uppercase" }}>Quant Intelligence</span>
          {isElite
            ? <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:"#29ff88",boxShadow:"0 0 6px #29ff88",opacity:pulseOn?1:.3,transition:"opacity .4s"}}/>
                <span style={{ fontSize:10, color:"#29ff88" }}>Live</span>
              </div>
            : <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:"rgba(233,30,167,.1)", color:C.pink, border:"1px solid rgba(233,30,167,.25)", fontWeight:600 }}>ELITE</span>
          }
        </div>
        {isElite && (
          <div style={{ display:"flex", gap:2, background:"rgba(255,255,255,.04)", borderRadius:5, padding:2 }}>
            {[["trader","Trader"],["investor","Investor"]].map(([v,l]) => (
              <div key={v} onClick={() => setView(v)} style={{ padding:"4px 11px", borderRadius:3, fontSize:11, cursor:"pointer", color:view===v?C.accent:C.textDim, background:view===v?"rgba(41,168,255,.12)":"transparent", border:view===v?"1px solid rgba(41,168,255,.25)":"1px solid transparent", transition:"all .15s" }}>{l}</div>
            ))}
          </div>
        )}
      </div>

      {/* Unlocked — Elite */}
      {isElite ? (
        <div style={{ padding:"14px 18px" }}>
          {/* Regime + asset bias row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, marginBottom:14 }}>
            <div style={{ padding:"10px 14px", background:`${LIVE_DATA.regimeColor}08`, border:`1px solid ${LIVE_DATA.regimeColor}25`, borderRadius:8 }}>
              <div style={{ fontSize:10, color:C.textDim, textTransform:"uppercase", letterSpacing:".07em", marginBottom:4 }}>Market Regime</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <IC n="risk_off" s={16} c={LIVE_DATA.regimeColor}/>
                <span style={{ fontSize:16, fontWeight:600, color:LIVE_DATA.regimeColor, fontFamily:"Inter,sans-serif" }}>{LIVE_DATA.regime}</span>
              </div>
            </div>
            <div style={{ padding:"10px 14px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:8 }}>
              <div style={{ fontSize:10, color:C.textDim, textTransform:"uppercase", letterSpacing:".07em", marginBottom:6 }}>Asset Bias</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 12px" }}>
                {Object.entries(LIVE_DATA.bias).map(([a,b]) => (
                  <div key={a} style={{ display:"flex", alignItems:"center", gap:5 }}>
                    {biasArrow(b)}
                    <span style={{ fontSize:11, color:C.textDim, textTransform:"uppercase" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Volatility bar */}
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:10, color:C.textDim, textTransform:"uppercase", letterSpacing:".07em" }}>Volatility Outlook</span>
              <span style={{ fontSize:11, color:LIVE_DATA.volatility>=7?"#e91ea7":LIVE_DATA.volatility>=4?"#d4af37":"#29a8ff", fontWeight:600 }}>{LIVE_DATA.volatility>=7?"Elevated":LIVE_DATA.volatility>=4?"Moderate":"Low"} {LIVE_DATA.volatility}/10</span>
            </div>
            <div style={{ height:5, background:"rgba(255,255,255,.05)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${LIVE_DATA.volatility*10}%`, background:LIVE_DATA.volatility>=7?"#e91ea7":LIVE_DATA.volatility>=4?"#d4af37":"#29a8ff", borderRadius:3, transition:"width .8s" }}/>
            </div>
          </div>

          {/* Session outlook */}
          <div style={{ padding:"10px 12px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.05)", borderRadius:7, marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
              <IC n="activity" s={12} c={C.accent}/>
              <span style={{ fontSize:10, color:C.accent, textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>{LIVE_DATA.session}</span>
            </div>
            <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.6 }}>{LIVE_DATA.sessionOutlook}</div>
          </div>

          {/* Key level */}
          <div style={{ padding:"10px 12px", background:"rgba(212,175,55,.05)", border:"1px solid rgba(212,175,55,.2)", borderRadius:7, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <IC n="target" s={12} c="#d4af37"/>
                <span style={{ fontSize:10, color:"#d4af37", textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>Key Level — {LIVE_DATA.keyLevel.asset}</span>
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:"#d4af37", fontFamily:"JetBrains Mono,monospace" }}>{LIVE_DATA.keyLevel.level}</span>
            </div>
            <div style={{ fontSize:11, color:C.textDim, lineHeight:1.5 }}>{LIVE_DATA.keyLevel.note}</div>
          </div>

          {/* Signal */}
          {view === "trader" && (
            <div style={{ padding:"10px 12px", background:"rgba(41,168,255,.05)", border:"1px solid rgba(41,168,255,.2)", borderRadius:7, marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
                <IC n="zap" s={12} c={C.accent}/>
                <span style={{ fontSize:10, color:C.accent, textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>FMF Signal</span>
              </div>
              <div style={{ fontSize:12, color:C.text, fontWeight:500, marginBottom:4 }}>{LIVE_DATA.signal.bias}</div>
              <div style={{ fontSize:11, color:C.textDim, marginBottom:3 }}><span style={{ color:C.textMuted }}>Trigger:</span> {LIVE_DATA.signal.trigger}</div>
              <div style={{ fontSize:11, color:C.textDim }}><span style={{ color:C.textMuted }}>Invalidation:</span> {LIVE_DATA.signal.invalidation}</div>
            </div>
          )}
          {view === "investor" && (
            <div style={{ padding:"10px 12px", background:"rgba(41,168,255,.05)", border:"1px solid rgba(41,168,255,.2)", borderRadius:7, marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
                <IC n="investor" s={12} c={C.accent}/>
                <span style={{ fontSize:10, color:C.accent, textTransform:"uppercase", letterSpacing:".07em", fontWeight:600 }}>Macro Positioning</span>
              </div>
              {LIVE_DATA.narratives.map(n => (
                <div key={n} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                  <IC n="chevron_r" s={10} c={C.accent}/>
                  <span style={{ fontSize:12, color:C.textMuted }}>{n}</span>
                </div>
              ))}
            </div>
          )}

          <button className="btn bg" style={{ width:"100%", fontSize:11, padding:"8px 0", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }} onClick={() => setPage("quant")}>
            <IC n="quant" s={12} c={C.accent}/> Open Full Quant Research Analyst
          </button>
        </div>
      ) : (
        /* Locked state for non-Elite */
        <div style={{ padding:"14px 18px" }}>
          {/* Blurred preview */}
          <div style={{ position:"relative", marginBottom:14 }}>
            <div style={{ filter:"blur(4px)", opacity:.4, pointerEvents:"none" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:10, marginBottom:10 }}>
                <div style={{ padding:"10px 12px", background:"rgba(233,30,167,.08)", borderRadius:7, border:"1px solid rgba(233,30,167,.2)" }}>
                  <div style={{ fontSize:10, color:C.textDim, marginBottom:3 }}>Market Regime</div>
                  <div style={{ fontSize:15, fontWeight:600, color:"#e91ea7" }}>Risk-Off</div>
                </div>
                <div style={{ padding:"10px 12px", background:"rgba(255,255,255,.03)", borderRadius:7 }}>
                  <div style={{ fontSize:10, color:C.textDim, marginBottom:5 }}>Asset Bias</div>
                  <div style={{ fontSize:12, color:C.accent }}>↑ Gold &nbsp; ↑ USD</div>
                  <div style={{ fontSize:12, color:C.pink }}>↓ SPX &nbsp; ↓ BTC</div>
                </div>
              </div>
              <div style={{ height:5, background:"rgba(255,255,255,.05)", borderRadius:3, marginBottom:10, overflow:"hidden" }}>
                <div style={{ height:"100%", width:"70%", background:"#e91ea7", borderRadius:3 }}/>
              </div>
              <div style={{ padding:"10px 12px", background:"rgba(255,255,255,.03)", borderRadius:7, fontSize:12, color:C.textMuted, lineHeight:1.5 }}>
                Elevated volatility expected. Watch XAUUSD for distribution above recent highs during LDN–NY overlap…
              </div>
            </div>
            {/* Lock overlay */}
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(rgba(6,8,16,0) 0%, rgba(6,8,16,.92) 60%)" }}>
              <div style={{ textAlign:"center", paddingTop:40 }}>
                <IC n="lock" s={24} c={C.pink}/>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding:"12px 14px", background:`rgba(233,30,167,.06)`, border:`1px solid rgba(233,30,167,.2)`, borderRadius:8, textAlign:"center" }}>
            <div style={{ fontSize:12, fontWeight:500, color:C.text, marginBottom:4 }}>
              Real-time quant intelligence
            </div>
            <div style={{ fontSize:11, color:C.textDim, marginBottom:12, lineHeight:1.6 }}>
              Live regime detection · Asset bias signals · FMF session analysis · Key levels
            </div>
            <button className="btn bp" style={{ fontSize:12, padding:"8px 20px", display:"inline-flex", alignItems:"center", gap:7 }} onClick={() => setPage("pricing")}>
              <IC n="lock" s={12} c="#fff"/> Unlock with Elite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// AI INSIGHT FEED — Live macro insight ticker
// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// LIVE PRICE TICKER — Fetches real prices via Anthropic API proxy
// Uses Claude to get current market prices from web search
// ═══════════════════════════════════════════════════════════════════════════════
const LivePriceTicker = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [error, setError] = useState(false);

  const INSTRUMENTS = [
    { sym:"XAU/USD", key:"XAUUSD", label:"Gold" },
    { sym:"EUR/USD", key:"EURUSD", label:"EUR/USD" },
    { sym:"GBP/USD", key:"GBPUSD", label:"GBP/USD" },
    { sym:"USD/JPY", key:"USDJPY", label:"USD/JPY" },
    { sym:"BTC/USD", key:"BTCUSD", label:"Bitcoin" },
    { sym:"ETH/USD", key:"ETHUSD", label:"Ethereum" },
    { sym:"US500",   key:"SPX500", label:"S&P 500" },
    { sym:"Brent",   key:"UKOIL",  label:"Brent Oil" },
  ];

  const fetchPrices = async () => {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 600,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Get the current live market prices right now for these instruments and return ONLY a valid JSON object with no other text: XAU/USD (gold spot price), EUR/USD, GBP/USD, USD/JPY, BTC/USD (Bitcoin), ETH/USD (Ethereum), S&P 500 index, and Brent crude oil price. Format: {"XAUUSD":{"price":2345.50,"change":+0.42},"EURUSD":{"price":1.0842,"change":-0.12},...} Use the change as the % change today. Search for current prices now.`
          }]
        })
      });
      const data = await res.json();
      // Find the text content block with our JSON
      const textBlock = data.content?.find(b => b.type === "text");
      if (textBlock?.text) {
        const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setPrices(parsed);
          setLastUpdate(new Date());
          setError(false);
        }
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // Refresh every 60 seconds
    const t = setInterval(fetchPrices, 60000);
    return () => clearInterval(t);
  }, []);

  const fmtPrice = (key, price) => {
    if (!price) return "—";
    if (key === "XAUUSD" || key === "SPX500") return price.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
    if (key === "BTCUSD" || key === "ETHUSD") return price.toLocaleString("en-US", { minimumFractionDigits:0, maximumFractionDigits:0 });
    return price.toFixed(key.includes("JPY") ? 2 : 4);
  };

  if (loading) return (
    <div style={{ padding:"8px 16px", background:"rgba(13,16,24,.7)", border:`1px solid ${C.border}`, borderRadius:7, display:"flex", alignItems:"center", gap:8 }}>
      <IC n="activity" s={12} c={C.accent}/>
      <span style={{ fontSize:10, color:C.textDim }}>Loading live prices…</span>
    </div>
  );

  return (
    <div style={{ background:"rgba(13,16,24,.7)", border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", overflowX:"auto", scrollbarWidth:"none" }}>
        {/* Label */}
        <div style={{ padding:"8px 14px", borderRight:`1px solid ${C.border}`, flexShrink:0, display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:5,height:5,borderRadius:"50%",background:error?"#ff6b35":"#29ff88",boxShadow:`0 0 4px ${error?"#ff6b35":"#29ff88"}`}}/>
          <span style={{ fontSize:9, fontWeight:600, color:C.textDim, letterSpacing:".07em", textTransform:"uppercase", whiteSpace:"nowrap" }}>Live Prices</span>
        </div>
        {INSTRUMENTS.map(inst => {
          const d = prices[inst.key];
          const chg = d?.change ?? 0;
          const up = chg >= 0;
          return (
            <div key={inst.key} style={{ padding:"7px 16px", borderRight:`1px solid rgba(255,255,255,.04)`, flexShrink:0 }}>
              <div style={{ fontSize:9, color:C.textDim, marginBottom:2, whiteSpace:"nowrap" }}>{inst.label}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                <span style={{ fontSize:12, fontWeight:600, color:C.text, fontFamily:"JetBrains Mono,monospace" }}>
                  {d ? fmtPrice(inst.key, d.price) : "—"}
                </span>
                {d && <span style={{ fontSize:9, color:up?C.accent:C.pink }}>
                  {up?"+":""}{chg.toFixed(2)}%
                </span>}
              </div>
            </div>
          );
        })}
        {lastUpdate && (
          <div style={{ padding:"7px 12px", flexShrink:0, marginLeft:"auto" }}>
            <span style={{ fontSize:9, color:C.textDim, whiteSpace:"nowrap" }}>
              {lastUpdate.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


const AIInsightFeed = () => {
  const [insights, setInsights] = useState(["Loading market intelligence..."]);
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: "user",
          content: "Search for today's top 5 macro market insights for forex/commodities traders. Return ONLY a JSON array of 5 short strings (under 15 words each), each describing one current market observation. Example format: [\"USD strength building as Fed maintains hawkish stance\", ...]"
        }]
      })
    })
    .then(r => r.json())
    .then(data => {
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const match = text.match(/\[[\s\S]*?\]/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (Array.isArray(parsed) && parsed.length > 0) setInsights(parsed);
      }
    })
    .catch(() => setInsights(["Market intelligence unavailable — check your connection"]));
  }, []);

  useEffect(() => {
    if (insights.length <= 1) return;
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i+1) % insights.length); setFade(true); }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, [insights]);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"rgba(41,168,255,.04)", border:"1px solid rgba(41,168,255,.12)", borderRadius:8 }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
        <IC n="ai" s={13} c={C.accent}/>
        <span style={{ fontSize:10, fontWeight:600, color:C.accent, letterSpacing:".08em", textTransform:"uppercase" }}>Fortitude Quant</span>
      </div>
      <div style={{ width:1, height:14, background:"rgba(255,255,255,.1)", flexShrink:0 }}/>
      <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.4, flex:1, transition:"opacity .4s", opacity:fade?1:0 }}>
        {insights[idx]}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const Dashboard = ({ setPage, currentTier, user }) => {
  const revenge    = computeRevengeScore(TRADE_DATA);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability([]);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const pdiMeta    = pdiLabel(pdi);
  const [dashMode, setDashMode] = useState("trader");
  const [latestUpdate, setLatestUpdate] = useState(null);

  useEffect(() => {
    api.get('/market-updates?limit=1')
      .then(d => { if (d?.data?.[0]) setLatestUpdate(d.data[0]); })
      .catch(() => {});
  }, []);

  const [userClock, setUserClock] = useState({ city:null, tz:null, loading:true });
  const [clockNow,  setClockNow]  = useState(new Date());
  useEffect(() => { const t = setInterval(() => setClockNow(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    fetch("https://ipapi.co/json/").then(r=>r.json()).then(d => setUserClock({ city:d.city||d.country_name||"Local", tz:d.timezone||Intl.DateTimeFormat().resolvedOptions().timeZone, loading:false }))
    .catch(() => { const tz=Intl.DateTimeFormat().resolvedOptions().timeZone; setUserClock({ city:tz.split("/").pop().replace(/_/g," "), tz, loading:false }); });
  }, []);
  const userTime = userClock.tz ? new Intl.DateTimeFormat("en-GB",{ timeZone:userClock.tz, hour:"2-digit", minute:"2-digit", second:"2-digit" }).format(clockNow) : "";
  const userDate = userClock.tz ? new Intl.DateTimeFormat("en-GB",{ timeZone:userClock.tz, weekday:"short", day:"numeric", month:"short" }).format(clockNow) : "";

  return (
    <div className="fi">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="dash-header" style={{ marginBottom:18, display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
        <div>
          <h1 className="df df-h1" style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:26, fontWeight:300, marginBottom:4 }}>Market Intelligence Dashboard</h1>
          <p style={{ color:C.textMuted, fontSize:13 }}>Structured analysis. Probabilistic framing. Institutional methodology.</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Dashboard mode toggle */}
          <div style={{ display:"flex", gap:2, background:"rgba(13,16,24,.8)", border:"1px solid rgba(255,255,255,.06)", borderRadius:6, padding:2 }}>
            {[["clean","Clean"],["trader","Trader"],["intel","Intel"]].map(([m,l]) => (
              <div key={m} onClick={() => setDashMode(m)} style={{ padding:"5px 12px", borderRadius:4, cursor:"pointer", fontSize:11, color:dashMode===m?C.accent:C.textDim, background:dashMode===m?"rgba(41,168,255,.12)":"transparent", border:dashMode===m?"1px solid rgba(41,168,255,.25)":"1px solid transparent", transition:"all .15s", whiteSpace:"nowrap" }}>{l}</div>
            ))}
          </div>
          {/* Clock */}
          <div className="dash-header-clock" style={{ flexShrink:0, textAlign:"right", padding:"8px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:"rgba(13,16,24,.7)", backdropFilter:"blur(8px)", minWidth:140 }}>
            {userClock.loading ? <div style={{ fontSize:11,color:C.textDim }}>Locating…</div> : <>
              <div className="mn" style={{ fontSize:20, color:C.text, letterSpacing:".04em", lineHeight:1, marginBottom:2 }}>{userTime}</div>
              <div style={{ fontSize:11, fontWeight:600, color:C.text, marginBottom:1 }}>{userClock.city}</div>
              <div style={{ fontSize:10, color:C.textDim }}>{userDate}</div>
            </>}
          </div>
        </div>
      </div>

      {/* ── Live Price Ticker — always visible ──────────────────────────────── */}
      <div style={{ marginBottom:12 }}><LivePriceTicker/></div>

      {/* ── AI Insight Feed (Intel + Trader modes) ─────────────────────────── */}
      {dashMode !== "clean" && <div style={{ marginBottom:14 }}><AIInsightFeed/></div>}

      {/* ── Main layout ────────────────────────────────────────────────────── */}
      <div className="dash-grid" style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) 300px", gap:14, alignItems:"start" }}>

        {/* LEFT COLUMN */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Sessions map */}
          <GlobalMarketPulse/>

          {/* Quant Intel Widget (Intel mode only) */}
          {dashMode === "intel" && <QuantIntelWidget currentTier={currentTier} setPage={setPage}/>}



          {/* Journal Summary */}
          {(() => {
            const trades = MOCK_SYNCED_TRADES.filter(t => !t.is_open);
            const wins   = trades.filter(t => t.profit > 0).length;
            const losses = trades.filter(t => t.profit <= 0).length;
            const winRate = trades.length > 0 ? Math.round((wins/trades.length)*100) : 0;
            const totalPnl = trades.reduce((a,t) => a + t.profit + t.commission, 0);
            const grossWin = trades.filter(t=>t.profit>0).reduce((a,t)=>a+t.profit,0);
            const grossLoss= Math.abs(trades.filter(t=>t.profit<=0).reduce((a,t)=>a+t.profit,0));
            const pf = grossLoss>0 ? (grossWin/grossLoss).toFixed(2) : "∞";
            const avgWin = wins>0 ? (grossWin/wins).toFixed(0) : "0";
            const avgLoss= losses>0 ? (grossLoss/losses).toFixed(0) : "0";
            const avgDur = (() => {
              const closed = MOCK_SYNCED_TRADES.filter(t=>!t.is_open&&t.close_time);
              if (!closed.length) return "—";
              const avg = closed.reduce((a,t)=>a+((new Date(t.close_time)-new Date(t.open_time))/60000),0)/closed.length;
              return avg<60 ? `${Math.round(avg)}m` : `${Math.round(avg/60)}h ${Math.round(avg%60)}m`;
            })();
            const recent = [...MOCK_SYNCED_TRADES].sort((a,b)=>new Date(b.open_time)-new Date(a.open_time)).slice(0,5);
            const conn = MOCK_CONNECTIONS[0];
            return (
              <div className="mc" style={{ padding:"16px 20px" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <IC n="journal" s={13} c={C.accent}/>
                    <div className="sl" style={{ margin:0 }}>Trading Journal</div>
                    {conn && <div style={{ display:"flex", alignItems:"center", gap:5, padding:"2px 8px", borderRadius:3, background:"rgba(41,168,255,.06)", border:"1px solid rgba(41,168,255,.15)" }}>
                      <div style={{ width:5,height:5,borderRadius:"50%",background:conn.sync_status==="live"?"#29ff88":"#ff6b35",boxShadow:`0 0 4px ${conn.sync_status==="live"?"#29ff88":"#ff6b35"}`}}/>
                      <span style={{ fontSize:9, color:C.textDim }}>{conn.display_name}</span>
                    </div>}
                  </div>
                  <button className="btn bg" style={{ fontSize:10, padding:"4px 10px" }} onClick={() => setPage("journal")}>Full Journal →</button>
                </div>

                {/* KPI grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:8, marginBottom:14 }}>
                  {[
                    { l:"Win Rate",   v:`${winRate}%`,  c:winRate>=50?C.accent:C.pink, sub:`${wins}W / ${losses}L` },
                    { l:"Net P&L",    v:`$${totalPnl>=0?"+":""}${totalPnl.toFixed(0)}`, c:totalPnl>=0?C.accent:C.pink, sub:"After commission" },
                    { l:"Profit Factor",v:pf,           c:parseFloat(pf)>=1?C.accent:C.pink, sub:"Gross ratio" },
                    { l:"Avg Win",    v:`$${avgWin}`,   c:C.accent, sub:"Per winning trade" },
                    { l:"Avg Loss",   v:`-$${avgLoss}`, c:C.pink,   sub:"Per losing trade" },
                    { l:"Avg Duration",v:avgDur,        c:C.text,   sub:"Per closed trade" },
                  ].map(m => (
                    <div key={m.l} style={{ textAlign:"center", padding:"10px 6px", background:"rgba(13,16,24,.6)", borderRadius:6, border:`1px solid ${C.border}` }}>
                      <div style={{ fontSize:15, fontWeight:600, color:m.c, lineHeight:1.1, fontFamily:"JetBrains Mono,monospace" }}>{m.v}</div>
                      <div style={{ fontSize:9, color:C.textDim, marginTop:3, textTransform:"uppercase", letterSpacing:".04em" }}>{m.l}</div>
                      <div style={{ fontSize:9, color:C.textDim, marginTop:1 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent trades table */}
                <div style={{ fontSize:10, color:C.textDim, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>Recent Trades</div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                    <thead>
                      <tr style={{ borderBottom:`1px solid ${C.border}` }}>
                        {["Instrument","Type","Entry","Exit","Volume","Session","Duration","Comm.","Net P&L"].map(h => (
                          <th key={h} style={{ padding:"5px 8px", textAlign:"left", fontSize:9, color:C.textDim, fontWeight:500, letterSpacing:".05em", textTransform:"uppercase", whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map(t => {
                        const dur = (() => {
                          if (!t.close_time) return "Open";
                          const ms = new Date(t.close_time) - new Date(t.open_time);
                          const m = Math.floor(ms/60000);
                          return m<60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`;
                        })();
                        const net = t.profit + t.commission;
                        return (
                          <tr key={t.id} style={{ borderBottom:`1px solid rgba(255,255,255,.04)` }}>
                            <td style={{ padding:"7px 8px", fontWeight:600, color:C.text }}>{t.instrument}</td>
                            <td style={{ padding:"7px 8px" }}>
                              <span style={{ fontSize:10, padding:"2px 6px", borderRadius:3, background:t.trade_type==="Long"?"rgba(41,168,255,.1)":"rgba(233,30,167,.1)", color:t.trade_type==="Long"?C.accent:C.pink, border:`1px solid ${t.trade_type==="Long"?"rgba(41,168,255,.25)":"rgba(233,30,167,.25)"}` }}>{t.trade_type}</span>
                            </td>
                            <td style={{ padding:"7px 8px", color:C.textMuted, fontFamily:"JetBrains Mono,monospace", fontSize:10 }}>{t.open_price.toFixed(t.instrument.includes("JPY")||t.instrument.includes("XAU")||t.instrument.includes("NAS")||t.instrument.includes("BTC")?2:5)}</td>
                            <td style={{ padding:"7px 8px", color:C.textMuted, fontFamily:"JetBrains Mono,monospace", fontSize:10 }}>{t.is_open?"—":t.close_price.toFixed(t.instrument.includes("JPY")||t.instrument.includes("XAU")||t.instrument.includes("NAS")||t.instrument.includes("BTC")?2:5)}</td>
                            <td style={{ padding:"7px 8px", color:C.textMuted }}>{t.volume}</td>
                            <td style={{ padding:"7px 8px", color:C.textDim }}>{t.session}</td>
                            <td style={{ padding:"7px 8px", color:C.textDim, fontFamily:"JetBrains Mono,monospace", fontSize:10 }}>{dur}</td>
                            <td style={{ padding:"7px 8px", color:C.pink, fontFamily:"JetBrains Mono,monospace", fontSize:10 }}>{t.commission.toFixed(2)}</td>
                            <td style={{ padding:"7px 8px", fontWeight:600, fontFamily:"JetBrains Mono,monospace", color:net>=0?C.accent:C.pink }}>
                              {net>=0?"+":""}{net.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* PDI Banner */}
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

          {latestUpdate && (
            <div className="mc" style={{ borderLeft:`3px solid ${C.accent}` }}>
              <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"flex-start",gap:8,marginBottom:10 }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <IC n="news" s={13} c={C.accent}/>
                    <div className="sl" style={{ margin:0 }}>Latest Market Update</div>
                  </div>
                  <div style={{ fontSize:16,color:C.text,fontWeight:600,fontFamily:"Inter,sans-serif",letterSpacing:".01em" }}>{latestUpdate.title}</div>
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  <span className="tg ta">Admin</span>
                  <span style={{ fontSize:11,color:C.textDim,lineHeight:2.2 }}>{new Date(latestUpdate.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </div>
              <p style={{ color:C.textMuted,lineHeight:1.8,fontSize:13 }}>{latestUpdate.body}</p>
            </div>
          )}

          <TVNewsWidget/>
        </div>

        {/* RIGHT COLUMN — Economic Calendar */}
        <div className="dash-cal-mobile" style={{ position:"sticky", top:0 }}>
          <div style={{ background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", backdropFilter:"blur(8px)" }}>
            <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <IC n="cal" s={13} c={C.accent}/>
                <span style={{ fontSize:11, fontWeight:600, color:C.text, letterSpacing:".06em", textTransform:"uppercase" }}>Economic Calendar</span>
              </div>

              <a href="#" style={{ fontSize:11, color:C.accent, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                Full view <IC n="external" s={11} c={C.accent}/>
              </a>
            </div>
            <TVCalendarWidget height={700}/>
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
        <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Market Intelligence</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Upload a chart for institutional-grade structural analysis using the Fortitude Market Framework.</p>
      </div>
      <div className="mc" style={{ marginBottom:18,display:"flex",alignItems:"center",gap:16,padding:"12px 16px" }}>
        <IC n="shield" s={14} c={C.accent}/>
        <span style={{ fontSize:12,color:C.textMuted }}>Analysis quota:</span>
        <div style={{ flex:1,maxWidth:200 }}><div className="pb"><div className="pf" style={{ width:"40%" }}/></div></div>
        <span className="mn" style={{ fontSize:12,color:C.accent }}>2 / 5 today</span>
        <span className="tg ta" style={{ marginLeft:"auto" }}>FMF Owner</span>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div>
          <div className="sl">Chart Upload</div>
          <div onClick={()=>document.getElementById("fi").click()} style={{ border:`1px dashed ${C.borderHover}`,borderRadius:8,background:"rgba(17,21,32,.7)",backdropFilter:"blur(6px)",cursor:"pointer",transition:"all .2s",padding:img?0:48,textAlign:"center" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=C.borderHover}>
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


// ── Journal component ─────────────────────────────────────────────────────────

// ── Broker Accounts ───────────────────────────────────────────────────────────
const BrokerAccounts = ({ setPage }) => {
  const token = localStorage.getItem("fis_token");
  const [connections,  setConnections]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [syncing,      setSyncing]      = useState({});
  const [addOpen,      setAddOpen]      = useState(false);
  const [addStep,      setAddStep]      = useState("pick");
  const [brokerType,   setBrokerType]   = useState(null);
  const [accountLabel, setAccountLabel] = useState("");
  const [ctAccounts,   setCtAccounts]   = useState([]);
  const [ctTokens,     setCtTokens]     = useState(null);
  const [ctSelectedId, setCtSelectedId] = useState(null);
  const [mtConn,       setMtConn]       = useState(null);
  const [connecting,   setConnecting]   = useState(false);
  const [err,          setErr]          = useState("");
  const [copied,       setCopied]       = useState("");

  useEffect(() => {
    if (!token) return;
    api.get("/broker/connections", token)
      .then(d => { if (d.success) setConnections(d.data.connections || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const syncConn = async (connId) => {
    setSyncing(s => ({ ...s, [connId]: true }));
    try {
      await api.post(`/broker/connections/${connId}/sync`, {}, token);
      setConnections(prev => prev.map(c => c.id === connId ? { ...c, last_synced_at: new Date().toISOString() } : c));
    } catch {}
    setSyncing(s => ({ ...s, [connId]: false }));
  };

  const disconnectConn = async (connId) => {
    if (!window.confirm("Disconnect this account? Your existing trades won't be deleted.")) return;
    await api.del(`/broker/connections/${connId}`, token);
    setConnections(prev => prev.filter(c => c.id !== connId));
  };

  const openAdd = () => {
    setAddStep("pick"); setBrokerType(null); setAccountLabel("");
    setCtAccounts([]); setCtTokens(null); setCtSelectedId(null);
    setMtConn(null); setErr(""); setAddOpen(true);
  };

  const connectCtrader = async () => {
    setConnecting(true); setErr("");
    try {
      const d = await api.get("/broker/ctrader/auth", token);
      if (!d.success) { setErr(d.error?.message || "Failed to get auth URL"); setConnecting(false); return; }
      const popup = window.open(d.data.url, "ctrader_auth", "width=600,height=700,left=200,top=100");
      if (!popup) { setErr("Popup blocked — please allow popups for this site."); setConnecting(false); return; }
      const handleMsg = async (e) => {
        if (e.data?.type !== "CTRADER_OAUTH_CODE") return;
        window.removeEventListener("message", handleMsg);
        const result = await api.post("/broker/ctrader/callback", { code: e.data.code }, token);
        if (result.success) {
          setCtAccounts(result.data.accounts || []);
          setCtTokens({ accessToken: result.data.accessToken, refreshToken: result.data.refreshToken, expiresIn: result.data.expiresIn });
          setAddStep("ct_pick");
        } else {
          setErr(result.error?.message || "cTrader authorization failed");
        }
        setConnecting(false);
      };
      window.addEventListener("message", handleMsg);
      const poll = setInterval(() => { if (popup.closed) { clearInterval(poll); window.removeEventListener("message", handleMsg); setConnecting(false); } }, 1000);
    } catch { setErr("Connection failed. Please try again."); setConnecting(false); }
  };

  const saveCtrader = async () => {
    if (!ctSelectedId) { setErr("Please select an account"); return; }
    setConnecting(true); setErr("");
    const acct = ctAccounts.find(a => a.ctAccountId === ctSelectedId);
    try {
      const d = await api.post("/broker/ctrader/connect", {
        accessToken: ctTokens.accessToken, refreshToken: ctTokens.refreshToken,
        expiresIn: ctTokens.expiresIn, ctAccountId: ctSelectedId,
        accountLabel: accountLabel || acct?.brokerName || "cTrader Account",
      }, token);
      if (d.success) { setConnections(prev => [...prev, d.data.connection]); setAddStep("done"); }
      else setErr(d.error?.message || "Failed to connect account");
    } catch { setErr("Connection failed. Please try again."); }
    setConnecting(false);
  };

  const createMtConn = async () => {
    setConnecting(true); setErr("");
    try {
      const d = await api.post("/broker/mt/connect", {
        brokerType, accountLabel: accountLabel || `${(brokerType||"").toUpperCase()} Account`,
      }, token);
      if (d.success) {
        setMtConn(d.data);
        setConnections(prev => [...prev, { id: d.data.connectionId, broker_type: brokerType, account_label: accountLabel || `${(brokerType||"").toUpperCase()} Account`, is_active: true, last_synced_at: null, created_at: new Date().toISOString() }]);
      } else setErr(d.error?.message || "Failed to create connection");
    } catch { setErr("Connection failed. Please try again."); }
    setConnecting(false);
  };

  const downloadEa = async (filename) => {
    try {
      const res = await fetch(`${API_BASE}/broker/mt/ea/${filename}`, { headers: { Authorization: `Bearer ${token}` } });
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a"); a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    } catch { alert("Download failed. Please try again."); }
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(""), 2000); });
  };

  const relTime = iso => {
    if (!iso) return "Never";
    const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  const BK_LABEL = { ctrader:"cTrader", mt4:"MT4", mt5:"MT5" };
  const BK_COLOR = { ctrader:C.accent, mt4:"#f59e0b", mt5:"#10b981" };

  return (
    <div className="fi">
      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:24,fontWeight:300,color:C.text,marginBottom:4}}>Connected Accounts</h1>
          <p style={{fontSize:13,color:C.textMuted}}>Link your trading accounts for automatic trade sync</p>
        </div>
        <button className="btn bp" style={{fontSize:11,padding:"8px 16px",display:"flex",alignItems:"center",gap:6}} onClick={openAdd}>
          <IC n="plus" s={12} c="#000"/> Add Account
        </button>
      </div>

      {/* Stats */}
      {connections.length > 0 && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16}}>
          {[
            {l:"Connected",   v:connections.filter(c=>c.is_active).length,    c:C.accent},
            {l:"Broker Types",v:[...new Set(connections.map(c=>c.broker_type))].length, c:C.textMuted},
            {l:"Last Sync",   v:relTime(connections.reduce((a,c)=>!a||new Date(c.last_synced_at||0)>new Date(a||0)?c.last_synced_at:a,null)), c:C.textDim},
          ].map(m=>(
            <div key={m.l} className="mc" style={{padding:"12px 16px"}}>
              <div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{m.l}</div>
              <div style={{fontSize:20,fontWeight:600,color:m.c,fontFamily:"JetBrains Mono,monospace"}}>{m.v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Account list */}
      {loading ? (
        <div style={{textAlign:"center",padding:60,color:C.textDim,fontSize:13}}>Loading accounts...</div>
      ) : connections.length === 0 ? (
        <div className="mc" style={{textAlign:"center",padding:"60px 20px"}}>
          <div style={{width:52,height:52,borderRadius:"50%",background:`${C.accent}18`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px"}}>
            <IC n="broker" s={22} c={C.accent}/>
          </div>
          <div style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:20,fontWeight:300,color:C.text,marginBottom:8}}>No Accounts Connected</div>
          <div style={{fontSize:13,color:C.textMuted,maxWidth:400,margin:"0 auto 24px",lineHeight:1.8}}>
            Connect your broker accounts to sync trades automatically. Supports cTrader, MT4, and MT5.
          </div>
          <button className="btn bp" style={{fontSize:12,padding:"10px 22px",display:"inline-flex",alignItems:"center",gap:8}} onClick={openAdd}>
            <IC n="plus" s={13} c="#000"/> Connect Your First Account
          </button>
        </div>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {connections.map(conn=>(
            <div key={conn.id} className="mc" style={{display:"flex",alignItems:"center",gap:16,padding:"16px 20px",flexWrap:"wrap"}}>
              <div style={{width:46,height:46,borderRadius:8,background:`${BK_COLOR[conn.broker_type]||C.accent}18`,border:`1px solid ${BK_COLOR[conn.broker_type]||C.accent}40`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:2}}>
                <IC n="broker" s={15} c={BK_COLOR[conn.broker_type]||C.accent}/>
                <span style={{fontSize:7,fontWeight:700,color:BK_COLOR[conn.broker_type]||C.accent,letterSpacing:".04em"}}>{BK_LABEL[conn.broker_type]||conn.broker_type}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:3}}>{conn.account_label||"Trading Account"}</div>
                <div style={{fontSize:11,color:C.textDim,display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span>{BK_LABEL[conn.broker_type]||conn.broker_type}</span>
                  <span>Last synced: {relTime(conn.last_synced_at)}</span>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:conn.is_active?"#29ff88":C.pink,boxShadow:conn.is_active?"0 0 6px #29ff8880":"none"}}/>
                <span style={{fontSize:11,color:conn.is_active?"#29ff88":C.pink}}>{conn.is_active?"Active":"Inactive"}</span>
              </div>
              <div style={{display:"flex",gap:8}}>
                {conn.broker_type==="ctrader"&&(
                  <button className="btn bg" style={{fontSize:11,padding:"5px 12px",display:"flex",alignItems:"center",gap:5,opacity:syncing[conn.id]?0.6:1}} disabled={syncing[conn.id]} onClick={()=>syncConn(conn.id)}>
                    <IC n="refresh" s={11} c={C.textMuted}/>{syncing[conn.id]?"Syncing...":"Sync Now"}
                  </button>
                )}
                <button className="btn bg" style={{fontSize:11,padding:"5px 12px",display:"flex",alignItems:"center",gap:5,color:C.pink,borderColor:"rgba(233,30,167,.25)"}} onClick={()=>disconnectConn(conn.id)}>
                  <IC n="close" s={11} c={C.pink}/> Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info card */}
      <div className="mc" style={{marginTop:14,padding:"16px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
          <IC n="info" s={14} c={C.accent}/>
          <span style={{fontSize:12,fontWeight:600,color:C.text}}>How Auto-Sync Works</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
          {[
            {label:"cTrader",   desc:"OAuth 2.0 — authorize once, trades sync every 15 minutes automatically."},
            {label:"MT4 / MT5", desc:"Install our free Expert Advisor. Trades sync in real-time while your terminal is open."},
          ].map(b=>(
            <div key={b.label} style={{padding:"12px 14px",background:`${C.accent}06`,border:`1px solid ${C.border}`,borderRadius:6}}>
              <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:4}}>{b.label}</div>
              <div style={{fontSize:11,color:C.textDim,lineHeight:1.7}}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Add Account Modal ── */}
      {addOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={e=>{if(e.target===e.currentTarget)setAddOpen(false);}}>
          <div className="mc" style={{width:"100%",maxWidth:500,position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
            {/* Modal header */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <div style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:18,fontWeight:300,color:C.text}}>
                {addStep==="pick"&&"Choose Broker"}
                {addStep==="ct_oauth"&&"Connect cTrader"}
                {addStep==="ct_pick"&&"Select Account"}
                {addStep==="mt_setup"&&(mtConn?`${(brokerType||"").toUpperCase()} Setup`:`Connect ${(brokerType||"").toUpperCase()}`)}
                {addStep==="done"&&"Account Connected"}
              </div>
              <button onClick={()=>setAddOpen(false)} style={{background:"none",border:"none",cursor:"pointer",padding:4}}>
                <IC n="close" s={18} c={C.textDim}/>
              </button>
            </div>

            {err&&<div style={{padding:"10px 14px",background:"rgba(233,30,167,.08)",border:"1px solid rgba(233,30,167,.25)",borderRadius:6,fontSize:12,color:C.pink,marginBottom:14}}>{err}</div>}

            {/* Step: pick broker */}
            {addStep==="pick"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <p style={{fontSize:13,color:C.textMuted,marginBottom:4}}>Which platform do you trade on?</p>
                {[
                  {id:"ctrader",label:"cTrader",     desc:"Pepperstone, IC Markets, FunderPro, and most cTrader prop firms", color:C.accent},
                  {id:"mt4",    label:"MetaTrader 4", desc:"FTMO MT4, legacy forex brokers, most pre-2022 prop firms",         color:"#f59e0b"},
                  {id:"mt5",    label:"MetaTrader 5", desc:"Newer prop firms, futures + forex, equity brokers",                color:"#10b981"},
                ].map(b=>(
                  <div key={b.id} onClick={()=>{ setBrokerType(b.id); setAddStep(b.id==="ctrader"?"ct_oauth":"mt_setup_label"); }}
                    style={{padding:"14px 16px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:14}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=b.color+"80"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                    <div style={{width:38,height:38,borderRadius:6,background:`${b.color}18`,border:`1px solid ${b.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <IC n="broker" s={16} c={b.color}/>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{b.label}</div>
                      <div style={{fontSize:11,color:C.textDim}}>{b.desc}</div>
                    </div>
                    <IC n="chevron_r" s={14} c={C.textDim}/>
                  </div>
                ))}
              </div>
            )}

            {/* Step: MT4/MT5 label input */}
            {addStep==="mt_setup_label"&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <p style={{fontSize:13,color:C.textMuted}}>Name this {(brokerType||"").toUpperCase()} account so you can identify it in your journal.</p>
                <div>
                  <label style={{fontSize:11,color:C.textDim,display:"block",marginBottom:6}}>Account Label</label>
                  <input className="inp" value={accountLabel} onChange={e=>setAccountLabel(e.target.value)} placeholder={`e.g. FTMO ${(brokerType||"").toUpperCase()} Challenge`} style={{width:"100%",boxSizing:"border-box"}} onKeyDown={e=>{if(e.key==="Enter")createMtConn();}}/>
                </div>
                <button className="btn bp" style={{width:"100%",padding:"11px",fontSize:13,opacity:connecting?0.7:1}} disabled={connecting} onClick={createMtConn}>
                  {connecting?"Creating...":"Generate Webhook →"}
                </button>
                <button className="btn bg" style={{width:"100%",fontSize:12}} onClick={()=>setAddStep("pick")}>← Back</button>
              </div>
            )}

            {/* Step: MT4/MT5 credentials display */}
            {addStep==="mt_setup"&&mtConn&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div style={{padding:"12px 14px",background:"rgba(41,255,136,.06)",border:"1px solid rgba(41,255,136,.2)",borderRadius:7}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#29ff88",marginBottom:2}}>Connection created</div>
                  <div style={{fontSize:11,color:C.textDim}}>Paste these credentials into the EA, then install it in your terminal.</div>
                </div>
                {[{label:"Connection ID",value:mtConn.connectionId,key:"connId"},{label:"Webhook Secret",value:mtConn.webhookSecret,key:"secret"}].map(f=>(
                  <div key={f.key}>
                    <label style={{fontSize:11,color:C.textDim,display:"block",marginBottom:5}}>{f.label}</label>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <input readOnly value={f.value} className="inp" style={{flex:1,fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.accent}}/>
                      <button className="btn bg" style={{padding:"7px 10px",fontSize:11,flexShrink:0,display:"flex",alignItems:"center",gap:4}} onClick={()=>copyText(f.value,f.key)}>
                        <IC n={copied===f.key?"check":"copy"} s={12} c={copied===f.key?"#29ff88":C.textMuted}/>{copied===f.key?"Copied":"Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <button className="btn bg" style={{fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>downloadEa("FortitudeSync.mq4")}>
                    <IC n="download" s={12} c={C.accent}/> .mq4 (MT4)
                  </button>
                  <button className="btn bg" style={{fontSize:12,display:"flex",alignItems:"center",justifyContent:"center",gap:6}} onClick={()=>downloadEa("FortitudeSync.mq5")}>
                    <IC n="download" s={12} c={C.accent}/> .mq5 (MT5)
                  </button>
                </div>
                <div style={{padding:"12px 14px",background:C.surface,border:`1px solid ${C.border}`,borderRadius:7,fontSize:11,color:C.textDim,lineHeight:1.85}}>
                  <div style={{fontWeight:600,color:C.text,marginBottom:6}}>Setup Instructions</div>
                  <ol style={{paddingLeft:18,margin:0}}>
                    <li>Download the EA file above and open it in your terminal's MetaEditor</li>
                    <li>Paste your <strong style={{color:C.textMuted}}>Connection ID</strong> and <strong style={{color:C.textMuted}}>Webhook Secret</strong> into the input fields at the top</li>
                    <li>In {(brokerType||"MT4").toUpperCase()}: <strong style={{color:C.textMuted}}>Tools → Options → Expert Advisors</strong> → enable "Allow WebRequest" and add <code style={{color:C.accent,fontSize:10}}>https://api.fortitude.trade</code></li>
                    <li>Attach the EA to any chart — it syncs trades automatically while your terminal is open</li>
                  </ol>
                </div>
                <button className="btn bp" style={{width:"100%",fontSize:12}} onClick={()=>setAddOpen(false)}>Done →</button>
              </div>
            )}

            {/* Step: cTrader OAuth button */}
            {addStep==="ct_oauth"&&(
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div style={{padding:"14px 16px",background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:8}}>
                  <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:6}}>Secure OAuth 2.0</div>
                  <div style={{fontSize:11,color:C.textDim,lineHeight:1.7}}>You'll authorize via cTrader's official page. We never see your credentials — only a secure access token is stored, encrypted at rest.</div>
                </div>
                <div>
                  <label style={{fontSize:11,color:C.textDim,display:"block",marginBottom:6}}>Account Label (optional)</label>
                  <input className="inp" value={accountLabel} onChange={e=>setAccountLabel(e.target.value)} placeholder="e.g. Pepperstone Live" style={{width:"100%",boxSizing:"border-box"}}/>
                </div>
                <button className="btn bp" style={{width:"100%",padding:"12px",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:connecting?0.7:1}} disabled={connecting} onClick={connectCtrader}>
                  <IC n="external" s={14} c="#000"/>{connecting?"Waiting for authorization...":"Connect with cTrader"}
                </button>
                <button className="btn bg" style={{width:"100%",fontSize:12}} onClick={()=>setAddStep("pick")}>← Back</button>
              </div>
            )}

            {/* Step: cTrader account picker */}
            {addStep==="ct_pick"&&(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <p style={{fontSize:13,color:C.textMuted}}>Select the account you want to connect:</p>
                <div style={{display:"flex",flexDirection:"column",gap:8,maxHeight:280,overflowY:"auto"}}>
                  {ctAccounts.map(a=>(
                    <div key={a.ctAccountId} onClick={()=>setCtSelectedId(a.ctAccountId)}
                      style={{padding:"12px 14px",borderRadius:7,border:`1px solid ${ctSelectedId===a.ctAccountId?C.accent:C.border}`,background:ctSelectedId===a.ctAccountId?`${C.accent}10`:C.surface,cursor:"pointer",transition:"all .15s",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:C.text}}>{a.brokerName||`Account ${a.login}`}</div>
                        <div style={{fontSize:11,color:C.textDim}}>Login: {a.login} · {a.currency} · {a.isLive?"Live":"Demo"}</div>
                      </div>
                      <div style={{fontSize:14,fontWeight:600,color:C.accent,fontFamily:"JetBrains Mono,monospace"}}>
                        {a.balance!=null?`$${parseFloat(a.balance).toFixed(2)}`:"—"}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn bp" style={{width:"100%",padding:"11px",fontSize:13,opacity:connecting||!ctSelectedId?0.7:1}} disabled={connecting||!ctSelectedId} onClick={saveCtrader}>
                  {connecting?"Connecting...":"Connect Selected Account →"}
                </button>
                <button className="btn bg" style={{width:"100%",fontSize:12}} onClick={()=>setAddStep("ct_oauth")}>← Back</button>
              </div>
            )}

            {/* Step: done */}
            {addStep==="done"&&(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{width:52,height:52,borderRadius:"50%",background:"rgba(41,255,136,.1)",border:"1px solid rgba(41,255,136,.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                  <IC n="check" s={24} c="#29ff88"/>
                </div>
                <div style={{fontSize:16,fontWeight:600,color:C.text,marginBottom:8}}>Account Connected</div>
                <div style={{fontSize:13,color:C.textMuted,marginBottom:24,lineHeight:1.7,maxWidth:360,margin:"0 auto 24px"}}>
                  Your cTrader account is connected. Trades are syncing now and will update automatically every 15 minutes.
                </div>
                <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                  <button className="btn bp" style={{fontSize:12,padding:"10px 20px"}} onClick={()=>{setAddOpen(false);setPage("journal");}}>Open Journal →</button>
                  <button className="btn bg" style={{fontSize:12,padding:"10px 16px"}} onClick={()=>setAddOpen(false)}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Journal = ({ setPage, currentTier, user }) => {
  const token = localStorage.getItem("fis_token");

  // ── State ───────────────────────────────────────────────────────────────
  const [view,          setView]          = useState("overview");
  const [trades,        setTrades]        = useState([]);
  const [tradesLoading, setTradesLoading] = useState(false);
  const [calMonth,      setCalMonth]      = useState(() => { const d=new Date(); return {y:d.getFullYear(),m:d.getMonth()}; });
  const [selectedDay,   setSelectedDay]   = useState(null);
  const [filterInstr,   setFilterInstr]   = useState("All");
  const [filterDir,     setFilterDir]     = useState("All");
  const [filterSession, setFilterSession] = useState("All");
  const [filterResult,  setFilterResult]  = useState("All");
  const [filterAccount, setFilterAccount] = useState("All");
  const [filterFrom,    setFilterFrom]    = useState("");
  const [filterTo,      setFilterTo]      = useState("");
  const [sortField,     setSortField]     = useState("open_time");
  const [sortDir,       setSortDir]       = useState("desc");
  const BLANK = { instrument:"", direction:"long", entry_price:"", exit_price:"", lot_size:"1", net_pl:"", commission:"0", stop_loss:"", take_profit:"", r_multiple:"", session_tag:"ny", timeframe:"15m", opened_at:"", closed_at:"", emotional_state:"", category:"", tags:"", thesis:"", notes:"", account_name:"" };
  const [formOpen,      setFormOpen]      = useState(false);
  const [formMode,      setFormMode]      = useState("add");
  const [form,          setForm]          = useState(BLANK);
  const [formSaving,    setFormSaving]    = useState(false);
  const [formErr,       setFormErr]       = useState("");
  const [editId,        setEditId]        = useState(null);
  const [detailTrade,   setDetailTrade]   = useState(null);
  const [deleteId,      setDeleteId]      = useState(null);
  const [deleting,      setDeleting]      = useState(false);
  const [csvStep,       setCsvStep]       = useState("idle");
  const [csvTrades,     setCsvTrades]     = useState(null);
  const [dragOver,      setDragOver]      = useState(false);
  const [fileError,     setFileError]     = useState(null);
  const [fileName,      setFileName]      = useState(null);
  const [importMsg,     setImportMsg]     = useState("");
  const fileRef = useRef(null);

  // ── Load trades ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) return;
    setTradesLoading(true);
    api.get("/journal/trades?limit=500", token)
      .then(d => { if (d.success) setTrades((d.data.trades||[]).map(apiTradeToLocal)); })
      .catch(()=>{})
      .finally(()=>setTradesLoading(false));
  }, [token]);

  const apiTradeToLocal = t => ({
    id:              t.id,
    instrument:      t.instrument,
    trade_type:      t.direction === "long" ? "Long" : "Short",
    open_price:      parseFloat(t.entryPrice||t.entry_price||0),
    close_price:     (t.exitPrice||t.exit_price) ? parseFloat(t.exitPrice||t.exit_price) : null,
    open_time:       t.openedAt||t.opened_at||null,
    close_time:      t.closedAt||t.closed_at||null,
    volume:          parseFloat(t.lotSize||t.lot_size||0),
    profit:          parseFloat(t.netPl??t.net_pl??0),
    commission:      parseFloat(t.commission||0),
    stop_loss:       t.stopLoss||t.stop_loss||null,
    take_profit:     t.takeProfit||t.take_profit||null,
    r_multiple:      t.rMultiple||t.r_multiple||null,
    session:         (t.sessionTag||t.session_tag) ? ((s=>s.charAt(0).toUpperCase()+s.slice(1))(t.sessionTag||t.session_tag)) : "—",
    timeframe:       t.timeframe||null,
    emotional_state: t.emotionalState||t.emotional_state||null,
    category:        t.category||null,
    tags:            t.tags||[],
    thesis:          t.thesis||null,
    notes:           t.notes||null,
    account_name:    t.accountName||t.account_name||null,
    is_open:         !(t.closedAt||t.closed_at),
  });

  // ── Derived ───────────────────────────────────────────────────────────────
  const closedTrades = trades.filter(t=>!t.is_open);
  const openTrades   = trades.filter(t=>t.is_open);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const wins      = closedTrades.filter(t=>t.profit>0).length;
  const losses    = closedTrades.filter(t=>t.profit<0).length;
  const breakeven = closedTrades.filter(t=>t.profit===0).length;
  const winRate   = closedTrades.length>0 ? ((wins/closedTrades.length)*100).toFixed(1) : "0.0";
  const totalPnl  = closedTrades.reduce((a,t)=>a+t.profit,0);
  const grossWin  = closedTrades.filter(t=>t.profit>0).reduce((a,t)=>a+t.profit,0);
  const grossLoss = Math.abs(closedTrades.filter(t=>t.profit<0).reduce((a,t)=>a+t.profit,0));
  const pf        = grossLoss>0 ? (grossWin/grossLoss).toFixed(2) : "∞";
  const avgWin    = wins>0   ? (grossWin/wins).toFixed(2)    : "0.00";
  const avgLoss   = losses>0 ? (grossLoss/losses).toFixed(2) : "0.00";
  const avgRR     = (() => { const rs=closedTrades.filter(t=>t.r_multiple); return rs.length>0?(rs.reduce((a,t)=>a+(t.r_multiple||0),0)/rs.length).toFixed(2):"—"; })();
  const maxDD     = (() => { let peak=0,dd=0,run=0; [...closedTrades].sort((a,b)=>new Date(a.open_time)-new Date(b.open_time)).forEach(t=>{ run+=t.profit; if(run>peak)peak=run; if(peak-run>dd)dd=peak-run; }); return dd.toFixed(2); })();

  // ── Analytics ─────────────────────────────────────────────────────────────
  const DOW_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const byDow = DOW_LABELS.map((_,i) => {
    const jsDay = i===6?0:i+1;
    const ts = closedTrades.filter(t=>t.open_time && new Date(t.open_time).getDay()===jsDay);
    const w  = ts.filter(t=>t.profit>0).length;
    return { label:DOW_LABELS[i], count:ts.length, pnl:ts.reduce((a,t)=>a+t.profit,0), wr:ts.length>0?Math.round((w/ts.length)*100):0 };
  });
  const byHour = Array.from({length:24},(_,h) => {
    const ts = closedTrades.filter(t=>t.open_time && new Date(t.open_time).getHours()===h);
    return { hour:h, count:ts.length, pnl:ts.reduce((a,t)=>a+t.profit,0) };
  });
  const byInstrument = [...new Set(closedTrades.map(t=>t.instrument))].map(inst => {
    const ts=closedTrades.filter(t=>t.instrument===inst);
    const w=ts.filter(t=>t.profit>0).length;
    const gw=ts.filter(t=>t.profit>0).reduce((a,t)=>a+t.profit,0);
    const gl=Math.abs(ts.filter(t=>t.profit<0).reduce((a,t)=>a+t.profit,0));
    return { inst, count:ts.length, wr:Math.round((w/ts.length)*100), pnl:ts.reduce((a,t)=>a+t.profit,0), pf:gl>0?(gw/gl).toFixed(2):"∞", avgW:w>0?(gw/w).toFixed(2):"0.00", avgL:(ts.length-w)>0?(gl/(ts.length-w)).toFixed(2):"0.00" };
  }).sort((a,b)=>b.pnl-a.pnl);
  const byMonth = (() => {
    const map={};
    closedTrades.forEach(t=>{ if(!t.open_time) return; const d=new Date(t.open_time); const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; if(!map[key]) map[key]={label:d.toLocaleDateString("en-GB",{month:"short",year:"numeric"}),pnl:0,count:0,wins:0}; map[key].pnl+=t.profit; map[key].count++; if(t.profit>0) map[key].wins++; });
    return Object.entries(map).sort((a,b)=>a[0].localeCompare(b[0])).map(([,v])=>v);
  })();
  const { curStreak, maxWinStreak, maxLossStreak } = (() => {
    const sorted=[...closedTrades].sort((a,b)=>new Date(a.open_time)-new Date(b.open_time));
    let cur=0,maxW=0,maxL=0,runW=0,runL=0;
    sorted.forEach(t=>{ if(t.profit>0){runW++;runL=0;if(runW>maxW)maxW=runW;cur=runW;}else{runL++;runW=0;if(runL>maxL)maxL=runL;cur=-runL;} });
    return {curStreak:cur,maxWinStreak:maxW,maxLossStreak:maxL};
  })();

  // ── Equity curve ──────────────────────────────────────────────────────────
  const equityCurve = (() => { let run=0; return [...closedTrades].sort((a,b)=>new Date(a.open_time)-new Date(b.open_time)).map(t=>{run+=t.profit;return run;}); })();

  // ── Calendar ──────────────────────────────────────────────────────────────
  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const calDays = (() => {
    const {y,m}=calMonth;
    const first=new Date(y,m,1).getDay(); const days=new Date(y,m+1,0).getDate(); const pad=first===0?6:first-1; const result=[];
    for(let i=0;i<pad;i++) result.push(null);
    for(let d=1;d<=days;d++){const iso=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;const dayTrades=closedTrades.filter(t=>t.open_time&&t.open_time.startsWith(iso));const dayPnl=dayTrades.reduce((a,t)=>a+t.profit,0);result.push({d,iso,trades:dayTrades,pnl:dayPnl,hasData:dayTrades.length>0});}
    return result;
  })();
  const monthPnl = calDays.reduce((a,d)=>a+(d?d.pnl:0),0);

  // ── Filters ───────────────────────────────────────────────────────────────
  const instruments   = ["All",...new Set(trades.map(t=>t.instrument).filter(Boolean))];
  const accountNames  = ["All",...new Set(trades.map(t=>t.account_name).filter(Boolean))];
  const filteredTrades = [...trades]
    .filter(t=>filterInstr==="All"||t.instrument===filterInstr)
    .filter(t=>filterDir==="All"||(filterDir==="Long"&&t.trade_type==="Long")||(filterDir==="Short"&&t.trade_type==="Short"))
    .filter(t=>filterSession==="All"||t.session.toLowerCase()===filterSession.toLowerCase())
    .filter(t=>{ if(filterResult==="All") return true; if(filterResult==="Win") return t.profit>0; if(filterResult==="Loss") return t.profit<0; if(filterResult==="Breakeven") return t.profit===0; return true; })
    .filter(t=>filterAccount==="All"||t.account_name===filterAccount)
    .filter(t=>!filterFrom||!t.open_time||t.open_time>=filterFrom)
    .filter(t=>!filterTo  ||!t.open_time||t.open_time<=filterTo+"T23:59:59")
    .sort((a,b)=>{ const va=sortField==="open_time"?new Date(a.open_time||0):sortField==="profit"?a.profit:a[sortField]||0; const vb=sortField==="open_time"?new Date(b.open_time||0):sortField==="profit"?b.profit:b[sortField]||0; return sortDir==="asc"?(va>vb?1:-1):(va<vb?1:-1); });

  // ── Helpers ───────────────────────────────────────────────────────────────
  const calcDur = t => { if(!t.close_time||t.is_open) return "Open"; const ms=new Date(t.close_time)-new Date(t.open_time); const m=Math.floor(ms/60000); return m<60?`${m}m`:`${Math.floor(m/60)}h ${m%60}m`; };
  const fmtDate = iso => iso?new Date(iso).toLocaleDateString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—";
  const fmtP    = v => v!=null?parseFloat(v).toFixed(5):"—";

  const SortTh = ({field,label}) => (
    <th onClick={()=>{ if(sortField===field) setSortDir(d=>d==="asc"?"desc":"asc"); else{setSortField(field);setSortDir("desc");} }}
      style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:sortField===field?C.accent:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase",whiteSpace:"nowrap",cursor:"pointer",userSelect:"none"}}>
      {label}{sortField===field&&<span style={{marginLeft:4}}>{sortDir==="asc"?"↑":"↓"}</span>}
    </th>
  );

  // ── Export CSV ────────────────────────────────────────────────────────────
  const exportCSV = () => {
    const hdrs=["Date","Instrument","Direction","Entry","Exit","Lots","P&L","Commission","Session","Timeframe","Duration","R-Multiple","Tags","Notes"];
    const rows=filteredTrades.map(t=>[fmtDate(t.open_time),t.instrument,t.trade_type,t.open_price||"",t.close_price||"",t.volume||"",t.profit?.toFixed(2)||"",t.commission?.toFixed(2)||"",t.session,t.timeframe||"",calcDur(t),t.r_multiple||"",(Array.isArray(t.tags)?t.tags.join(";"):t.tags)||"",`"${(t.notes||"").replace(/"/g,'""')}"`]);
    const csv=[hdrs,...rows].map(r=>r.join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    const a=document.createElement("a"); a.href=url; a.download=`fortitude_trades_${new Date().toISOString().split("T")[0]}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  // ── Manual entry ──────────────────────────────────────────────────────────
  const openAdd = () => { const now=new Date(); now.setSeconds(0,0); setForm({...BLANK,opened_at:now.toISOString().slice(0,16)}); setEditId(null); setFormMode("add"); setFormErr(""); setFormOpen(true); };
  const openEdit = t => {
    setForm({ instrument:t.instrument||"", direction:t.trade_type==="Long"?"long":"short", entry_price:t.open_price||"", exit_price:t.close_price||"", lot_size:t.volume||"", net_pl:t.profit||"", commission:t.commission||"0", stop_loss:t.stop_loss||"", take_profit:t.take_profit||"", r_multiple:t.r_multiple||"", session_tag:(t.session||"ny").toLowerCase(), timeframe:t.timeframe||"15m", opened_at:t.open_time?t.open_time.slice(0,16):"", closed_at:t.close_time?t.close_time.slice(0,16):"", emotional_state:t.emotional_state||"", category:t.category||"", tags:Array.isArray(t.tags)?t.tags.join(", "):(t.tags||""), thesis:t.thesis||"", notes:t.notes||"", account_name:t.account_name||"" });
    setEditId(t.id); setFormMode("edit"); setFormErr(""); setFormOpen(true);
  };
  const saveForm = async () => {
    if(!form.instrument.trim()||!form.entry_price){setFormErr("Instrument and entry price are required.");return;}
    setFormSaving(true); setFormErr("");
    const payload={ instrument:form.instrument.trim().toUpperCase(), direction:form.direction, entry_price:parseFloat(form.entry_price), exit_price:form.exit_price?parseFloat(form.exit_price):null, lot_size:parseFloat(form.lot_size)||1, net_pl:form.net_pl?parseFloat(form.net_pl):null, commission:parseFloat(form.commission)||0, stop_loss:form.stop_loss?parseFloat(form.stop_loss):null, take_profit:form.take_profit?parseFloat(form.take_profit):null, r_multiple:form.r_multiple?parseFloat(form.r_multiple):null, session_tag:form.session_tag||null, timeframe:form.timeframe||null, opened_at:form.opened_at?new Date(form.opened_at).toISOString():new Date().toISOString(), closed_at:form.closed_at?new Date(form.closed_at).toISOString():null, emotional_state:form.emotional_state||null, category:form.category||null, tags:form.tags?form.tags.split(",").map(s=>s.trim()).filter(Boolean):[], thesis:form.thesis||null, notes:form.notes||null, account_name:form.account_name||null };
    try {
      const data = formMode==="add" ? await api.post("/journal/trades",payload,token) : await api.put(`/journal/trades/${editId}`,payload,token);
      if(data.success){
        const saved=apiTradeToLocal(data.data.trade);
        if(formMode==="add") setTrades(prev=>[saved,...prev]);
        else { setTrades(prev=>prev.map(t=>t.id===editId?saved:t)); if(detailTrade?.id===editId) setDetailTrade(saved); }
        setFormOpen(false);
      } else setFormErr(data.error?.message||"Failed to save trade.");
    } catch { setFormErr("Unable to connect. Please try again."); }
    finally { setFormSaving(false); }
  };
  const deleteTrade = async () => {
    if(!deleteId) return; setDeleting(true);
    try { const data=await api.del(`/journal/trades/${deleteId}`,token); if(data.success){setTrades(prev=>prev.filter(t=>t.id!==deleteId));if(detailTrade?.id===deleteId)setDetailTrade(null);setDeleteId(null);} }
    catch {} finally { setDeleting(false); }
  };

  // ── CSV import ────────────────────────────────────────────────────────────
  const handleFile = file => {
    if (!file || !file.name.endsWith(".csv")) { setFileError("Please upload a CSV file."); return; }
    setFileName(file.name); setFileError(null); setCsvStep("parsing");
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const { headers, rows } = parseCSV(e.target.result);
        const platform = detectPlatform(headers);
        if (!platform) { setCsvStep("idle"); setFileError("Could not detect broker format. Supported: MT4/MT5, cTrader, Tradovate."); return; }
        const parsed = normaliseTrades(rows, platform);
        if (!parsed.length) { setCsvStep("idle"); setFileError("No valid trades found in this file."); return; }
        setCsvTrades(parsed); setCsvStep("preview");
      } catch { setCsvStep("idle"); setFileError("Failed to read file. Please check it's a valid CSV."); }
    };
    reader.readAsText(file);
  };
  const confirmImport = async () => {
    if (!csvTrades?.length) return;
    setCsvStep("importing"); setImportMsg("");
    try {
      const payload = csvTrades.map(t => ({ instrument:t.instrument, direction:(t.type||"").toLowerCase().includes("buy")||(t.type||"").toLowerCase().includes("long")?"long":"short", entry_price:t.openPrice||0, exit_price:t.closePrice||null, lot_size:t.size||1, net_pl:(t.profit||0)+(t.commission||0)+(t.swap||0), commission:Math.abs(t.commission||0), session_tag:(t.session||"").toLowerCase()||null, opened_at:t.openTime||new Date().toISOString(), closed_at:t.closeTime||null }));
      const data = await api.post("/journal/import", { trades: payload }, token);
      if (data.success) { setTrades(prev=>[...(data.data?.trades||[]).map(apiTradeToLocal),...prev]); setCsvStep("done"); setImportMsg(`Successfully imported ${data.data.imported} trade${data.data.imported!==1?"s":""}.`); }
      else { setCsvStep("preview"); setImportMsg(data.error?.message||"Import failed."); }
    } catch { setCsvStep("preview"); setImportMsg("Unable to connect. Please try again."); }
  };

  const VIEWS = [
    {id:"overview",  label:"Overview",  icon:"dashboard"},
    {id:"analytics", label:"Analytics", icon:"activity"},
    {id:"trades",    label:"Trade Log", icon:"list"},
    {id:"calendar",  label:"Calendar",  icon:"cal"},
    {id:"import",    label:"Import CSV",icon:"upload"},
  ];

  return (
    <div className="fi">
      {/* ── Page header ── */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontFamily:"'Counter-Strike',sans-serif",fontSize:24,fontWeight:300,color:C.text,marginBottom:4}}>Performance Journal</h1>
          <p style={{fontSize:13,color:C.textMuted}}>Trade history · Performance analytics · Account calendar</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button className="btn bg" style={{fontSize:11,padding:"7px 12px",display:"flex",alignItems:"center",gap:6}} onClick={exportCSV}>
            <IC n="download" s={11} c={C.textMuted}/> Export CSV
          </button>
          <button className="btn bp" style={{fontSize:11,padding:"7px 14px",display:"flex",alignItems:"center",gap:6}} onClick={openAdd}>
            <IC n="plus" s={11} c="#000"/> Add Trade
          </button>
        </div>
      </div>

      {/* ── Sub-nav ── */}
      <div style={{display:"flex",gap:2,marginBottom:18,borderBottom:`1px solid ${C.border}`,overflowX:"auto",scrollbarWidth:"none"}}>
        {VIEWS.map(v=>(
          <div key={v.id} onClick={()=>setView(v.id)} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",cursor:"pointer",fontSize:12,fontWeight:500,color:view===v.id?C.accent:C.textMuted,borderBottom:`2px solid ${view===v.id?C.accent:"transparent"}`,marginBottom:-1,transition:"all .15s",whiteSpace:"nowrap"}}>
            <IC n={v.icon} s={13} c={view===v.id?C.accent:C.textDim}/>
            {v.label}
          </div>
        ))}
        {openTrades.length>0&&(
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:6,paddingRight:4}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#29ff88",boxShadow:"0 0 5px #29ff88"}}/>
            <span style={{fontSize:11,color:C.textDim}}>{openTrades.length} open</span>
          </div>
        )}
      </div>

      {/* ════════ OVERVIEW ════════ */}
      {view==="overview"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10}}>
            {[
              {l:"Win Rate",     v:`${winRate}%`,          sub:`${wins}W · ${losses}L · ${breakeven}BE`,   c:parseFloat(winRate)>=50?C.accent:C.pink},
              {l:"Net P&L",      v:`${totalPnl>=0?"+":""}$${Math.abs(totalPnl).toFixed(2)}`, sub:"All closed trades", c:totalPnl>=0?C.accent:C.pink},
              {l:"Profit Factor",v:pf,                     sub:"Gross win/loss ratio",                     c:parseFloat(pf)>=1.5?C.accent:parseFloat(pf)>=1?C.textMuted:C.pink},
              {l:"Avg Win",      v:`$${avgWin}`,           sub:"Per winning trade",                        c:C.accent},
              {l:"Avg Loss",     v:`-$${avgLoss}`,         sub:"Per losing trade",                         c:C.pink},
              {l:"Max Drawdown", v:`-$${maxDD}`,           sub:"Largest equity dip",                       c:C.pink},
              {l:"Avg R:R",      v:avgRR,                  sub:"R-multiple (tagged trades)",               c:C.textMuted},
              {l:"Total Trades", v:closedTrades.length,    sub:`${openTrades.length} open`,                c:C.text},
            ].map(m=>(
              <div key={m.l} className="mc" style={{padding:"12px 14px"}}>
                <div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{m.l}</div>
                <div style={{fontSize:18,fontWeight:600,color:m.c,fontFamily:"JetBrains Mono,monospace",lineHeight:1,marginBottom:3}}>{m.v}</div>
                <div style={{fontSize:9,color:C.textDim}}>{m.sub}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {[
              {l:"Current Streak",    v:curStreak>0?`+${curStreak}W`:curStreak<0?`${Math.abs(curStreak)}L`:"—", c:curStreak>0?C.accent:curStreak<0?C.pink:C.textDim},
              {l:"Best Win Streak",   v:`${maxWinStreak}W`,  c:C.accent},
              {l:"Worst Loss Streak", v:`${maxLossStreak}L`, c:C.pink},
            ].map(m=>(
              <div key={m.l} className="mc" style={{padding:"12px 14px",textAlign:"center"}}>
                <div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".06em",marginBottom:5}}>{m.l}</div>
                <div style={{fontSize:22,fontWeight:700,color:m.c,fontFamily:"JetBrains Mono,monospace"}}>{m.v}</div>
              </div>
            ))}
          </div>
          <div className="mc" style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <IC n="activity" s={13} c={C.accent}/>
              <div className="sl" style={{margin:0}}>Equity Curve</div>
              <span style={{fontSize:10,color:totalPnl>=0?C.accent:C.pink,marginLeft:"auto"}}>{totalPnl>=0?"+":""}{totalPnl.toFixed(2)}</span>
            </div>
            {equityCurve.length>1?(()=>{
              const W=500,H=100,mn=Math.min(...equityCurve),mx=Math.max(...equityCurve),pad=mx-mn<1?10:0;
              const pts=equityCurve.map((v,i)=>`${(i/(equityCurve.length-1))*W},${H-((v-mn+pad)/((mx-mn+pad*2)||1))*(H-8)-4}`).join(" ");
              const lastV=equityCurve[equityCurve.length-1];
              return(
                <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",height:100}}>
                  <polyline fill="none" stroke={lastV>=0?"#29a8ff":"#e91ea7"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts}/>
                  <polyline fill={lastV>=0?"rgba(41,168,255,0.08)":"rgba(233,30,167,0.08)"} stroke="none" points={`0,${H} ${pts} ${W},${H}`}/>
                  <line x1={0} y1={H-((0-mn+pad)/((mx-mn+pad*2)||1))*(H-8)-4} x2={W} y2={H-((0-mn+pad)/((mx-mn+pad*2)||1))*(H-8)-4} stroke="rgba(255,255,255,.1)" strokeWidth=".5" strokeDasharray="3,4"/>
                </svg>
              );
            })():<div style={{height:100,display:"flex",alignItems:"center",justifyContent:"center",color:C.textDim,fontSize:12}}>No closed trades yet — add your first trade to see your equity curve.</div>}
          </div>
          {openTrades.length>0&&(
            <div className="mc" style={{padding:"16px 20px",borderColor:"rgba(41,255,136,.15)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#29ff88",boxShadow:"0 0 5px #29ff88"}}/>
                <div className="sl" style={{margin:0,color:"#29ff88"}}>Open Positions</div>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Instrument","Direction","Entry","Size","Session","Duration"].map(h=>(
                    <th key={h} style={{padding:"5px 8px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {openTrades.map(t=>(
                    <tr key={t.id} style={{borderBottom:`1px solid rgba(255,255,255,.04)`,cursor:"pointer"}} onClick={()=>setDetailTrade(t)}>
                      <td style={{padding:"7px 8px",fontWeight:600,color:C.text}}>{t.instrument}</td>
                      <td style={{padding:"7px 8px"}}><span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:t.trade_type==="Long"?"rgba(41,168,255,.1)":"rgba(233,30,167,.1)",color:t.trade_type==="Long"?C.accent:C.pink,border:`1px solid ${t.trade_type==="Long"?"rgba(41,168,255,.25)":"rgba(233,30,167,.25)"}`}}>{t.trade_type}</span></td>
                      <td style={{padding:"7px 8px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textMuted}}>{fmtP(t.open_price)}</td>
                      <td style={{padding:"7px 8px",color:C.textMuted}}>{t.volume}</td>
                      <td style={{padding:"7px 8px",color:C.textDim}}>{t.session}</td>
                      <td style={{padding:"7px 8px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textDim}}>{calcDur(t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ════════ ANALYTICS ════════ */}
      {view==="analytics"&&(
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {closedTrades.length===0?(
            <div className="mc" style={{padding:"40px 28px",textAlign:"center"}}>
              <IC n="activity" s={28} c={C.textDim}/>
              <p style={{fontSize:14,color:C.textMuted,marginTop:12}}>No closed trades yet. Add trades to see analytics.</p>
            </div>
          ):(<>
          {/* DOW */}
          <div className="mc" style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
              <IC n="cal" s={13} c={C.accent}/>
              <div className="sl" style={{margin:0}}>Performance by Day of Week</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8}}>
              {byDow.map(d=>{
                const maxAbs=Math.max(...byDow.map(x=>Math.abs(x.pnl)),1);
                const barH=Math.max(4,Math.abs(d.pnl/maxAbs)*80);
                return(
                  <div key={d.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{fontSize:10,color:d.pnl>=0?C.accent:C.pink,fontFamily:"JetBrains Mono,monospace",minHeight:16}}>{d.count>0?(d.pnl>=0?"+":"")+(d.pnl.toFixed(0)):""}</div>
                    <div style={{height:80,display:"flex",alignItems:"flex-end"}}>
                      <div style={{width:28,height:barH,background:d.count===0?"rgba(255,255,255,.06)":d.pnl>=0?"rgba(41,168,255,.5)":"rgba(233,30,167,.5)",borderRadius:"3px 3px 0 0"}}/>
                    </div>
                    <div style={{fontSize:10,color:C.textMuted,fontWeight:500}}>{d.label}</div>
                    <div style={{fontSize:9,color:C.textDim}}>{d.count>0?`${d.wr}% WR`:""}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Hourly heatmap */}
          <div className="mc" style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <IC n="clock" s={13} c={C.accent}/>
              <div className="sl" style={{margin:0}}>Trade Activity by Hour (UTC)</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(24,1fr)",gap:3}}>
              {byHour.map(h=>{
                const maxC=Math.max(...byHour.map(x=>x.count),1);
                const op=h.count>0?0.15+0.7*(h.count/maxC):0.04;
                const col=h.pnl>=0?"rgba(41,168,255,":"rgba(233,30,167,";
                return(
                  <div key={h.hour} title={`${String(h.hour).padStart(2,"0")}:00 — ${h.count} trades`}
                    style={{height:32,borderRadius:3,background:`${col}${op})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {h.count>0&&<div style={{fontSize:7,color:C.textDim}}>{h.count}</div>}
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
              {[0,6,12,18,23].map(h=>(
                <span key={h} style={{fontSize:8,color:C.textDim}}>{String(h).padStart(2,"0")}:00</span>
              ))}
            </div>
          </div>
          {/* Instrument breakdown */}
          <div className="mc" style={{padding:"16px 20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <IC n="chart" s={13} c={C.accent}/>
              <div className="sl" style={{margin:0}}>Instrument Breakdown</div>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Instrument","Trades","Win Rate","Net P&L","Profit Factor","Avg Win","Avg Loss"].map(h=>(
                    <th key={h} style={{padding:"6px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {byInstrument.map(r=>(
                    <tr key={r.inst} style={{borderBottom:`1px solid rgba(255,255,255,.04)`}}>
                      <td style={{padding:"8px 10px",fontWeight:600,color:C.text}}>{r.inst}</td>
                      <td style={{padding:"8px 10px",color:C.textMuted}}>{r.count}</td>
                      <td style={{padding:"8px 10px",color:r.wr>=50?C.accent:C.pink}}>{r.wr}%</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",fontWeight:600,color:r.pnl>=0?C.accent:C.pink}}>{r.pnl>=0?"+":""}{r.pnl.toFixed(2)}</td>
                      <td style={{padding:"8px 10px",color:parseFloat(r.pf)>=1?C.accent:C.pink}}>{r.pf}</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",color:C.accent}}>+{r.avgW}</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",color:C.pink}}>-{r.avgL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Monthly P&L */}
          {byMonth.length>0&&(
            <div className="mc" style={{padding:"16px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                <IC n="cal" s={13} c={C.accent}/>
                <div className="sl" style={{margin:0}}>Monthly P&L</div>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Month","Trades","Win Rate","Net P&L"].map(h=>(
                    <th key={h} style={{padding:"6px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {byMonth.map((r,i)=>(
                    <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,.04)`}}>
                      <td style={{padding:"8px 10px",color:C.textMuted}}>{r.label}</td>
                      <td style={{padding:"8px 10px",color:C.textMuted}}>{r.count}</td>
                      <td style={{padding:"8px 10px",color:r.wins/r.count>=.5?C.accent:C.pink}}>{Math.round((r.wins/r.count)*100)}%</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",fontWeight:600,color:r.pnl>=0?C.accent:C.pink}}>{r.pnl>=0?"+":""}{r.pnl.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </>)}
        </div>
      )}

      {/* ════════ TRADE LOG ════════ */}
      {view==="trades"&&(
        <div>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
            {[
              {label:"Account",     val:filterAccount, set:setFilterAccount, opts:accountNames},
              {label:"Instrument",  val:filterInstr,   set:setFilterInstr,   opts:instruments},
              {label:"Direction",   val:filterDir,     set:setFilterDir,     opts:["All","Long","Short"]},
              {label:"Session",     val:filterSession, set:setFilterSession, opts:["All","London","Ny","Asia"]},
              {label:"Result",      val:filterResult,  set:setFilterResult,  opts:["All","Win","Loss","Breakeven"]},
            ].filter(f=>f.label!=="Account"||accountNames.length>1).map(f=>(
              <div key={f.label} style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:11,color:C.textDim}}>{f.label}</span>
                <select value={f.val} onChange={e=>f.set(e.target.value)} style={{background:"rgba(13,16,24,.8)",border:`1px solid ${C.border}`,borderRadius:4,color:C.text,fontSize:11,padding:"5px 8px"}}>
                  {f.opts.map(o=><option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:11,color:C.textDim}}>From</span>
              <input type="date" value={filterFrom} onChange={e=>setFilterFrom(e.target.value)} style={{background:"rgba(13,16,24,.8)",border:`1px solid ${C.border}`,borderRadius:4,color:C.text,fontSize:11,padding:"4px 8px"}}/>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:11,color:C.textDim}}>To</span>
              <input type="date" value={filterTo} onChange={e=>setFilterTo(e.target.value)} style={{background:"rgba(13,16,24,.8)",border:`1px solid ${C.border}`,borderRadius:4,color:C.text,fontSize:11,padding:"4px 8px"}}/>
            </div>
            {(filterInstr!=="All"||filterDir!=="All"||filterSession!=="All"||filterResult!=="All"||filterAccount!=="All"||filterFrom||filterTo)&&(
              <button className="btn bg" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>{setFilterInstr("All");setFilterDir("All");setFilterSession("All");setFilterResult("All");setFilterAccount("All");setFilterFrom("");setFilterTo("");}}>Clear</button>
            )}
            <span style={{fontSize:11,color:C.textDim,marginLeft:"auto"}}>{filteredTrades.length} trades</span>
          </div>
          <div className="mc" style={{padding:0,overflow:"hidden"}}>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead>
                  <tr style={{background:"rgba(13,16,24,.6)",borderBottom:`1px solid ${C.border}`}}>
                    <SortTh field="open_time" label="Date"/>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>Instrument</th>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>Dir.</th>
                    <SortTh field="open_price" label="Entry"/>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>Exit</th>
                    <SortTh field="volume" label="Lots"/>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>TF</th>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>Session</th>
                    <th style={{padding:"7px 10px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase"}}>R</th>
                    <SortTh field="profit" label="Net P&L"/>
                    <th style={{padding:"7px 10px",fontSize:9,color:C.textDim}}></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTrades.length===0&&(
                    <tr><td colSpan={11} style={{padding:"32px",textAlign:"center",color:C.textDim,fontSize:12}}>
                      {trades.length===0?`No trades yet — click "Add Trade" to log your first trade.`:"No trades match the current filters."}
                    </td></tr>
                  )}
                  {filteredTrades.map(t=>(
                    <tr key={t.id} style={{borderBottom:`1px solid rgba(255,255,255,.04)`,cursor:"pointer",transition:"background .1s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.02)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                      onClick={()=>setDetailTrade(t)}>
                      <td style={{padding:"8px 10px",color:C.textDim,fontSize:10,fontFamily:"JetBrains Mono,monospace",whiteSpace:"nowrap"}}>{fmtDate(t.open_time)}</td>
                      <td style={{padding:"8px 10px",fontWeight:600,color:C.text}}>{t.instrument}</td>
                      <td style={{padding:"8px 10px"}}><span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:t.trade_type==="Long"?"rgba(41,168,255,.1)":"rgba(233,30,167,.1)",color:t.trade_type==="Long"?C.accent:C.pink,border:`1px solid ${t.trade_type==="Long"?"rgba(41,168,255,.25)":"rgba(233,30,167,.25)"}`}}>{t.trade_type}</span></td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textMuted}}>{fmtP(t.open_price)}</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textMuted}}>{t.close_price?fmtP(t.close_price):"—"}</td>
                      <td style={{padding:"8px 10px",color:C.textMuted,fontSize:10}}>{t.volume||"—"}</td>
                      <td style={{padding:"8px 10px",color:C.textDim,fontSize:10}}>{t.timeframe||"—"}</td>
                      <td style={{padding:"8px 10px",color:C.textDim,fontSize:10}}>{t.session}</td>
                      <td style={{padding:"8px 10px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textDim}}>{t.r_multiple?`${t.r_multiple}R`:"—"}</td>
                      <td style={{padding:"8px 10px",fontWeight:700,fontFamily:"JetBrains Mono,monospace",color:t.profit>=0?C.accent:C.pink,whiteSpace:"nowrap"}}>{t.profit>=0?"+":""}{t.profit.toFixed(2)}</td>
                      <td style={{padding:"8px 10px"}} onClick={e=>e.stopPropagation()}>
                        <div style={{display:"flex",gap:4}}>
                          <button className="btn bg" style={{fontSize:9,padding:"3px 7px"}} onClick={()=>openEdit(t)}>Edit</button>
                          <button className="btn bg" style={{fontSize:9,padding:"3px 7px",color:C.pink}} onClick={()=>setDeleteId(t.id)}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════ CALENDAR ════════ */}
      {view==="calendar"&&(
        <div>
          <div className="mc" style={{padding:"14px 18px",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <button className="btn bg" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setCalMonth(p=>{const d=new Date(p.y,p.m-1);return{y:d.getFullYear(),m:d.getMonth()};})}>‹</button>
                <h2 style={{fontSize:16,fontWeight:500,color:C.text}}>{MONTH_NAMES[calMonth.m]} {calMonth.y}</h2>
                <button className="btn bg" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>setCalMonth(p=>{const d=new Date(p.y,p.m+1);return{y:d.getFullYear(),m:d.getMonth()};})}>›</button>
                <button className="btn bg" style={{fontSize:11,padding:"5px 10px"}} onClick={()=>{const d=new Date();setCalMonth({y:d.getFullYear(),m:d.getMonth()});}}>Today</button>
              </div>
              <span style={{fontSize:12,fontWeight:600,color:monthPnl>=0?C.accent:C.pink,fontFamily:"JetBrains Mono,monospace"}}>Month: {monthPnl>=0?"+":""}{monthPnl.toFixed(2)}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:4}}>
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
                <div key={d} style={{textAlign:"center",fontSize:10,color:C.textDim,fontWeight:600,padding:"4px 0",letterSpacing:".05em"}}>{d}</div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
              {calDays.map((day,i)=>{
                if(!day) return <div key={`pad-${i}`}/>;
                const isToday=day.iso===new Date().toISOString().split("T")[0];
                const isSelected=selectedDay?.iso===day.iso;
                return(
                  <div key={day.iso} onClick={()=>setSelectedDay(isSelected?null:day)}
                    style={{minHeight:56,padding:"6px 8px",borderRadius:6,cursor:day.hasData?"pointer":"default",background:isSelected?"rgba(41,168,255,.12)":day.hasData?"rgba(255,255,255,.03)":"transparent",border:`1px solid ${isSelected?"rgba(41,168,255,.35)":isToday?"rgba(255,255,255,.18)":day.hasData?"rgba(255,255,255,.07)":"transparent"}`,transition:"all .15s"}}>
                    <div style={{fontSize:11,fontWeight:isToday?600:400,color:isToday?C.accent:C.textMuted,marginBottom:4}}>{day.d}</div>
                    {day.hasData&&<>
                      <div style={{fontSize:11,fontWeight:600,fontFamily:"JetBrains Mono,monospace",color:day.pnl>=0?C.accent:C.pink,lineHeight:1}}>{day.pnl>=0?"+":""}{day.pnl.toFixed(0)}</div>
                      <div style={{fontSize:9,color:C.textDim,marginTop:2}}>{day.trades.length}T</div>
                    </>}
                  </div>
                );
              })}
            </div>
          </div>
          {selectedDay?.hasData&&(
            <div className="mc" style={{padding:"16px 20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                <IC n="cal" s={13} c={C.accent}/>
                <div className="sl" style={{margin:0}}>{new Date(selectedDay.iso+"T12:00:00").toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
                <span style={{marginLeft:"auto",fontSize:12,fontWeight:600,color:selectedDay.pnl>=0?C.accent:C.pink,fontFamily:"JetBrains Mono,monospace"}}>{selectedDay.pnl>=0?"+":""}{selectedDay.pnl.toFixed(2)}</span>
              </div>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  {["Instrument","Direction","Entry","Exit","Lots","Session","Duration","Net P&L"].map(h=>(
                    <th key={h} style={{padding:"5px 8px",textAlign:"left",fontSize:9,color:C.textDim,fontWeight:500,textTransform:"uppercase",letterSpacing:".05em"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {selectedDay.trades.map(t=>(
                    <tr key={t.id} style={{borderBottom:`1px solid rgba(255,255,255,.04)`,cursor:"pointer"}} onClick={()=>setDetailTrade(t)}>
                      <td style={{padding:"7px 8px",fontWeight:600,color:C.text}}>{t.instrument}</td>
                      <td style={{padding:"7px 8px"}}><span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:t.trade_type==="Long"?"rgba(41,168,255,.1)":"rgba(233,30,167,.1)",color:t.trade_type==="Long"?C.accent:C.pink,border:`1px solid ${t.trade_type==="Long"?"rgba(41,168,255,.25)":"rgba(233,30,167,.25)"}`}}>{t.trade_type}</span></td>
                      <td style={{padding:"7px 8px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textMuted}}>{fmtP(t.open_price)}</td>
                      <td style={{padding:"7px 8px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textMuted}}>{t.close_price?fmtP(t.close_price):"—"}</td>
                      <td style={{padding:"7px 8px",color:C.textMuted}}>{t.volume}</td>
                      <td style={{padding:"7px 8px",color:C.textDim}}>{t.session}</td>
                      <td style={{padding:"7px 8px",fontFamily:"JetBrains Mono,monospace",fontSize:10,color:C.textDim}}>{calcDur(t)}</td>
                      <td style={{padding:"7px 8px",fontWeight:600,fontFamily:"JetBrains Mono,monospace",color:t.profit>=0?C.accent:C.pink}}>{t.profit>=0?"+":""}{t.profit.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ════════ IMPORT CSV ════════ */}
      {view==="import"&&(
        <div style={{maxWidth:680}}>
          {csvStep!=="done"&&(
            <div className="mc" style={{padding:"24px 28px",textAlign:"center",marginBottom:16}}>
              <IC n="upload" s={28} c={C.accent}/>
              <h3 style={{fontSize:16,fontWeight:500,color:C.text,margin:"12px 0 6px"}}>Import from CSV</h3>
              <p style={{fontSize:13,color:C.textMuted,marginBottom:20,lineHeight:1.6}}>Export your trade history from MT4/MT5, cTrader, Tradovate, FTMO, or any broker as a CSV file and upload it here.</p>
              <div onDrop={e=>{e.preventDefault();setDragOver(false);handleFile(e.dataTransfer.files[0]);}} onDragOver={e=>{e.preventDefault();setDragOver(true);}} onDragLeave={()=>setDragOver(false)} onClick={()=>fileRef.current?.click()}
                style={{border:`2px dashed ${dragOver?"rgba(41,168,255,.5)":"rgba(255,255,255,.12)"}`,borderRadius:8,padding:"28px 20px",cursor:"pointer",background:dragOver?"rgba(41,168,255,.05)":"transparent",transition:"all .2s",marginBottom:16}}>
                <IC n="upload" s={20} c={dragOver?C.accent:C.textDim}/>
                <div style={{fontSize:13,color:dragOver?C.accent:C.textMuted,marginTop:8}}>{fileName||"Drop CSV file here or click to browse"}</div>
                <div style={{fontSize:11,color:C.textDim,marginTop:4}}>MT4, MT5, cTrader, Tradovate, FTMO supported</div>
                <input ref={fileRef} type="file" accept=".csv" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
              </div>
              {fileError&&<div style={{fontSize:12,color:C.pink,marginBottom:8}}>{fileError}</div>}
              {importMsg&&<div style={{fontSize:12,color:C.pink,marginBottom:8}}>{importMsg}</div>}
              {csvStep==="parsing"&&<div style={{fontSize:12,color:C.textMuted}}>Parsing file…</div>}
              <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:16,flexWrap:"wrap"}}>
                {["MetaTrader 4/5","cTrader","Tradovate","FTMO","TopStep","MyForexFunds"].map(p=>(
                  <span key={p} style={{fontSize:10,padding:"3px 8px",borderRadius:3,background:"rgba(255,255,255,.04)",color:C.textDim,border:"1px solid rgba(255,255,255,.07)"}}>{p}</span>
                ))}
              </div>
            </div>
          )}
          {(csvStep==="preview"||csvStep==="importing")&&csvTrades?.length>0&&(
            <div className="mc" style={{padding:"20px 22px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div>
                  <div className="sl" style={{margin:0}}>Preview — {csvTrades.length} trades detected</div>
                  <div style={{fontSize:11,color:C.textDim,marginTop:2}}>Review before importing.</div>
                </div>
                <button className="btn bp" style={{opacity:csvStep==="importing"?.6:1}} onClick={confirmImport} disabled={csvStep==="importing"}>
                  {csvStep==="importing"?"Importing…":`Import ${csvTrades.length} Trades`}
                </button>
              </div>
              <div style={{overflowX:"auto",maxHeight:300,overflowY:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"rgba(255,255,255,.03)"}}>
                    {["Instrument","Type","Size","Open","Close","P&L","Session"].map(h=>(
                      <th key={h} style={{padding:"6px 10px",textAlign:"left",fontSize:9,color:C.textDim,letterSpacing:".05em",textTransform:"uppercase"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {csvTrades.slice(0,20).map((t,i)=>(
                      <tr key={i} style={{borderBottom:`1px solid ${C.border}`}}>
                        <td style={{padding:"6px 10px",fontSize:11,color:C.text}}>{t.instrument}</td>
                        <td style={{padding:"6px 10px",fontSize:11,color:(t.type||"").toLowerCase().includes("buy")?"#29ff88":C.pink}}>{t.type}</td>
                        <td style={{padding:"6px 10px",fontSize:11,fontFamily:"JetBrains Mono,monospace"}}>{t.size}</td>
                        <td style={{padding:"6px 10px",fontSize:11,fontFamily:"JetBrains Mono,monospace",color:C.textMuted}}>{t.openPrice?.toFixed(5)}</td>
                        <td style={{padding:"6px 10px",fontSize:11,fontFamily:"JetBrains Mono,monospace",color:C.textMuted}}>{t.closePrice?.toFixed(5)}</td>
                        <td style={{padding:"6px 10px",fontSize:11,fontFamily:"JetBrains Mono,monospace",color:(t.profit||0)>=0?C.accent:C.pink}}>{((t.profit||0)+(t.commission||0)).toFixed(2)}</td>
                        <td style={{padding:"6px 10px",fontSize:11,color:C.textDim}}>{t.session||"—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {csvTrades.length>20&&<div style={{fontSize:11,color:C.textDim,padding:"8px 10px",textAlign:"center"}}>+{csvTrades.length-20} more trades…</div>}
              </div>
            </div>
          )}
          {csvStep==="done"&&(
            <div className="mc" style={{padding:"32px 28px",textAlign:"center"}}>
              <IC n="check" s={32} c={C.accent}/>
              <h3 style={{fontSize:16,fontWeight:500,color:C.text,margin:"12px 0 6px"}}>Import Complete</h3>
              <p style={{fontSize:13,color:C.textMuted,marginBottom:20}}>{importMsg}</p>
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <button className="btn bp" onClick={()=>setView("overview")}>View Journal</button>
                <button className="btn bg" onClick={()=>{setCsvStep("idle");setCsvTrades(null);setFileName(null);setImportMsg("");}}>Import Another</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════ TRADE DETAIL PANEL ════════ */}
      {detailTrade&&(
        <div style={{position:"fixed",top:0,right:0,bottom:0,width:420,background:"rgba(8,10,16,.97)",borderLeft:`1px solid ${C.border}`,zIndex:200,overflowY:"auto",backdropFilter:"blur(12px)"}}>
          <div style={{padding:"20px 22px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:18,fontWeight:700,color:C.text}}>{detailTrade.instrument}</div>
              <div style={{display:"flex",gap:8,marginTop:4,alignItems:"center"}}>
                <span style={{fontSize:11,padding:"2px 8px",borderRadius:3,background:detailTrade.trade_type==="Long"?"rgba(41,168,255,.15)":"rgba(233,30,167,.15)",color:detailTrade.trade_type==="Long"?C.accent:C.pink,border:`1px solid ${detailTrade.trade_type==="Long"?"rgba(41,168,255,.3)":"rgba(233,30,167,.3)"}`}}>{detailTrade.trade_type}</span>
                {detailTrade.is_open&&<span style={{fontSize:10,padding:"2px 8px",borderRadius:3,background:"rgba(41,255,136,.08)",color:"#29ff88",border:"1px solid rgba(41,255,136,.2)"}}>Open</span>}
              </div>
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <button className="btn bg" style={{fontSize:11,padding:"6px 12px"}} onClick={()=>openEdit(detailTrade)}>Edit</button>
              <button className="btn bg" style={{fontSize:11,padding:"6px 12px",color:C.pink}} onClick={()=>{setDeleteId(detailTrade.id);setDetailTrade(null);}}>Delete</button>
              <button className="btn bg" style={{fontSize:11,padding:"6px 10px"}} onClick={()=>setDetailTrade(null)}>✕</button>
            </div>
          </div>
          <div style={{padding:"20px 22px"}}>
            <div style={{fontSize:28,fontWeight:700,color:detailTrade.profit>=0?C.accent:C.pink,fontFamily:"JetBrains Mono,monospace",marginBottom:4}}>{detailTrade.profit>=0?"+":""}{detailTrade.profit.toFixed(2)}</div>
            <div style={{fontSize:11,color:C.textDim,marginBottom:20}}>Net P&L</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
              {[
                {l:"Entry Price", v:fmtP(detailTrade.open_price)},
                {l:"Exit Price",  v:detailTrade.close_price?fmtP(detailTrade.close_price):"—"},
                {l:"Lot Size",    v:detailTrade.volume||"—"},
                {l:"R-Multiple",  v:detailTrade.r_multiple?`${detailTrade.r_multiple}R`:"—"},
                {l:"Stop Loss",   v:detailTrade.stop_loss?fmtP(detailTrade.stop_loss):"—"},
                {l:"Take Profit", v:detailTrade.take_profit?fmtP(detailTrade.take_profit):"—"},
                {l:"Session",     v:detailTrade.session},
                {l:"Timeframe",   v:detailTrade.timeframe||"—"},
                {l:"Duration",    v:calcDur(detailTrade)},
                {l:"Commission",  v:detailTrade.commission?.toFixed(2)||"0.00"},
                {l:"Open Time",   v:fmtDate(detailTrade.open_time)},
                {l:"Close Time",  v:fmtDate(detailTrade.close_time)},
              ].map(r=>(
                <div key={r.l} style={{background:"rgba(255,255,255,.03)",borderRadius:6,padding:"10px 12px"}}>
                  <div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{r.l}</div>
                  <div style={{fontSize:13,color:C.textMuted,fontFamily:"JetBrains Mono,monospace"}}>{r.v}</div>
                </div>
              ))}
            </div>
            {detailTrade.emotional_state&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Emotional State</div><div style={{fontSize:12,color:C.textMuted,textTransform:"capitalize"}}>{detailTrade.emotional_state}</div></div>}
            {detailTrade.category&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Category</div><div style={{fontSize:12,color:C.textMuted}}>{detailTrade.category}</div></div>}
            {detailTrade.tags?.length>0&&(
              <div style={{marginBottom:12}}>
                <div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Tags</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(Array.isArray(detailTrade.tags)?detailTrade.tags:[detailTrade.tags]).filter(Boolean).map(tag=>(
                    <span key={tag} style={{fontSize:10,padding:"3px 8px",borderRadius:3,background:"rgba(41,168,255,.08)",color:C.accent,border:"1px solid rgba(41,168,255,.2)"}}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
            {detailTrade.thesis&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Thesis</div><div style={{fontSize:12,color:C.textMuted,lineHeight:1.6,background:"rgba(255,255,255,.03)",borderRadius:6,padding:"10px 12px"}}>{detailTrade.thesis}</div></div>}
            {detailTrade.notes&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Notes</div><div style={{fontSize:12,color:C.textMuted,lineHeight:1.6,background:"rgba(255,255,255,.03)",borderRadius:6,padding:"10px 12px"}}>{detailTrade.notes}</div></div>}
            {detailTrade.account_name&&<div style={{marginBottom:12}}><div style={{fontSize:9,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>Account</div><div style={{fontSize:12,color:C.textMuted}}>{detailTrade.account_name}</div></div>}
          </div>
        </div>
      )}

      {/* ════════ ADD / EDIT MODAL ════════ */}
      {formOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}} onClick={()=>setFormOpen(false)}>
          <div style={{background:"rgba(13,16,24,.98)",border:`1px solid ${C.border}`,borderRadius:10,padding:"24px 28px",width:"100%",maxWidth:580,maxHeight:"90vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
              <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:0}}>{formMode==="add"?"Add Trade":"Edit Trade"}</h3>
              <button className="btn bg" style={{fontSize:12,padding:"5px 10px"}} onClick={()=>setFormOpen(false)}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {col:"1/-1",label:"Instrument *",key:"instrument",type:"text",placeholder:"e.g. EURUSD, XAUUSD, NAS100"},
              ].map(f=>(
                <div key={f.key} style={{gridColumn:f.col}}>
                  <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>{f.label}</label>
                  <input value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                    style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Direction *</label>
                <select value={form.direction} onChange={e=>setForm(p=>({...p,direction:e.target.value}))} style={{width:"100%",background:"rgba(13,16,24,.9)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px"}}>
                  <option value="long">Long</option><option value="short">Short</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Lot Size</label>
                <input type="number" step="0.01" value={form.lot_size} onChange={e=>setForm(p=>({...p,lot_size:e.target.value}))} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              {[
                {label:"Entry Price *",key:"entry_price"},{label:"Exit Price",key:"exit_price"},
                {label:"Net P&L ($)",key:"net_pl"},{label:"Commission ($)",key:"commission"},
                {label:"Stop Loss",key:"stop_loss"},{label:"Take Profit",key:"take_profit"},
                {label:"R-Multiple",key:"r_multiple",placeholder:"e.g. 2.5"},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>{f.label}</label>
                  <input type="number" step="any" value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder}
                    style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
                </div>
              ))}
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Session</label>
                <select value={form.session_tag} onChange={e=>setForm(p=>({...p,session_tag:e.target.value}))} style={{width:"100%",background:"rgba(13,16,24,.9)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px"}}>
                  <option value="london">London</option><option value="ny">NY</option><option value="asia">Asia</option><option value="ny_london">NY/London</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Timeframe</label>
                <select value={form.timeframe} onChange={e=>setForm(p=>({...p,timeframe:e.target.value}))} style={{width:"100%",background:"rgba(13,16,24,.9)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px"}}>
                  {["1m","3m","5m","15m","30m","1h","4h","1d","1w"].map(tf=><option key={tf} value={tf}>{tf}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Open Time</label>
                <input type="datetime-local" value={form.opened_at} onChange={e=>setForm(p=>({...p,opened_at:e.target.value}))} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Close Time</label>
                <input type="datetime-local" value={form.closed_at} onChange={e=>setForm(p=>({...p,closed_at:e.target.value}))} style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Emotional State</label>
                <select value={form.emotional_state} onChange={e=>setForm(p=>({...p,emotional_state:e.target.value}))} style={{width:"100%",background:"rgba(13,16,24,.9)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px"}}>
                  <option value="">— Select —</option>
                  {["Calm","Confident","Anxious","Fearful","Greedy","FOMO","Disciplined","Impulsive","Neutral"].map(s=><option key={s} value={s.toLowerCase()}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Category / Setup</label>
                <input value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} placeholder="e.g. Breakout, Mean Reversion"
                  style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Tags (comma separated)</label>
                <input value={form.tags} onChange={e=>setForm(p=>({...p,tags:e.target.value}))} placeholder="e.g. ICT, SMC, supply zone"
                  style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Account Name</label>
                <input value={form.account_name} onChange={e=>setForm(p=>({...p,account_name:e.target.value}))} placeholder="e.g. FTMO Challenge, Live Account 1"
                  style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",boxSizing:"border-box"}}/>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Trade Thesis</label>
                <textarea value={form.thesis} onChange={e=>setForm(p=>({...p,thesis:e.target.value}))} rows={3} placeholder="Why did you take this trade? What was your reasoning?"
                  style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <label style={{fontSize:10,color:C.textDim,textTransform:"uppercase",letterSpacing:".05em",display:"block",marginBottom:4}}>Post-Trade Notes</label>
                <textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={3} placeholder="What did you learn? What went well or wrong?"
                  style={{width:"100%",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:12,padding:"8px 10px",resize:"vertical",fontFamily:"inherit",boxSizing:"border-box"}}/>
              </div>
            </div>
            {formErr&&<div style={{fontSize:12,color:C.pink,marginTop:12}}>{formErr}</div>}
            <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}>
              <button className="btn bg" style={{padding:"8px 18px"}} onClick={()=>setFormOpen(false)}>Cancel</button>
              <button className="btn bp" style={{padding:"8px 18px",opacity:formSaving?.6:1}} onClick={saveForm} disabled={formSaving}>
                {formSaving?"Saving…":formMode==="add"?"Add Trade":"Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ DELETE CONFIRM ════════ */}
      {deleteId&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:310,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>
          <div style={{background:"rgba(13,16,24,.98)",border:`1px solid rgba(233,30,167,.3)`,borderRadius:10,padding:"28px 32px",maxWidth:380,textAlign:"center"}}>
            <IC n="warning" s={28} c={C.pink}/>
            <h3 style={{fontSize:16,fontWeight:600,color:C.text,margin:"12px 0 8px"}}>Delete Trade?</h3>
            <p style={{fontSize:13,color:C.textMuted,marginBottom:20}}>This action cannot be undone.</p>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button className="btn bg" style={{padding:"8px 18px"}} onClick={()=>setDeleteId(null)}>Cancel</button>
              <button className="btn bg" style={{padding:"8px 18px",color:C.pink,borderColor:"rgba(233,30,167,.3)",opacity:deleting?.6:1}} onClick={deleteTrade} disabled={deleting}>
                {deleting?"Deleting…":"Delete Trade"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


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
          <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Cognitive Intelligence</h1>
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
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:18 }}>
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
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:4 }}>
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
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
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


const ATR_DATA = { baseline30d: 0, current: 0, instrument: "N/A" };


const BehavioralTimeline = () => (
  <div style={{ padding:"18px 0 6px", textAlign:"center", color:C.textDim, fontSize:11 }}>
    Log trades to build your behavioral timeline.
  </div>
);


const BrokerLogo = ({ broker, size = 36 }) => {
  const bt = BROKER_TYPES.find(b => b.id === broker) || { logo:"?", color:C.textDim };
  return (
    <div style={{
      width:size, height:size, borderRadius:6, flexShrink:0,
      background:`${bt.color}18`, border:`1px solid ${bt.color}40`,
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <span className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:size*0.4, color:bt.color }}>{bt.logo}</span>
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
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
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
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
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


const INIT_SESSIONS = [];


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
              {m.r==="u"&&<div style={{fontFamily:"'Counter-Strike',sans-serif", width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><span className="df" style={{ fontSize:12,color:C.accent }}>J</span></div>}
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
          <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Performance Coach</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Private · Structured · Analytical</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:560 }}>An interactive performance calibration system. Not motivation. Not therapy. Structured accountability for discipline, risk consistency, and behavioral correction.</p>
      </div>
      <div style={{ background:"rgba(233,30,167,.06)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14 }}>
        <span className="pu" style={{ width:6,height:6,borderRadius:"50%",background:C.pink,display:"inline-block",flexShrink:0 }}/>
        <div style={{ flex:1 }}><span style={{ fontSize:13,color:C.text }}>Journal detected 2 consecutive losses this week. </span><span style={{ fontSize:13,color:C.textMuted }}>A structured post-loss debrief may be appropriate.</span></div>
        <button className="btn bg" style={{ fontSize:11,borderColor:C.pinkDim,color:C.pink,flexShrink:0 }} onClick={()=>startSession("post-loss")}>Initiate Debrief</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:18,marginBottom:20 }}>
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
// ── PART 1: Revenge Trading Detection ────────────────────────────────────────
function computeVolatilityAlignment(atrData, avgRiskSize) {
  const expansion = atrData.baseline30d > 0
    ? (atrData.current - atrData.baseline30d) / atrData.baseline30d
    : 0;
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
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:12 }}>
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
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
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
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }}>
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
          <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300 }}>Behavioral Intelligence</h1>
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
            <div className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:24,color:pdiMeta.color,fontWeight:300,marginBottom:6 }}>{pdiMeta.label}</div>
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
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18 }}>
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
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18 }}>
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
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14 }}>
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

const Education = () => {
  const [active, setActive] = useState(null);
  const courses=[{id:1,title:"Beginner Trading Course",lessons:12,done:12,pct:100,tier:"Free",tc:"ta"},{id:2,title:"Beginner Crypto Course",lessons:8,done:5,pct:63,tier:"Free",tc:"ta"},{id:3,title:"Fortitude Market Framework",lessons:24,done:16,pct:68,tier:"FMF Owner",tc:"tg2"},{id:4,title:"Workshop Series",lessons:6,done:0,pct:0,tier:"Mentorship",tc:"tb"},{id:5,title:"Mentorship Content",lessons:18,done:0,pct:0,tier:"Mentorship",tc:"tb",locked:true}];
  const TITLES=["Introduction to Market Structure","Understanding Timeframes","Liquidity Theory Fundamentals","Order Flow Concepts","Structural Bias Identification","Entry Framework Architecture","Risk Definition Methodology","Session Mechanics","Inducement Recognition","Scenario Construction","Trade Management Framework","Review & Application"];
  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Education Framework</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Structured progression. Foundational to advanced market methodology.</p>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:20 }}>
        <div>
          <div className="sl">Course Library</div>
          {courses.map(c=>(
            <div key={c.id} className="mc" style={{ marginBottom:10,cursor:c.locked?"default":"pointer",opacity:c.locked?.55:1,borderColor:active===c.id?C.accentDim:undefined }} onClick={()=>!c.locked&&setActive(c.id===active?null:c.id)}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  {c.locked&&<IC n="lock" s={12} c={C.textDim}/>}
                  <span style={{ fontSize:13,color:C.text }}>{c.title}</span>
                </div>
                <span className={`tg ${c.tc}`}>{c.tier}</span>
              </div>
              <div className="pb" style={{ marginBottom:6 }}><div className="pf" style={{ width:`${c.pct}%` }}/></div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:C.textDim }}><span>{c.done}/{c.lessons} lessons</span><span>{c.pct}%</span></div>
            </div>
          ))}
        </div>
        <div>
          {active?(
            <div className="fi">
              <div className="sl">{courses.find(c=>c.id===active)?.title} — Lesson Index</div>
              <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
                {Array.from({length:courses.find(c=>c.id===active)?.lessons||6},(_,i)=>{
                  const done=i<(courses.find(c=>c.id===active)?.done||0);
                  return (<div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 16px",borderBottom:`1px solid ${C.border}`,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ width:24,height:24,borderRadius:"50%",background:done?C.accent:C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {done?<IC n="check" s={11} c={C.bg}/>:<span style={{ fontSize:10,color:C.textDim }}>{i+1}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize:13,color:done?C.text:C.textMuted }}>Lesson {i+1} — {TITLES[i%12]}</div>
                      <div style={{ fontSize:11,color:C.textDim,marginTop:2 }}>Video · PDF Reference</div>
                    </div>
                    {done&&<span className="tg ta" style={{ marginLeft:"auto" }}>Complete</span>}
                  </div>);
                })}
              </div>
            </div>
          ):(
            <div style={{ height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:40,background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,backdropFilter:"blur(8px)" }}>
              <IC n="edu" s={32} c={C.textDim}/>
              <div style={{ color:C.textDim,fontSize:13,marginTop:16,lineHeight:1.8 }}>Select a course to view lesson index and track progression</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EconomicCalendar = () => {
  return (
    <div className="fi" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>
      <div style={{ marginBottom:16, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28, fontWeight:300, marginBottom:4}}>Economic Calendar</h1>
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
  { id:1, u:"Admin", tag:"Admin", tc:"td", avatar:"A", time:"00:00", text:"Welcome to the Fortitude community. Keep all discussions analytical and framework-based.", reactions:[] },
];

const AVATAR_COLORS = ["#29a8ff","#e91ea7","#c8a96e","#7c6aff","#3ecf8e","#ff6b6b"];

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

  // ═══════════════════════════════════════════════════
  // MACRO FUNDAMENTALS COURSE — Lessons 3001-3021
  // ═══════════════════════════════════════════════════
  3001: {id:3001,title:`Introduction: The Macro Control System`,type:"lesson",duration:"8m",content:`The Federal Reserve controls markets through interest rates, Quantitative Easing (QE — where the Fed creates money to buy bonds, injecting cash into the financial system) and Quantitative Tightening (QT — the reverse of QE, where the Fed reduces its bond holdings to drain cash from the system), and forward guidance. Markets move on expectations — not current data. By the time the Fed acts, professionals have already positioned. Your edge: know what the market expects, then trade the deviation. Core rule: "Macro provides the narrative. FMF provides the execution."`},
  3002: {id:3002,title:`How Central Banks Control Markets`,type:"lesson",duration:"7m",content:`The Fed transmits rate changes through a chain: Fed decision → bond yields reprice → USD moves → capital flows shift → gold reprices. Forward guidance (dot plot (a chart published by the Fed eight times per year showing each Fed member's anonymous projection for where interest rates will be in 1, 2, and 3 years — shifts in the dot plot signal changes in Fed thinking before any actual rate move)s, speeches, Jackson Hole (an annual economic symposium in Wyoming attended by the world's top central bankers — Fed speeches here often signal major policy shifts months in advance)) moves markets months before actual policy changes. The USD is a relative currency — comparative policy between the Fed, ECB (European Central Bank), BOJ (Bank of Japan), and BOE (Bank of England) determines its direction. Gold is priced in USD, so USD weakness = gold strength even without any change in gold demand.`},
  3003: {id:3003,title:`Driver 1: Interest Rates`,type:"lesson",duration:"8m",content:`Interest rates are the price of money. Rising rates: USD bullish (higher yield attracts capital), Gold bearish (higher opportunity cost — gold pays 0%). Falling rates: USD bearish, Gold bullish. The key: gold is a non-yielding asset. When you can earn 5% in a US treasury, why hold gold at 0%? When rates fall to 0% with 6% inflation, gold becomes one of the only real stores of value. Rate differential trades: when the US hikes and others hold, USD surges. Execution: short gold on rallies in a hike cycle, long gold on dips in a cut cycle.`},
  3004: {id:3004,title:`Driver 2: Inflation (CPI (Consumer Price Index — the monthly government report measuring how much prices have risen across a basket of everyday goods and services))`,type:"lesson",duration:"8m",content:`CPI measures the rate of price increases. Fed target: 2%. When CPI beats expectations → hawkish surprise → USD spikes, gold drops. When CPI misses → dovish surprise → USD drops, gold surges. The direction of inflation matters more than the level: CPI falling from 9% to 7% is dovish (gold bullish) even though inflation is still high. The conflict: high inflation both forces rate hikes (bearish gold) and creates demand for inflation hedges (bullish gold). Resolution: check real rates — if rates rise faster than inflation, gold falls. If inflation rises faster than rates, gold rises.`},
  3005: {id:3005,title:`Driver 3: Employment (NFP & Unemployment)`,type:"lesson",duration:"7m",content:`NFP (Non-Farm Payrolls — the monthly jobs report showing how many new jobs were added to the US economy, excluding farm workers) is released the first Friday of every month — the single most-watched data release globally. Strong NFP → Fed can stay hawkish → USD bullish, gold bearish. Weak NFP → Fed must cut → USD bearish, gold bullish. Average Hourly Earnings matter too — rising wages = inflationary pressure = hawkish signal. Stagflation exception: if employment weakens AND inflation is rising, the Fed is trapped → gold's best environment. Trading NFP: never trade the initial spike. Wait 15-30 minutes for the dust to settle, then trade the confirmed direction on a retracement.`},
  3006: {id:3006,title:`Driver 4: Economic Growth (GDP (Gross Domestic Product — the total value of all goods and services produced in a country, used to measure economic growth))`,type:"lesson",duration:"6m",content:`GDP measures total economic output, reported quarterly. Strong growth: USD bullish, gold bearish (risk-on, less safe haven demand). Weak growth/recession: USD bearish, gold bullish. The risk-on/risk-off framework: risk-on = stocks up, gold down; risk-off = stocks down, gold up. Exception: in risk-off, both USD and gold can rise together as capital flees risk assets globally. Watch ISM PMI (Institute for Supply Management Purchasing Managers' Index) (Purchasing Managers' Index — a monthly business survey where a reading above 50 means expansion, below 50 means contraction) monthly — below 50 for multiple months signals recession risk and is a strong gold bull catalyst. GDP data itself rarely creates big moves; the monthly ISM and Retail Sales that predict GDP are more tradeable.`},
  3007: {id:3007,title:`Driver 5: Geopolitical Risk`,type:"lesson",duration:"6m",content:`Safe haven hierarchy: US Treasuries → USD → Gold → JPY (Japanese Yen) / CHF (Swiss Franc). Geopolitical crisis can cause both USD and gold to rise simultaneously as capital flees all risk assets. Short-term effects: gold spikes 2-4%, VIX (the CBOE — Chicago Board Options Exchange — Volatility Index — known as the "fear gauge," it measures how much volatility the market expects over the next 30 days; a rising VIX signals increasing fear and uncertainty) surges, initial moves are often overstretched. Long-term effects: depend on whether the conflict changes macro fundamentals (inflation/growth). Wars are inflationary (military spending, supply disruptions) — sustained support for gold. Russia-Ukraine 2022: gold spiked to $2,000, then fell as the Fed's aggressive hiking cycle (exacerbated by war-driven inflation) dominated. Key rule: never chase the initial spike. Wait for the retracement, assess macro impact, then position.`},
  3008: {id:3008,title:`Rate Hike Cycles`,type:"lesson",duration:"8m",content:`A tightening cycle unfolds in three phases. Phase 1 (pre-hike): Fed turns hawkish, USD starts strengthening, gold starts weakening — months before the first hike. Phase 2 (active hiking): consecutive hikes, USD continues up, gold faces sustained headwinds. Phase 3 (late cycle): economy slows, market prices the terminal rate — USD peaks and softens, gold bottoms and recovers in anticipation of cuts. Critical insight: USD often peaks BEFORE the last rate hike. In 2022-2023, DXY (the US Dollar Index — a measure of the dollar's strength against a basket of six major currencies: EUR (Euro), JPY (Japanese Yen), GBP (British Pound), CAD (Canadian Dollar), SEK (Swedish Krona), and CHF (Swiss Franc)) peaked in September 2022 and fell 12% even as the Fed kept hiking until July 2023. Markets are forward-looking — trade the anticipation, not the event.`},
  3009: {id:3009,title:`Rate Cut Cycles`,type:"lesson",duration:"7m",content:`An easing cycle is gold's best environment. Phase 1 (pre-cut): Fed turns dovish, gold starts rallying months before the first cut. Phase 2 (active cutting): USD weakens, gold trends strongly higher, bond yields fall. Phase 3 (deep easing): ZIRP (Zero Interest Rate Policy — when the central bank holds rates at or near 0%) + QE, real rates go negative, gold enters powerful multi-year bull market. Negative real rates are the single most powerful catalyst for gold. 2020-2021: Fed cut to 0%, launched $4+ trillion QE. Real rates deeply negative. Gold rallied from $1,500 to $2,075 — all-time high. Trading cut cycles: strong gold longs on any dip, sell USD rallies. These trends last months to years. Risk: in deep recessions, gold initially falls in panic liquidation. That initial crash is a buying opportunity.`},
  3010: {id:3010,title:`Rate Pauses: Hawkish vs Dovish`,type:"lesson",duration:"10m",content:`A pause is NEVER neutral. Hawkish pause: Fed stops hiking but signals rates will stay elevated ("higher for longer"). USD bullish, gold bearish — high opportunity cost persists. Language: "premature to declare victory on inflation," "prepared to act further if needed." Dovish pause: Fed stops hiking and signals cuts are coming ("risks now more balanced," "expect to begin reducing rates"). USD bearish, gold bullish — the pivot is near. How to identify: watch dot plot shifts, Powell's tone in press conferences, and the phrase "sufficiently restrictive." The hawkish-to-dovish pause transition (the "pivot") creates the largest macro gold trades of any cycle — moves of 10-20% over months. Trading: hawkish pause = short gold at range highs. Dovish pause = buy gold dips — the major trend is about to begin.`},
  3011: {id:3011,title:`Scenario Modeling: Hike & Cut Cycles`,type:"lesson",duration:"8m",content:`Rate hike scenario: inflation above target, employment strong, Fed hiking aggressively. USD strongly bullish, gold bearish. Trade: short gold on rallies, long USD dips. Example: 2022 — Fed hiked to 5.25%, gold fell 21% from $2,050 to $1,620, DXY surged from 96 to 114. Rate cut scenario: inflation falling, employment weakening, recession risk rising. USD bearish, gold bullish. Trade: long gold dips, short USD rallies. Example: 2020 — Fed cut to 0%, gold surged from $1,500 to $2,075. Key nuance: in severe recessions, gold initially falls in the "everything gets sold" phase. Wait for the Fed response (cuts + QE) before positioning long. The crash is a buying opportunity.`},
  3012: {id:3012,title:`Scenario Modeling: Complex Environments`,type:"lesson",duration:"10m",content:`Hawkish pause: USD neutral-bullish, gold neutral-bearish. Trade the range — short at resistance, long at support. Watch CPI for direction catalyst. Dovish pause: USD bearish, gold bullish. Buy dips — major trend imminent. High inflation + aggressive Fed: classic hawkish scenario. Gold bears full weight of higher opportunity cost AND stronger USD. Exception: if hikes cause financial instability (bank failures), gold gets a violent safe-haven counter-rally. High inflation + weak Fed (behind the curve): gold bullish DESPITE high rates because real rates are negative. Currency debasement fears dominate. USD bearish long-term. Example: 1970s — Fed repeatedly behind the curve. Gold went from $35 to $850 (+2,328%). Most powerful gold scenario.`},
  3013: {id:3013,title:`Stagflation: The Policy Trap`,type:"lesson",duration:"9m",content:`Stagflation = high inflation + stagnant growth + high unemployment simultaneously. The Fed is trapped: hike to fight inflation → crushes the weak economy. Cut to support growth → makes inflation worse. Split the difference → neither problem solved, credibility erodes. Impact on gold: MOST BULLISH macro environment. Five simultaneous gold catalysts: (1) inflation hedge demand, (2) currency debasement fears, (3) negative real rates, (4) safe haven demand from economic fear, (5) Fed credibility erosion. Impact on USD: bearish long-term. Short-term safe-haven spikes possible on recession fears. 1970s example: stagflation + Fed behind the curve + Nixon ending gold standard = gold from $35 to $850, a 2,328% gain. Warning signs: falling PMI + rising CPI simultaneously, unemployment rising while CPI stays elevated.`},
  3014: {id:3014,title:`War, Geopolitics & Safe Haven Flows`,type:"lesson",duration:"8m",content:`Safe haven assets: Gold (5,000-year store of value, no counterparty risk), USD (global reserve currency), US Treasuries. In geopolitical crisis, capital flows from: EUR, GBP, EM (Emerging Market) currencies, equities → into USD, Gold, Treasuries. Both USD and gold rise simultaneously. Short-term: violent spikes (gold +2-4%), VIX surge, partially reverses as fear premium unwinds. Long-term: sustained only if conflict changes inflation/growth fundamentals. Wars are inflationary (energy disruption, military spending) → sustained gold support. Russia-Ukraine 2022: gold spiked to $2,000 on invasion, then fell as Fed's aggressive response to war-driven inflation dominated. Lesson: geopolitical events are the catalyst; macro fundamentals determine the sustained direction. Trading rules: never chase initial spike, wait for first retracement, assess macro impact before positioning.`},
  3015: {id:3015,title:`Real Interest Rates: The Gold Formula`,type:"lesson",duration:"9m",content:`The most important concept for gold traders. Real Rate = Nominal Rate − Inflation. Gold is a non-yielding asset — its appeal vs USD depends on whether the real return on USD is attractive. Rising real rates → gold bearish (holding USD earns positive real return, gold at 0% is unattractive). Falling/negative real rates → gold bullish (holding USD destroys purchasing power, gold preserves it). The 10-year TIPS (Treasury Inflation-Protected Securities — government bonds whose yield reflects the real interest rate) (Treasury Inflation-Protected Securities — US government bonds that adjust with inflation, making their yield equal to the real interest rate) yield IS the real interest rate in real-time. When TIPS (Treasury Inflation-Protected Securities) yield falls → gold rallies. When TIPS yield rises → gold falls. This relationship explains the majority of gold's major moves over 50 years. Examples: 2022 — real rates went from -5% to +2%, gold fell 21%. 2020-2021 — real rates went deeply negative (-5.5%), gold surged to all-time highs. The formula table: nominal 0%, inflation 8% = real -8% = explosive gold bull. Nominal 5%, inflation 2% = real +3% = gold bearish.`},
  3016: {id:3016,title:`Expectations vs Reality: Your Trading Edge`,type:"lesson",duration:"9m",content:`Markets don't move on news — they move on deviations from expectations. The market has already priced in the consensus forecast. If outcome matches expectation: muted reaction. If outcome beats: strong move in that direction. If outcome misses: strong move in opposite direction. The four scenarios: (1) Hawkish expected, hawkish delivered → muted, often "buy rumour, sell fact" reversal. (2) Hawkish expected, dovish delivered → explosive — USD crashes, gold rockets. (3) Dovish expected, dovish delivered → muted, potential reversal. (4) Dovish expected, hawkish delivered → explosive — USD spikes, gold crashes. How to find the expectation: Bloomberg consensus, CME FedWatch (the Chicago Mercantile Exchange's free tool showing rate decision probabilities) Tool (a free online tool from the Chicago Mercantile Exchange that shows the market's current probability estimate for each possible Fed rate decision at upcoming meetings — essential reading before any macro trade) (Fed funds futures). Common mistake: "CPI at 3.5% is high, sell gold!" Wrong — if consensus was 3.7%, a 3.5% print is dovish. Always know the consensus. Always trade the deviation.`},
  3017: {id:3017,title:`The Full Market Flow Model`,type:"lesson",duration:"10m",content:`The complete cause-and-effect chain for any macro event. Step 1: Data releases (CPI, NFP, GDP). Step 2: Market reprices Fed expectations (CME FedWatch changes). Step 3: Bond yields move first and fastest (2-year most sensitive to Fed expectations). Step 4: USD reprices based on yield differential vs other currencies. Step 5: Gold reprices based on real rate change + USD change + risk sentiment. Full hawkish chain: Higher CPI → Fed hikes more → yields rise → real rates rise → USD strengthens → Gold falls. Full dovish chain: Lower CPI → Fed pivots → yields fall → real rates fall → USD weakens → Gold rallies. The exceptions: both USD and gold rise in geopolitical crisis (safe haven). Data is bad but gold falls: panic liquidation (margin calls) — this is a buying opportunity. Data is good but gold rallies: real rates still negative despite improvement, or stagflation developing.`},
  3018: {id:3018,title:`Integrating Macro with FMF Execution`,type:"lesson",duration:"10m",content:`Macro provides the why. FMF provides the when and where. Step 1: Establish macro bias. Example — CPI falling, Fed signalling cuts, real rates falling → LONG GOLD ONLY. Ignore all sell signals. Step 2: Define trading horizon. Rate cut cycles last months-years (4H/Daily entries). CPI surprises last days-weeks (1H/4H entries). Fed meetings last hours-days (15m/1H entries). Step 3: Wait for FMF liquidity setup. Do NOT buy just because macro is bullish. Look for: liquidity sweep (a brief move beyond a key level to trigger stops before reversing — how institutions build positions by taking the other side of stop orders) below a prior swing low (stop hunt before real move), manipulation phase at London/NY open (false move down before reversal), accumulation at lows (smart money absorbing supply). Step 4: Entry framework. Trigger: bullish FMF (Fortitude Market Framework) structure confirmation after sweep. Stop: below the liquidity sweep. Target: next significant liquidity level above. Step 5: The Macro-FMF checklist — combine both layers before every trade.`},
  3019: {id:3019,title:`The Macro Scenario Matrix`,type:"lesson",duration:"7m",content:`Quick-reference cheat sheet for all macro scenarios. Hike cycle: short gold rallies, long USD dips. Cut cycle: long gold dips, short USD rallies. Hawkish pause: range trade, short gold at resistance. Dovish pause: buy gold dips — big move imminent. CPI beat: sell gold relief rallies. CPI miss: buy gold dips after initial reaction. Strong NFP: confirms hawkish bias. Weak NFP: confirms dovish/cut narrative. Stagflation: ONLY buy gold — strongest macro environment. Geopolitical crisis: buy gold dips post-spike. QE: strong long gold signal. QT: confirms gold short bias. Negative real rates: best macro environment for gold. The Four Quadrant Model — plot inflation vs growth: Goldilocks (low inflation + strong growth) = USD strong, gold weak. Full stagflation (high inflation + low growth) = gold explosive bull. Recession (low inflation + low growth) = gold rises after initial crash. Overheating (high inflation + strong growth) = USD bullish, gold complex. Decision tree: Is Fed hiking/cutting/holding? → Hawkish or dovish pause? → What are real rates doing? → Any macro surprise?`},
  3020: {id:3020,title:`The Macro Trader's Pre-Trade Checklist`,type:"lesson",duration:"8m",content:`Before every gold or USD trade, complete this checklist. Inflation assessment: current CPI level and direction, vs Fed 2% target, next release date and consensus, core vs headline divergence. Fed assessment: current rate, last Fed language (hawkish/dovish/neutral), what CME FedWatch is pricing for next meeting, are we in hike/cut/pause cycle, if pause is it hawkish or dovish. Employment assessment: last NFP vs expectation, direction of employment trend, Average Hourly Earnings direction (wage inflation). Real rates assessment: 10-year TIPS yield level and direction, positive or negative (headwind or tailwind for gold). Geopolitical assessment: any active risks, new vs ongoing (new = spike and fade, ongoing = sustained premium). Bias conclusion: overall macro bias for gold (strongly bullish to strongly bearish), confidence level, time horizon. FMF entry confirmation: liquidity swept, manipulation setup present, correct session, R:R at least 1:2, stop at structural level. Common mistakes to avoid: never trade against macro bias, always know consensus before data, never chase geopolitical spikes, never conflate nominal and real rates, always listen to Fed language, keep it simple: real rates → gold, rate differentials → USD.`},
};


const COURSE_DATA = [
  {
    id:"macro",title:`Macro Fundamentals`,subtitle:`Free — No subscription required`,
    tier:"free",badge:"FREE",color:"#29a8ff",
    duration:"2h 45m",totalLessons:20,
    description:`The institutional framework behind every major market move. Understand central bank policy, inflation, employment, and economic cycles — and how to translate macro conditions into directional bias across any market, instrument, or asset class.`,
    outcomes:[
      "Understand central bank policy and how it moves markets",
      "Read CPI, NFP, and GDP data as actionable trading signals",
      "Identify hawkish vs dovish pauses and their impact",
      "Use real interest rates to determine market direction",
      "Build a directional macro bias before every trade",
      "Apply macro analysis to any market, instrument or asset class"
    ],
    sections:[
      {title:`The Macro Control System`,lessonIds:[3001, 3002]},
      {title:`The 5 Core Market Drivers`,lessonIds:[3003, 3004, 3005, 3006, 3007]},
      {title:`Interest Rate Cycles`,lessonIds:[3008, 3009, 3010]},
      {title:`Scenario-Based Market Modeling`,lessonIds:[3011, 3012, 3013]},
      {title:`Advanced Macro Concepts`,lessonIds:[3014, 3015, 3016]},
      {title:`The Complete Trading System`,lessonIds:[3017, 3018, 3019, 3020]},
    ]
  },
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
    id:"advanced",title:`Advanced Trading & Investing Course`,subtitle:`One-time purchase — $495`,
    tier:"purchase",badge:"PRO",color:"#d0d8e8",
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
    id:"workshop",title:`5-Day Professional Trading Workshop`,subtitle:`One-time purchase — $495`,
    tier:"purchase",badge:"WORKSHOP",color:"#e91ea7",
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
  {
    id:"mentorship",title:`FMF Elite Mentorship Programme`,subtitle:`Private application — $2,995`,
    tier:"mentorship",badge:"MENTORSHIP",color:"#d4af37",
    duration:"12 weeks",totalLessons:0,
    description:`One-on-one institutional-grade mentorship with a senior FMF analyst. Not a course — a transformation. Limited intake. Application required.`,
    outcomes:["Direct access to a senior FMF analyst","Custom trade plan built around your psychology","Weekly live review sessions of your journal","Personalised curriculum based on your assessment"],
    sections:[]
  },
];

const getCourseProgress = (course, completedIds) => {
  if (!course.sections || course.sections.length === 0) return { done: 0, total: 0, pct: 0 };
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
    <div style={{ color: C.textMuted, lineHeight: 1.9, fontSize: 15 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) min(340px,38%)", gap: 14, alignItems: "start" }}>

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
              {[{ icon: "report", label: "Lesson PDF Reference", size: "Coming soon" }, { icon: "chart", label: "Chart Examples", size: "Coming soon" }, { icon: "check", label: "Practice Checklist", size: "Coming soon" }].map((r, i) => (
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
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.8, maxWidth: 480, marginBottom: 14 }}>{course.description}</p>
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
              <span style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>{o}</span>
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
  quant:           { free:false,     "45":false,"65":false,"95":true  },
  // Add-on products (require active subscription)
  advanced_course: { free:false,     "45":true, "65":true, "95":true },
  workshop:        { free:false,     "45":true, "65":true, "95":true },
  mentorship:      { free:false,     "45":true, "65":true, "95":true },
  affiliate:       { free:false,     "45":true, "65":true, "95":true },
  broker_accounts: { free:false,     "45":true, "65":true, "95":true },
};

// AI usage caps by tier (requests/day)
const AI_CAPS = {
  free:0, "45":5, "65":10, "95":999,
};

// Check access for a given tier + feature
function canAccess(tier, feature) {
  // Owners get full access to everything
  try {
    const u = JSON.parse(localStorage.getItem("fis_user") || "{}");
    if (isOwnerEmail(u.email) || u.role === "super_admin") return true;
  } catch {}
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


// ── Main Education component ─────────────────────────────────────────────
function avatarColor(name){ let h=0; for(let c of name) h=(h*31+c.charCodeAt(0))%AVATAR_COLORS.length; return AVATAR_COLORS[h]; }

const Community = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("fis_community_msgs");
      return saved ? JSON.parse(saved) : COMMUNITY_SEED;
    } catch { return COMMUNITY_SEED; }
  });
  const [msg, setMsg] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const ME = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("fis_user") || "{}");
      const name = u.first_name && u.last_name ? `${u.first_name[0]}.${u.last_name}` : (u.email?.split("@")[0] || "Member");
      const avatar = (u.first_name?.[0] || "M").toUpperCase();
      return { u: name, tag: "Member", tc: "tb", avatar };
    } catch { return { u:"Member", tag:"Member", tc:"tb", avatar:"M" }; }
  })();

  // Persist messages to localStorage (keep last 200)
  useEffect(() => {
    try { localStorage.setItem("fis_community_msgs", JSON.stringify(messages.slice(-200))); } catch {}
  }, [messages]);

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

  const ONLINE = [];
  const QUICK_REACTIONS = ["👍","🔥","🧠","🤔","💯"];

  return (
    <div className="fi" style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)", maxHeight:820 }}>

      {/* Header */}
      <div style={{ marginBottom:14, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h1 className="df" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:4}}>Fortitude Community</h1>
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
        <div style={{ display:"flex", gap:24, padding:"10px 16px", background:"rgba(13,16,24,.82)", border:`1px solid ${C.border}`, borderRadius:6, marginTop:12 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:10, fontWeight:600, color:C.accent, letterSpacing:".08em", textTransform:"uppercase" }}>✓ Permitted</span>
            <span style={{ fontSize:11, color:C.textMuted }}>Market structure · Framework discussion · Risk methodology</span>
          </div>
          <div style={{ width:1, background:C.border }}/>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontSize:10, fontWeight:600, color:C.pink, letterSpacing:".08em", textTransform:"uppercase" }}>✕ Not Permitted</span>
            <span style={{ fontSize:11, color:C.textMuted }}>Signal requests · Profit flexing · Predictions · Emotional venting</span>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:14, flex:1, minHeight:0 }}>

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
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
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
const MembershipRequired = ({ course, onBack, onGoToPricing }) => (
  <div className="fi" style={{ maxWidth: 560, margin: "0 auto", padding: "40px 0" }}>
    <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 24 }} onClick={onBack}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
      All Courses
    </button>
    <div className="mc" style={{ textAlign: "center", padding: "40px 32px" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.pinkGlow, border: `1px solid ${C.pinkDim}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <IC n="lock" s={24} c={C.pink} />
      </div>
      <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 20, fontWeight: 300, color: C.text, marginBottom: 10, letterSpacing: ".04em" }}>Active Membership Required</h2>
      <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, marginBottom: 8, maxWidth: 400, margin: "0 auto 8px" }}>
        <strong style={{ color: C.text }}>{course.title}</strong> is available for purchase to members with an active subscription.
      </p>
      <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
        Any active plan (Core, Professional, or Elite) unlocks the ability to purchase standalone courses at a one-time fee.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
        <button className="btn bp" style={{ padding: 13, fontSize: 13, width: "100%" }} onClick={onGoToPricing}>
          View Membership Plans →
        </button>
        <button className="btn bg" style={{ padding: 11, fontSize: 12, width: "100%" }} onClick={onBack}>
          Back to Library
        </button>
      </div>
      <div style={{ marginTop: 24, padding: "12px 16px", background: C.surfaceAlt, borderRadius: 8, border: `1px solid ${C.border}`, maxWidth: 400, margin: "24px auto 0" }}>
        <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7 }}>
          Course purchases are lifetime access and do not replace your subscription — they are standalone additions to your membership.
        </div>
      </div>
    </div>
  </div>
);

// ── Mentorship Application ────────────────────────────────────────────────────
const MENTORSHIP_QUESTIONS = [
  {
    id: "experience_years",
    section: "Trading Background",
    question: "How long have you been actively trading financial markets?",
    type: "select",
    options: ["Less than 6 months","6–12 months","1–2 years","2–5 years","5+ years"],
    required: true,
  },
  {
    id: "markets",
    section: "Trading Background",
    question: "Which markets do you primarily trade? Select all that apply.",
    type: "multiselect",
    options: ["Forex","Equities / Stocks","Crypto","Futures / Commodities","Options","Indices"],
    required: true,
  },
  {
    id: "capital",
    section: "Trading Background",
    question: "What is the approximate size of your current trading capital?",
    type: "select",
    options: ["Under $1,000","$1,000–$5,000","$5,000–$25,000","$25,000–$100,000","$100,000+","Prop firm funded"],
    required: true,
  },
  {
    id: "consistency",
    section: "Performance & Psychology",
    question: "How would you honestly describe your current trading performance?",
    type: "select",
    options: [
      "Consistently losing — struggling to find any edge",
      "Breakeven — profitable some months, losing others",
      "Slightly profitable — small but inconsistent gains",
      "Profitable — consistent but want institutional-level refinement",
    ],
    required: true,
  },
  {
    id: "biggest_obstacle",
    section: "Performance & Psychology",
    question: "What is the single biggest obstacle preventing you from performing at the level you want? Be specific.",
    type: "textarea",
    placeholder: "Describe in detail — e.g. emotional decision-making during drawdown, inability to identify high-probability setups, lack of a structured pre-market routine...",
    required: true,
  },
  {
    id: "psychology",
    section: "Performance & Psychology",
    question: "Describe a specific trade or trading period where your psychology worked against you. What happened, what did you feel, and what did you do?",
    type: "textarea",
    placeholder: "We ask this because self-awareness is the foundation of every mentorship relationship. Be honest — this is not a test of performance, it is a test of self-knowledge.",
    required: true,
  },
  {
    id: "methodology",
    section: "Methodology & Approach",
    question: "Do you currently trade with a written, rule-based methodology? If yes, describe the core logic.",
    type: "textarea",
    placeholder: "Describe your edge — entry criteria, timeframe selection, bias formation, invalidation rules. If you don't have one yet, explain your current approach honestly.",
    required: true,
  },
  {
    id: "fmf_exposure",
    section: "Methodology & Approach",
    question: "What is your level of exposure to the Fortitude Market Framework (FMF)?",
    type: "select",
    options: [
      "None — I have not studied the FMF material",
      "Beginner — completed some introductory content",
      "Intermediate — completed core course content",
      "Advanced — completed professional/workshop material",
    ],
    required: true,
  },
  {
    id: "commitment",
    section: "Commitment & Readiness",
    question: "The mentorship requires a minimum of 8–10 hours per week of active study, journalling, and live market engagement. Can you honestly commit to this?",
    type: "select",
    options: [
      "Yes — I can commit fully and have the schedule to support it",
      "Mostly — there will be some weeks where this is difficult",
      "No — my current situation would not allow this level of commitment",
    ],
    required: true,
  },
  {
    id: "goals",
    section: "Commitment & Readiness",
    question: "What specific, measurable outcome do you want to achieve within 12 weeks of this mentorship?",
    type: "textarea",
    placeholder: "Be precise — not 'I want to be profitable' but 'I want to achieve a consistent 2R average per week across a minimum of 3 setups per session, with a documented pre-market routine'.",
    required: true,
  },
  {
    id: "why_you",
    section: "Final Statement",
    question: "Why should we accept your application? This programme has limited intake and we are selective. Make the case for yourself.",
    type: "textarea",
    placeholder: "This is your opportunity to demonstrate self-awareness, seriousness, and genuine commitment to transformation. Write as much as you need.",
    required: true,
  },
];

const SECTIONS_ORDER = ["Trading Background","Performance & Psychology","Methodology & Approach","Commitment & Readiness","Final Statement"];

const MentorshipApplication = ({ onBack }) => {
  const [step, setStep] = useState("intro");    // intro | questions | review | submitted
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const sectionName = SECTIONS_ORDER[currentSection];
  const sectionQs = MENTORSHIP_QUESTIONS.filter(q => q.section === sectionName);
  const totalSections = SECTIONS_ORDER.length;

  const sectionComplete = sectionQs.every(q => {
    if (!q.required) return true;
    const a = answers[q.id];
    if (!a) return false;
    if (Array.isArray(a)) return a.length > 0;
    return a.trim().length > 0;
  });

  const allComplete = MENTORSHIP_QUESTIONS.every(q => {
    if (!q.required) return true;
    const a = answers[q.id];
    if (!a) return false;
    if (Array.isArray(a)) return a.length > 0;
    return typeof a === "string" && a.trim().length >= 20;
  });

  const toggleMulti = (id, opt) => {
    setAnswers(prev => {
      const cur = prev[id] || [];
      return { ...prev, [id]: cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt] };
    });
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setStep("submitted"); }, 2800);
  };

  // ── Submitted ──────────────────────────────────────────────────────────────
  if (step === "submitted") return (
    <div className="fi" style={{ maxWidth: 600, margin: "0 auto", padding: "40px 0" }}>
      <div className="mc" style={{ textAlign: "center", padding: "48px 36px" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <IC n="check" s={30} c="#d4af37" />
        </div>
        <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 22, fontWeight: 300, color: C.text, letterSpacing: ".04em", marginBottom: 12 }}>Application Submitted</h2>
        <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.9, maxWidth: 420, margin: "0 auto 24px" }}>
          Your application has been received and will be reviewed by a senior FMF analyst. We review every application personally — this typically takes 5–7 business days.
        </p>
        <div style={{ padding: "18px 20px", background: C.surfaceAlt, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 24, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Application reference</span>
            <span className="mn" style={{ fontSize: 12, color: "#d4af37" }}>MNT-{Math.random().toString(36).slice(2,8).toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Programme</span>
            <span style={{ fontSize: 12, color: C.text }}>FMF Elite Mentorship</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Review timeline</span>
            <span style={{ fontSize: 12, color: C.text }}>5–7 business days</span>
          </div>
        </div>
        <div style={{ padding: "14px 18px", background: "rgba(212,175,55,.05)", border: "1px solid rgba(212,175,55,.15)", borderRadius: 8, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#d4af37", fontWeight: 600, marginBottom: 6 }}>What Happens Next</div>
          <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.8, textAlign: "left" }}>
            If your application is accepted, you will receive a personal email with next steps including a 30-minute introductory call with your assigned analyst and payment instructions. If your application is not accepted at this time, we will provide specific feedback and a recommendation for preparation.
          </div>
        </div>
        <button className="btn bg" style={{ width: "100%", padding: 12 }} onClick={onBack}>Return to Education</button>
      </div>
    </div>
  );

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (step === "intro") return (
    <div className="fi">
      <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }} onClick={onBack}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        All Courses
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) min(320px,38%)", gap: 20, alignItems: "start" }}>
        <div>
          {/* Hero */}
          <div style={{ background: "linear-gradient(135deg,rgba(13,16,24,.97),rgba(13,16,24,.85))", border: "1px solid rgba(212,175,55,.22)", borderRadius: 10, padding: "28px 28px", marginBottom: 18, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 260, height: 180, background: "radial-gradient(ellipse at top right,rgba(212,175,55,.1),transparent)", pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", padding: "2px 8px", borderRadius: 3, background: "rgba(212,175,55,.15)", color: "#d4af37", border: "1px solid rgba(212,175,55,.35)" }}>MENTORSHIP</span>
              <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 3, background: "rgba(233,30,167,.08)", color: C.pink, border: "1px solid rgba(233,30,167,.2)", fontWeight: 600, letterSpacing: ".06em" }}>LIMITED INTAKE</span>
            </div>
            <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 22, fontWeight: 300, color: C.text, letterSpacing: ".04em", marginBottom: 10 }}>FMF Elite Mentorship Programme</h2>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.9, maxWidth: 500, marginBottom: 18 }}>
              This is not a course. It is a 12-week intensive, one-on-one working relationship between you and a senior FMF analyst. We study your journal, rebuild your methodology, and hold you to institutional standards of execution and discipline.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[{l:"Duration",v:"12 Weeks"},{l:"Format",v:"1-on-1"},{l:"Sessions",v:"Weekly Live"},{l:"Investment",v:"$2,995"}].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 3 }}>{m.l}</div>
                  <div className="mn" style={{ fontSize: 14, color: m.l === "Investment" ? "#d4af37" : C.text }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What you get */}
          <div className="mc" style={{ padding: "20px 22px", marginBottom: 14 }}>
            <div className="sl" style={{ marginBottom: 14 }}>What the Programme Includes</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { title: "Weekly 60-Minute Live Review", desc: "Your analyst studies your journal and trades from the prior week. Every session is a structured debrief — not a Q&A." },
                { title: "Custom Trade Plan Build", desc: "Week 1 is dedicated to building your personal, rule-based trade plan designed around your psychology, schedule, and capital." },
                { title: "Unlimited Async Feedback", desc: "Submit charts, journal entries, or questions at any time. Your analyst responds within 24 hours, 5 days a week." },
                { title: "Personalised Curriculum", desc: "Your assessment results are used to build a targeted curriculum. You only study what you actually need." },
                { title: "Psychology Audit", desc: "A full assessment of your emotional and cognitive trading patterns, with a written report delivered at week 4." },
                { title: "Lifetime Access to Materials", desc: "All session recordings, documents, and custom frameworks created during your mentorship are yours permanently." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <IC n="check" s={10} c="#d4af37" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who it's for */}
          <div className="mc" style={{ padding: "18px 22px" }}>
            <div className="sl" style={{ marginBottom: 12 }}>Who This Is For</div>
            <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.9 }}>
              This programme is for traders who are serious about performance — not about learning basics. You should have at least 6 months of active market experience, a foundational understanding of price action, and a willingness to be challenged. We work with traders who are stuck at a ceiling they cannot break through alone.
            </div>
            <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(233,30,167,.05)", border: "1px solid rgba(233,30,167,.15)", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: C.pink, fontWeight: 600, marginBottom: 4 }}>Important — Please Read Before Applying</div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.8 }}>
                We accept a maximum of 6 traders per cohort. Applications are reviewed personally by a senior analyst. Acceptance is not guaranteed and is based on fit, readiness, and availability. If accepted, the $2,995 investment is collected prior to the first session. There are no refunds once the programme has commenced.
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ position: "sticky", top: 20 }}>
          <div className="mc" style={{ padding: "20px 20px", border: "1px solid rgba(212,175,55,.18)" }}>
            <div style={{ textAlign: "center", paddingBottom: 16, borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
              <div className="mn" style={{ fontSize: 36, color: "#d4af37", lineHeight: 1, marginBottom: 4 }}>$2,995</div>
              <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".08em" }}>ONE-TIME · UPON ACCEPTANCE</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {[
                "12-week intensive programme",
                "Max 6 traders per cohort",
                "Personal analyst assignment",
                "Weekly live review sessions",
                "30-day money-back guarantee",
              ].map((f,i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <IC n="check" s={11} c="#d4af37" />
                  <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "11px 14px", background: "rgba(212,175,55,.06)", border: "1px solid rgba(212,175,55,.15)", borderRadius: 6, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: "#d4af37", fontWeight: 600, marginBottom: 3 }}>No payment until accepted</div>
              <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7 }}>The application is free. Payment is only requested if your application is approved.</div>
            </div>
            <button
              style={{ width: "100%", padding: "13px", borderRadius: 5, border: "1px solid rgba(212,175,55,.4)", background: "rgba(212,175,55,.1)", color: "#d4af37", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: ".04em", fontFamily: "'Inter',sans-serif", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,175,55,.18)"; e.currentTarget.style.borderColor = "rgba(212,175,55,.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(212,175,55,.1)"; e.currentTarget.style.borderColor = "rgba(212,175,55,.4)"; }}
              onClick={() => setStep("questions")}>
              Begin Application →
            </button>
            <div style={{ fontSize: 10, color: C.textDim, textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>Takes approximately 20–30 minutes.<br/>Save progress is automatic.</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Question sections ──────────────────────────────────────────────────────
  return (
    <div className="fi" style={{ maxWidth: 720, margin: "0 auto" }}>
      <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }} onClick={() => step === "questions" && currentSection === 0 ? setStep("intro") : currentSection > 0 ? setCurrentSection(s => s - 1) : setStep("intro")}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        {currentSection === 0 ? "Back to Overview" : "Previous Section"}
      </button>

      {/* Progress header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <span style={{ fontSize: 11, color: "#d4af37", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase" }}>Section {currentSection + 1} of {totalSections}</span>
            <h2 style={{ fontSize: 18, color: C.text, fontWeight: 500, marginTop: 2 }}>{sectionName}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: C.textDim, marginBottom: 4 }}>{Math.round(((currentSection) / totalSections) * 100)}% complete</div>
            <div style={{ width: 120, height: 3, borderRadius: 2, background: C.border, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((currentSection) / totalSections) * 100}%`, background: "linear-gradient(90deg,#d4af37,#f0c84a)", borderRadius: 2, transition: "width .4s ease" }} />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {SECTIONS_ORDER.map((s, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= currentSection ? "#d4af37" : C.border, transition: "background .3s" }} />
          ))}
        </div>
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {sectionQs.map((q, qi) => (
          <div key={q.id} className="mc" style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 500, lineHeight: 1.6, marginBottom: q.type === "textarea" ? 10 : 14 }}>
              <span style={{ color: "#d4af37", marginRight: 8, fontFamily: "JetBrains Mono", fontSize: 12 }}>{String(sectionQs.indexOf(q) + 1).padStart(2,"0")}.</span>
              {q.question}
            </div>
            {q.required && <div style={{ fontSize: 10, color: C.textDim, marginBottom: 10, letterSpacing: ".05em" }}>Required</div>}

            {q.type === "select" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {q.options.map(opt => {
                  const sel = answers[q.id] === opt;
                  return (
                    <div key={opt} onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                      style={{ padding: "11px 14px", borderRadius: 6, border: `1px solid ${sel ? "rgba(212,175,55,.5)" : C.border}`, background: sel ? "rgba(212,175,55,.08)" : "transparent", cursor: "pointer", fontSize: 13, color: sel ? "#d4af37" : C.textMuted, transition: "all .15s", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${sel ? "#d4af37" : C.border}`, background: sel ? "#d4af37" : "transparent", flexShrink: 0, transition: "all .15s" }} />
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}

            {q.type === "multiselect" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {q.options.map(opt => {
                  const sel = (answers[q.id] || []).includes(opt);
                  return (
                    <div key={opt} onClick={() => toggleMulti(q.id, opt)}
                      style={{ padding: "8px 14px", borderRadius: 5, border: `1px solid ${sel ? "rgba(212,175,55,.5)" : C.border}`, background: sel ? "rgba(212,175,55,.1)" : "transparent", cursor: "pointer", fontSize: 12, color: sel ? "#d4af37" : C.textMuted, transition: "all .15s", display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 2, border: `1.5px solid ${sel ? "#d4af37" : C.border}`, background: sel ? "#d4af37" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {sel && <IC n="check" s={7} c={C.bg} />}
                      </div>
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}

            {q.type === "textarea" && (
              <textarea className="inp" rows={5} placeholder={q.placeholder} value={answers[q.id] || ""}
                onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                style={{ resize: "vertical", minHeight: 110, lineHeight: 1.7, fontSize: 13 }} />
            )}
          </div>
        ))}
      </div>

      {/* Section navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 12, color: sectionComplete ? C.accent : C.textDim }}>
          {sectionComplete ? "✓ Section complete" : "Complete all questions to continue"}
        </div>
        {currentSection < totalSections - 1 ? (
          <button
            className="btn bp"
            style={{ padding: "10px 24px", opacity: sectionComplete ? 1 : 0.4, cursor: sectionComplete ? "pointer" : "not-allowed" }}
            onClick={() => sectionComplete && setCurrentSection(s => s + 1)}>
            Next Section →
          </button>
        ) : (
          <button
            style={{ padding: "11px 28px", borderRadius: 5, border: "1px solid rgba(212,175,55,.5)", background: "rgba(212,175,55,.12)", color: sectionComplete ? "#d4af37" : C.textDim, fontSize: 13, fontWeight: 600, cursor: sectionComplete && !submitting ? "pointer" : "not-allowed", fontFamily: "'Inter',sans-serif", opacity: sectionComplete ? 1 : 0.4 }}
            onClick={sectionComplete ? handleSubmit : undefined}
            disabled={submitting}>
            {submitting
              ? <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37", display: "inline-block" }} />
                  <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37", display: "inline-block", animationDelay: ".15s" }} />
                  <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37", display: "inline-block", animationDelay: ".3s" }} />
                </span>
              : "Submit Application →"}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Course Checkout ───────────────────────────────────────────────────────────
const CourseCheckout = ({ course, onBack, onPurchaseComplete, currentTier = "45", onUpgrade }) => {
  const [step, setStep] = useState("review"); // review | payment | success
  const [billingCycle, setBillingCycle] = useState("once");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const formatCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(\d{4})(?=\d)/g,"$1 ");
  const formatExpiry = v => v.replace(/\D/g,"").slice(0,4).replace(/(\d{2})(?=\d)/g,"$1/");
  const cardValid = cardNum.replace(/\s/g,"").length === 16 && cardName.trim().length > 2 && expiry.length === 5 && cvv.length >= 3;

  const handlePay = () => {
    if (!cardValid || !agreed) return;
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep("success"); }, 2200);
  };

  const FEATURES = {
    advanced: [
      "19 professional-grade lessons",
      "Advanced market structure & BOS theory",
      "Institutional liquidity engineering",
      "Order blocks, breaker blocks & AMD model",
      "Full multi-timeframe confluence framework",
      "Active subscription required to access",
    ],
    workshop: [
      "43 intensive workshop sessions",
      "Zero to market fluency in 5 structured days",
      "The complete FMF methodology in one sprint",
      "Structure, liquidity & AMD model mastery",
      "Live executable trade model build",
      "Active subscription required to access",
    ],
  };
  const featureList = FEATURES[course.id] || [];

  // ── Success ──
  if (step === "success") return (
    <div className="fi" style={{ maxWidth: 560, margin: "0 auto", padding: "40px 0" }}>
      <div className="mc" style={{ textAlign: "center", padding: "40px 32px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(41,168,255,.12)", border: "1px solid rgba(41,168,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <IC n="check" s={28} c={C.accent} />
        </div>
        <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 10 }}>Purchase Confirmed</h2>
        <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, marginBottom: 28, maxWidth: 380, margin: "0 auto 28px" }}>
          You now have access to <strong style={{ color: C.text }}>{course.title}</strong> with your active subscription. Start learning at your own pace.
        </p>
        <div style={{ padding: "14px 20px", background: C.surfaceAlt, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 24, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Order reference</span>
            <span className="mn" style={{ fontSize: 12, color: C.accent }}>FMF-{Math.random().toString(36).slice(2,8).toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Course</span>
            <span style={{ fontSize: 12, color: C.text }}>{course.title.slice(0,28)}…</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.textDim }}>Amount charged</span>
            <span className="mn" style={{ fontSize: 12, color: C.text }}>$495.00</span>
          </div>
        </div>
        <button className="btn bp" style={{ width: "100%", padding: 13 }} onClick={onPurchaseComplete}>
          Start Course Now →
        </button>
        <div style={{ marginTop: 12, fontSize: 11, color: C.textDim }}>A receipt has been sent to your email address.</div>
      </div>
    </div>
  );

  return (
    <div className="fi">
      {/* Back */}
      <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }} onClick={onBack}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        All Courses
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) min(340px,42%)", gap: 20, alignItems: "start" }}>

        {/* ── Left: payment form ── */}
        <div>
          {/* Course hero strip */}
          <div style={{ background: `linear-gradient(135deg,rgba(13,16,24,.97),rgba(13,16,24,.82))`, border: `1px solid ${course.color}30`, borderRadius: 10, padding: "18px 20px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 120, background: `radial-gradient(ellipse at top right,${course.color}14,transparent)`, pointerEvents: "none" }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", padding: "2px 8px", borderRadius: 3, background: `${course.color}18`, color: course.color, border: `1px solid ${course.color}40` }}>{course.badge}</span>
              <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 3, background: "rgba(233,30,167,.1)", color: C.pink, border: "1px solid rgba(233,30,167,.2)", fontWeight: 600, letterSpacing: ".06em" }}>LIFETIME ACCESS</span>
            </div>
            <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 18, fontWeight: 300, color: C.text, letterSpacing: ".04em", marginBottom: 4 }}>{course.title}</h2>
            <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, maxWidth: 460 }}>{course.description}</p>
          </div>

          {/* Payment form */}
          <div className="mc" style={{ padding: "22px 22px" }}>
            {/* Subscription required block */}
            {needsSub && (
              <div style={{ padding: "16px 18px", background: "rgba(233,30,167,.05)", border: "1px solid rgba(233,30,167,.2)", borderRadius: 8, marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: C.pink, fontWeight: 600, marginBottom: 10, letterSpacing: ".04em" }}>⚠ Active Subscription Required</div>
                <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7, marginBottom: 14 }}>
                  Course access requires an active Fortitude membership. Select a plan below — your course will be added to the same order.
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: subBillingAnnual ? C.textDim : C.text, fontWeight: subBillingAnnual ? 400 : 600 }}>Monthly</span>
                  <div onClick={() => setSubBillingAnnual(v => !v)} style={{ width: 36, height: 20, borderRadius: 10, cursor: "pointer", background: subBillingAnnual ? C.accent : "rgba(255,255,255,.12)", position: "relative", flexShrink: 0, transition: "background .2s" }}>
                    <div style={{ position: "absolute", top: 2, left: subBillingAnnual ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                  </div>
                  <span style={{ fontSize: 11, color: subBillingAnnual ? C.text : C.textDim, fontWeight: subBillingAnnual ? 600 : 400 }}>Annual</span>
                  {subBillingAnnual && <span style={{ fontSize: 9, color: C.accent, fontWeight: 700, letterSpacing: ".06em" }}>SAVE 20%</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {["45","65","95"].map(tid => {
                    const t = TIERS[tid];
                    const price = subBillingAnnual ? `$${t.annual}/mo` : `$${t.monthly}/mo`;
                    const sel = selectedSubTier === tid;
                    return (
                      <div key={tid} onClick={() => setSelectedSubTier(tid)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 6, border: `1px solid ${sel ? C.accent + "60" : C.border}`, background: sel ? C.accentGlow : "transparent", cursor: "pointer", transition: "all .15s" }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${sel ? C.accent : C.border}`, background: sel ? C.accent : "transparent", flexShrink: 0, transition: "all .15s" }} />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 12, color: sel ? C.text : C.textMuted, fontWeight: sel ? 600 : 400 }}>{t.label}</span>
                          <span style={{ fontSize: 11, color: C.textDim, marginLeft: 8 }}>{price} · billed {subBillingAnnual ? "annually" : "monthly"}</span>
                        </div>
                        <span className="mn" style={{ fontSize: 12, color: sel ? C.accent : C.textDim }}>{price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="sl" style={{ marginBottom: 18 }}>Payment Details</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Cardholder Name</label>
                <input className="inp" placeholder="Full name on card" value={cardName} onChange={e => setCardName(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Card Number</label>
                <div style={{ position: "relative" }}>
                  <input className="inp" placeholder="0000 0000 0000 0000" value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))} style={{ paddingRight: 48 }} />
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 4 }}>
                    {["V","M"].map(b => (
                      <div key={b} style={{ width: 22, height: 15, borderRadius: 3, background: b==="V" ? "#1a1f6e" : "#eb001b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 6, color: "#fff", fontWeight: 700, letterSpacing: ".02em" }}>{b==="V"?"VISA":"MC"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Expiry</label>
                  <input className="inp" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>CVV</label>
                  <input className="inp" placeholder="•••" type="password" maxLength={4} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="dv" style={{ margin: "20px 0" }} />

            {/* Agreement */}
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 18 }}>
              <div onClick={() => setAgreed(!agreed)} style={{ width: 16, height: 16, borderRadius: 3, border: `1px solid ${agreed ? C.accent : C.border}`, background: agreed ? C.accentGlow : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all .15s" }}>
                {agreed && <IC n="check" s={9} c={C.accent} />}
              </div>
              <span style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7 }}>
                I agree to the <span style={{ color: C.accent, cursor: "pointer" }}>Terms of Service</span> and confirm this is a one-time, non-refundable purchase for lifetime digital course access.
              </span>
            </label>

            {/* Pay button */}
            <button
              className="btn bp"
              style={{ width: "100%", padding: 14, fontSize: 13, opacity: (cardValid && agreed && !processing) ? 1 : 0.45, cursor: (cardValid && agreed && !processing) ? "pointer" : "not-allowed", position: "relative", overflow: "hidden" }}
              onClick={handlePay}
              disabled={!cardValid || !agreed || processing}>
              {processing
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span className="pu" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.bg }} />
                    <span className="pu" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.bg, animationDelay: ".15s" }} />
                    <span className="pu" style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.bg, animationDelay: ".3s" }} />
                  </span>
                : needsSub ? `Complete Purchase — $${495 + (subBillingAnnual ? TIERS[selectedSubTier].annual : TIERS[selectedSubTier].monthly)}.00` : `Complete Purchase — $495.00`}
            </button>

            {/* Security badges */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
              {[
                { icon: "shield", label: "256-bit SSL" },
                { icon: "lock",   label: "Secure Payment" },
                { icon: "check",  label: "Instant Access" },
              ].map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IC n={b.icon} s={11} c={C.textDim} />
                  <span style={{ fontSize: 10, color: C.textDim }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: order summary ── */}
        <div style={{ position: "sticky", top: 20 }}>
          <div className="mc" style={{ padding: "20px 20px", marginBottom: 12 }}>
            <div className="sl" style={{ marginBottom: 14 }}>Order Summary</div>

            {/* Price display */}
            <div style={{ textAlign: "center", padding: "20px 0", borderBottom: `1px solid ${C.border}`, marginBottom: 16 }}>
              <div className="mn" style={{ fontSize: 42, color: C.text, lineHeight: 1, marginBottom: 4 }}>$495</div>
              <div style={{ fontSize: 11, color: C.textDim, letterSpacing: ".06em" }}>ONE-TIME PAYMENT</div>
              <div style={{ marginTop: 8, fontSize: 12, color: C.accent }}>Lifetime access included</div>
            </div>

            {/* Line items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>Course fee</span>
                <span className="mn" style={{ fontSize: 12, color: C.text }}>$495.00</span>
              </div>
              {needsSub && (() => {
                const t = TIERS[selectedSubTier];
                const price = subBillingAnnual ? t.annual : t.monthly;
                return (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.textMuted }}>{t.label} plan (first month)</span>
                    <span className="mn" style={{ fontSize: 12, color: C.accent }}>${price}.00</span>
                  </div>
                );
              })()}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>Platform fee</span>
                <span className="mn" style={{ fontSize: 12, color: C.accent }}>$0.00</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: C.textMuted }}>Tax</span>
                <span className="mn" style={{ fontSize: 12, color: C.textMuted }}>Incl.</span>
              </div>
              <hr className="dv" style={{ margin: "6px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>Total today</span>
                <span className="mn" style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>
                  {needsSub ? `$${495 + (subBillingAnnual ? TIERS[selectedSubTier].annual : TIERS[selectedSubTier].monthly)}.00` : "$495.00"}
                </span>
              </div>
            </div>
          </div>

          {/* What's included */}
          <div className="mc" style={{ padding: "16px 18px" }}>
            <div className="sl" style={{ marginBottom: 12 }}>What's Included</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {featureList.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <div style={{ width: 15, height: 15, borderRadius: "50%", background: `${course.color}16`, border: `1px solid ${course.color}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <IC n="check" s={7} c={course.color} />
                  </div>
                  <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(41,168,255,.05)", border: "1px solid rgba(41,168,255,.12)", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, marginBottom: 3 }}>30-Day Satisfaction Guarantee</div>
              <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6 }}>If you're not completely satisfied within 30 days, we'll refund your purchase — no questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <div style={{ fontSize:13,color:C.textMuted,lineHeight:1.8 }}>
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
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [trialStep, setTrialStep] = useState(null); // null | { tierId, billing }
  const [trialCard, setTrialCard] = useState({ name:"", num:"", exp:"", cvv:"" });
  const [trialProcessing, setTrialProcessing] = useState(false);
  const [trialDone, setTrialDone] = useState(false);
  const [agreedTrial, setAgreedTrial] = useState(false);

  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(\d{4})(?=\d)/g,"$1 ");
  const fmtExp  = v => v.replace(/\D/g,"").slice(0,4).replace(/(\d{2})(?=\d)/g,"$1/");
  const trialCardValid = trialCard.num.replace(/\s/g,"").length===16 && trialCard.name.trim().length>2 && trialCard.exp.length===5 && trialCard.cvv.length>=3;

  const handleStartTrial = async () => {
    if (!trialCardValid || !agreedTrial) return;
    const token = localStorage.getItem("fis_token");
    setTrialProcessing(true);
    try {
      const data = await api.post("/membership/trial/start", {
        tier: trialStep.tierId === "45" ? "core_45" : trialStep.tierId === "65" ? "pro_65" : "elite_95",
        billing_cycle: trialStep.billing || "monthly",
      }, token);
      if (data.success) {
        setTrialProcessing(false);
        setTrialDone(true);
        onUpgrade(trialStep.tierId);
        setSubStatus && setSubStatus("active");
        // Update localStorage user with new tier
        try {
          const saved = JSON.parse(localStorage.getItem("fis_user") || "{}");
          localStorage.setItem("fis_user", JSON.stringify({
            ...saved,
            membership_tier: data.data?.tier || saved.membership_tier,
            subscription_status: "trial",
          }));
        } catch {}
      } else {
        setTrialProcessing(false);
        // Still show success UI — Stripe not yet wired, allow trial flow
        setTrialDone(true);
        onUpgrade(trialStep.tierId);
        setSubStatus && setSubStatus("active");
      }
    } catch {
      setTrialProcessing(false);
      // Fallback: allow trial without backend (Stripe pending)
      setTrialDone(true);
      onUpgrade(trialStep.tierId);
      setSubStatus && setSubStatus("active");
    }
  };

  const TIER_FEATURES = {
    free:   [
      "Introduction to Trading & Investing (full course)",
      "Limited dashboard overview",
      "Platform login",
    ],
    "45":   [
      "Everything in Free",
      "Beginners Trading & Investing Course",
      "Cryptocurrency Course",
      "Full dashboard",
      "Market Intelligence feed",
      "AI Chart Analysis (5/day)",
      "Economic Calendar",
      "Community Chat",
      "Market updates",
    ],
    "65":   [
      "Everything in Core",
      "Trading Journal",
      "Performance Metrics",
      "Behavioral Analytics",
      "Performance Coach",
      "Pre-Commitment System",
      "Cognitive Intelligence Dashboard",
      "AI Chart Analysis (10/day)",
    ],
    "95":   [
      "Everything in Professional",
      "Unlimited AI Chart Analysis",
      "Unlimited Journal Imports",
      "Priority AI Response",
      "Full Behavioral Engine Access",
      "Live Broker Sync",
    ],
  };

  const COURSE_HIGHLIGHTS = [
    { label: "Introduction to Trading & Investing",  badge:"FREE",       color: "#29a8ff",  note: "Free — no subscription required · 14 lessons · 3h 20m",  access: "free"     },
    { label: "Beginners Trading & Investing Course", badge:"CORE",       color: "#29a8ff",  note: "Included with Core ($45/mo+) · 37 lessons · 8h 45m",      access: "paid"     },
    { label: "Cryptocurrency Course",                badge:"CORE",       color: "#29a8ff",  note: "Included with Core ($45/mo+) · 42 lessons · 5h 30m",      access: "paid"     },
    { label: "Advanced Trading & Investing Course",  badge:"PRO",        color: "#d0d8e8",  note: "One-time purchase $495 · Active subscription required · 19 lessons · 6h 15m", access: "purchase" },
    { label: "5-Day Professional Trading Workshop",  badge:"WORKSHOP",   color: "#e91ea7",  note: "One-time purchase $495 · Active subscription required · 43 lessons · 8h 00m", access: "purchase" },
    { label: "FMF Elite Mentorship Programme",       badge:"MENTORSHIP", color: "#d4af37",  note: "Private application · $2,995 · 12 weeks · Limited intake", access: "apply"    },
  ];

  // ── Trial success screen ──────────────────────────────────────────────────
  if (trialDone) return (
    <div className="fi" style={{ maxWidth: 560, margin: "0 auto", padding: "40px 0" }}>
      <div className="mc" style={{ textAlign: "center", padding: "44px 32px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.accentGlow, border: `1px solid ${C.accentDim}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <IC n="check" s={28} c={C.accent} />
        </div>
        <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 22, fontWeight: 300, color: C.text, marginBottom: 10 }}>Trial Activated</h2>
        <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.8, maxWidth: 380, margin: "0 auto 24px" }}>
          Your 7-day free trial for <strong style={{ color: C.text }}>{TIERS[trialStep?.tierId]?.label}</strong> is now active. No charge until your trial ends on <strong style={{ color: C.text }}>{new Date(Date.now()+7*864e5).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</strong>.
        </p>
        <div style={{ padding: "14px 20px", background: C.surfaceAlt, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 24, textAlign: "left" }}>
          {[
            { l: "Plan", v: `${TIERS[trialStep?.tierId]?.label} (${billingAnnual?"Annual":"Monthly"})` },
            { l: "Trial ends", v: new Date(Date.now()+7*864e5).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}) },
            { l: "First charge", v: billingAnnual ? `$${TIERS[trialStep?.tierId]?.annual}/mo` : `$${TIERS[trialStep?.tierId]?.monthly}/mo` },
            { l: "Auto-renews", v: "Yes — cancel anytime before trial ends" },
          ].map(r => (
            <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, color: C.textDim }}>{r.l}</span>
              <span style={{ fontSize: 12, color: C.text }}>{r.v}</span>
            </div>
          ))}
        </div>
        <button className="btn bp" style={{ width: "100%", padding: 13 }} onClick={() => setPage("dashboard")}>
          Explore Platform →
        </button>
        <div style={{ marginTop: 12, fontSize: 11, color: C.textDim }}>Confirmation sent to {user?.email || ""}</div>
      </div>
    </div>
  );

  // ── Trial signup modal ────────────────────────────────────────────────────
  if (trialStep) {
    const t = TIERS[trialStep.tierId];
    const price = trialStep.billing === "annual" ? t.annual : t.monthly;
    return (
      <div className="fi" style={{ maxWidth: 640, margin: "0 auto" }}>
        <button className="btn bg" style={{ padding: "7px 14px", fontSize: 11, display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }} onClick={() => setTrialStep(null)}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back to Plans
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) min(280px,42%)", gap: 20, alignItems: "start" }}>
          <div>
            {/* Trial banner */}
            <div style={{ padding: "16px 20px", background: "linear-gradient(135deg,rgba(41,168,255,.08),rgba(41,168,255,.03))", border: `1px solid ${C.accentDim}`, borderRadius: 10, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ padding: "2px 10px", background: C.accentGlow, border: `1px solid ${C.accentDim}`, borderRadius: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: ".08em" }}>7-DAY FREE TRIAL</span>
                </div>
                <span style={{ fontSize: 11, color: C.textDim }}>then ${price}/month · cancel anytime</span>
              </div>
              <h2 className="df" style={{ fontFamily: "'Counter-Strike',sans-serif", fontSize: 18, fontWeight: 300, color: C.text, letterSpacing: ".04em", marginBottom: 4 }}>Start Your {t.label} Trial</h2>
              <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
                Full access to all {t.label} features for 7 days, completely free. Card details are required to activate — you will not be charged until the trial ends. Cancel before day 7 and you owe nothing.
              </p>
            </div>

            <div className="mc" style={{ padding: "22px 22px" }}>
              <div className="sl" style={{ marginBottom: 18 }}>Card Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Cardholder Name</label>
                  <input className="inp" placeholder="Full name on card" value={trialCard.name} onChange={e => setTrialCard(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Card Number</label>
                  <div style={{ position: "relative" }}>
                    <input className="inp" placeholder="0000 0000 0000 0000" value={trialCard.num} onChange={e => setTrialCard(p => ({ ...p, num: fmtCard(e.target.value) }))} style={{ paddingRight: 48 }} />
                    <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 4 }}>
                      {["V","M"].map(b => <div key={b} style={{ width: 22, height: 15, borderRadius: 3, background: b==="V"?"#1a1f6e":"#eb001b", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 6, color: "#fff", fontWeight: 700 }}>{b==="V"?"VISA":"MC"}</span></div>)}
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>Expiry</label>
                    <input className="inp" placeholder="MM/YY" value={trialCard.exp} onChange={e => setTrialCard(p => ({ ...p, exp: fmtExp(e.target.value) }))} />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: C.textDim, display: "block", marginBottom: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>CVV</label>
                    <input className="inp" placeholder="•••" type="password" maxLength={4} value={trialCard.cvv} onChange={e => setTrialCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g,"").slice(0,4) }))} />
                  </div>
                </div>
              </div>
              <hr className="dv" style={{ margin: "20px 0" }} />
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 18 }}>
                <div onClick={() => setAgreedTrial(!agreedTrial)} style={{ width: 16, height: 16, borderRadius: 3, border: `1px solid ${agreedTrial ? C.accent : C.border}`, background: agreedTrial ? C.accentGlow : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all .15s" }}>
                  {agreedTrial && <IC n="check" s={9} c={C.accent} />}
                </div>
                <span style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7 }}>
                  I understand that after the 7-day free trial, I will be automatically charged <strong style={{ color: C.text }}>${price}/month</strong> ({trialStep.billing === "annual" ? "billed annually" : "billed monthly"}) until I cancel. I can cancel at any time before the trial ends at no cost.
                </span>
              </label>
              <button
                className="btn bp"
                style={{ width: "100%", padding: 14, fontSize: 13, opacity: (trialCardValid && agreedTrial && !trialProcessing) ? 1 : 0.42, cursor: (trialCardValid && agreedTrial && !trialProcessing) ? "pointer" : "not-allowed" }}
                onClick={handleStartTrial}
                disabled={!trialCardValid || !agreedTrial || trialProcessing}>
                {trialProcessing
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: C.bg, display: "inline-block" }} />
                      <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: C.bg, display: "inline-block", animationDelay: ".15s" }} />
                      <span className="pu" style={{ width: 6, height: 6, borderRadius: "50%", background: C.bg, display: "inline-block", animationDelay: ".3s" }} />
                    </span>
                  : "Activate Free Trial →"}
              </button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 14 }}>
                {[{icon:"shield",label:"256-bit SSL"},{icon:"lock",label:"Secure"},{icon:"check",label:"Cancel Anytime"}].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <IC n={b.icon} s={11} c={C.textDim} />
                    <span style={{ fontSize: 10, color: C.textDim }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div style={{ position: "sticky", top: 20 }}>
            <div className="mc" style={{ padding: "18px 18px" }}>
              <div style={{ textAlign: "center", paddingBottom: 14, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
                <div style={{ fontSize: 22, color: C.accent, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>$0 today</div>
                <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".08em" }}>THEN ${price}/MONTH AFTER 7 DAYS</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {[
                  `Full ${t.label} access for 7 days`,
                  "No charge during trial period",
                  "Cancel before day 7 — owe nothing",
                  "Auto-renews at plan rate",
                  "All features unlocked immediately",
                ].map((f,i) => (
                  <div key={i} style={{ display: "flex", gap: 8 }}>
                    <IC n="check" s={11} c={C.accent} />
                    <span style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "10px 12px", background: "rgba(233,30,167,.05)", border: "1px solid rgba(233,30,167,.12)", borderRadius: 6 }}>
                <div style={{ fontSize: 11, color: C.pink, fontWeight: 600, marginBottom: 3 }}>Trial reminder</div>
                <div style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.6 }}>We will email you 24 hours before your trial ends as a reminder. You will not be charged if you cancel before {new Date(Date.now()+7*864e5).toLocaleDateString("en-GB",{day:"numeric",month:"long"})}.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main pricing page ──────────────────────────────────────────────────────
  return (
    <div className="fi">
      <div style={{ marginBottom: 28 }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:6 }}>
          <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28, fontWeight:300}}>Membership</h1>
          <span style={{ fontSize:10, color:C.textDim, letterSpacing:".1em", textTransform:"uppercase" }}>Structured access. No hidden terms.</span>
        </div>
        <p style={{ color:C.textMuted, fontSize:14, maxWidth:520 }}>Select the tier appropriate to your current stage of development. All paid plans include a 7-day free trial.</p>
      </div>

      {/* Free trial badge */}
      <div style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 16px", background:"linear-gradient(90deg,rgba(41,168,255,.07),rgba(41,168,255,.02))", border:`1px solid ${C.accentDim}`, borderRadius:8, marginBottom:20 }}>
        <IC n="zap" s={16} c={C.accent}/>
        <span style={{ fontSize:13, color:C.text, fontWeight:500 }}>7-Day Free Trial on all paid plans</span>
        <span style={{ fontSize:12, color:C.textMuted }}>— Full access, card required, cancel anytime before day 7</span>
      </div>

      {/* Billing toggle */}
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
        <span style={{ fontSize:12, color:billingAnnual?C.textDim:C.text, fontWeight:billingAnnual?400:600 }}>Monthly</span>
        <div onClick={() => setBillingAnnual(v => !v)} style={{ width:40, height:22, borderRadius:11, cursor:"pointer", transition:"background .2s", background:billingAnnual?C.accent:"rgba(255,255,255,.12)", position:"relative", flexShrink:0 }}>
          <div style={{ position:"absolute", top:3, left:billingAnnual?21:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }}/>
        </div>
        <span style={{ fontSize:12, color:billingAnnual?C.text:C.textDim, fontWeight:billingAnnual?600:400 }}>Annual</span>
        {billingAnnual && <span style={{ fontSize:10, fontWeight:700, color:C.accent, letterSpacing:".06em", padding:"2px 8px", border:`1px solid ${C.accent}40`, borderRadius:3 }}>SAVE 20%</span>}
      </div>

      {/* Tier cards */}
      <div className="pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:24 }}>
        {["free","45","65","95"].map(tid => {
          const t = TIERS[tid];
          const isCurrent = t.id === currentTier;
          const isBelow = t.order < TIERS[currentTier].order;
          const price = t.monthly === 0 ? "$0" : billingAnnual ? `$${t.annual}` : `$${t.monthly}`;
          const billing = t.monthly === 0 ? "" : billingAnnual ? "/month, billed annually" : "/month";
          const annualSave = (t.monthly - t.annual) * 12;
          return (
            <div key={t.id} style={{ border:`1px solid ${isCurrent?t.color:C.border}`, borderRadius:8, padding:18, background:isCurrent?`linear-gradient(135deg,rgba(13,16,24,.95),${t.color}08)`:"rgba(13,16,24,.82)", backdropFilter:"blur(8px)", display:"flex", flexDirection:"column", transition:"all .2s", position:"relative" }}
              onMouseEnter={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=C.accent+"50"; }}
              onMouseLeave={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=C.border; }}>
              {t.id==="65" && <div style={{ position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)", background:C.accent, color:"#fff", fontSize:9, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:"2px 10px", borderRadius:"0 0 5px 5px" }}>Most Popular</div>}
              {t.monthly > 0 && !isCurrent && (
                <div style={{ position:"absolute", top:8, right:8, padding:"2px 7px", background:"rgba(41,168,255,.1)", border:`1px solid ${C.accentDim}`, borderRadius:3 }}>
                  <span style={{ fontSize:8, color:C.accent, fontWeight:700, letterSpacing:".06em" }}>7-DAY FREE TRIAL</span>
                </div>
              )}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:isCurrent?t.color:C.textMuted, letterSpacing:".08em", textTransform:"uppercase", marginBottom:6 }}>{t.label}</div>
                <div className="mn" style={{ fontSize:24, color:isCurrent?t.color:C.text, fontWeight:400, lineHeight:1 }}>{price}</div>
                <div style={{ fontSize:10, color:C.textDim, marginTop:3 }}>{billing||"free forever"}</div>
                {billingAnnual && t.monthly > 0 && (
                  <div style={{ fontSize:9, color:C.accent, marginTop:4 }}>Save ${annualSave}/yr</div>
                )}
              </div>
              <hr className="dv" style={{ margin:"10px 0" }}/>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
                {TIER_FEATURES[t.id].map(f=>(
                  <div key={f} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                    <IC n="check" s={10} c={isCurrent?t.color:C.textDim}/>
                    <span style={{ fontSize:12, color:isCurrent?C.textMuted:C.textDim, lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              {isCurrent
                ? <div style={{ textAlign:"center", fontSize:11, fontWeight:600, color:t.color, padding:"8px 0", border:`1px solid ${t.color}40`, borderRadius:4 }}>Current Plan</div>
                : isBelow
                ? <div style={{ textAlign:"center", fontSize:11, color:C.textDim, padding:"8px 0" }}>Downgrade</div>
                : t.monthly === 0
                ? null
                : <button className="btn bp" style={{ width:"100%", fontSize:11, padding:"9px 0" }}
                    onClick={() => setTrialStep({ tierId: t.id, billing: billingAnnual ? "annual" : "monthly" })}>
                    Start Free Trial
                  </button>
              }
            </div>
          );
        })}
      </div>

      {/* Course & Education section */}
      <div className="sl" style={{ marginBottom: 14 }}>Courses & Programmes</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:10, marginBottom:24 }}>
        {COURSE_HIGHLIGHTS.map(c => {
          const isFree     = c.access === "free";
          const isPurchase = c.access === "purchase";
          const isApply    = c.access === "apply";
          const isPaid     = c.access === "paid";
          const hasSub     = currentTier !== "free";
          const accessible = isFree || (isPaid && hasSub) || isPurchase || isApply;
          const dimmed     = !isFree && !hasSub && !isApply;
          return (
            <div key={c.label} className="mc" style={{ padding:"14px 16px", opacity: dimmed ? 0.55 : 1 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:9, fontWeight:700, letterSpacing:".08em", padding:"2px 7px", borderRadius:3, background:`${c.color}15`, color:c.color, border:`1px solid ${c.color}30` }}>{c.badge}</span>
                    {isFree      && <span style={{ fontSize:9, color:C.accent, letterSpacing:".03em" }}>Free — no subscription needed</span>}
                    {isPaid      && !hasSub && <span style={{ fontSize:9, color:C.textDim }}>Core plan or above required</span>}
                    {isPaid      && hasSub  && <span style={{ fontSize:9, color:C.accent }}>Included in your plan</span>}
                    {isPurchase  && hasSub  && <span style={{ fontSize:9, color:C.textDim }}>One-time $495 add-on</span>}
                    {isPurchase  && !hasSub && <span style={{ fontSize:9, color:C.textDim }}>Active subscription required</span>}
                  </div>
                  <div style={{ fontSize:13, color:C.text, fontWeight:500, marginBottom:4 }}>{c.label}</div>
                  <div style={{ fontSize:11, color:C.textDim, lineHeight:1.6 }}>{c.note}</div>
                </div>
                <button
                  className={isApply || isFree || (isPaid && hasSub) ? "btn bg" : "btn bp"}
                  style={{ fontSize:10, padding:"5px 10px", flexShrink:0, marginTop:2 }}
                  onClick={() => setPage("education")}>
                  {isApply                        ? "Apply"
                  : isFree                        ? "Access Free"
                  : isPaid  && hasSub             ? "Access"
                  : isPaid  && !hasSub            ? "Upgrade"
                  : isPurchase && hasSub          ? "Purchase"
                  : isPurchase && !hasSub         ? "Upgrade"
                  :                                 "View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fine print */}
      <div style={{ padding:"14px 18px", background:"rgba(13,16,24,.6)", border:`1px solid ${C.border}`, borderRadius:6 }}>
        <div style={{ fontSize:12, color:C.textDim, lineHeight:1.9 }}>
          All subscriptions include a 7-day free trial — card details required at signup, charged automatically after trial ends. Monthly plans bill on the same date each month. Annual plans are billed in full at a 20% discount. Downgrade takes effect at end of billing period — no data deleted. Course purchases require an active subscription; if your subscription lapses, course content is preserved in read-only mode and resumes on reactivation. Cancel anytime from your Account page.
        </div>
      </div>
    </div>
  );
};

// ── Account Page ──────────────────────────────────────────────────────────────
const Account = ({ currentTier, setTier, setPage, aiUsed, subStatus, setSubStatus, onUpgrade, user }) => {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName,  setLastName]  = useState(user?.last_name  || "");
  const [timezone,  setTimezone]  = useState(user?.timezone   || "UTC");
  const [expLevel,  setExpLevel]  = useState(user?.experience_level || "");
  const [riskProf,  setRiskProf]  = useState(user?.risk_profile     || "");

  // Security tab state
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew,     setPwNew]     = useState("");
  const [pwMsg,     setPwMsg]     = useState("");
  const [pwSaving,  setPwSaving]  = useState(false);

  const token = localStorage.getItem("fis_token");

  const saveProfile = async () => {
    setProfileSaving(true); setProfileMsg("");
    try {
      const data = await api.put("/auth/profile", {
        first_name: firstName, last_name: lastName,
        timezone, experience_level: expLevel, risk_profile: riskProf,
      }, token);
      if (data.success) {
        // Update localStorage user
        const saved = JSON.parse(localStorage.getItem("fis_user") || "{}");
        localStorage.setItem("fis_user", JSON.stringify({ ...saved, first_name: firstName, last_name: lastName, timezone, experience_level: expLevel, risk_profile: riskProf }));
        setProfileMsg("✓ Profile saved");
        setProfileEdit(false);
      } else {
        setProfileMsg(data.error?.message || "Failed to save.");
      }
    } catch { setProfileMsg("Unable to connect."); }
    finally { setProfileSaving(false); }
  };

  const savePassword = async () => {
    if (!pwCurrent || !pwNew) { setPwMsg("Please fill in both fields."); return; }
    if (pwNew.length < 8) { setPwMsg("New password must be at least 8 characters."); return; }
    if (!/[A-Z]/.test(pwNew)) { setPwMsg("New password must contain an uppercase letter."); return; }
    if (!/[0-9]/.test(pwNew)) { setPwMsg("New password must contain a number."); return; }
    setPwSaving(true); setPwMsg("");
    try {
      const data = await api.post("/auth/change-password", { current_password: pwCurrent, password: pwNew }, token);
      if (data.success) {
        setPwMsg("✓ Password changed. Please log in again.");
        setPwCurrent(""); setPwNew("");
      } else {
        setPwMsg(data.error?.message || "Failed to change password.");
      }
    } catch { setPwMsg("Unable to connect."); }
    finally { setPwSaving(false); }
  };
  const [tab, setTab] = useState("subscription");
  const tier = TIERS[currentTier];

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Account</h1>
        <p style={{ color:C.textMuted,fontSize:14 }}>Subscription management, usage tracking, and security settings.</p>
      </div>

      {/* Profile strip */}
      <div className="mc" style={{ marginBottom:18,borderColor:tier.color,display:"flex",gap:18,alignItems:"center",padding:"14px 20px" }}>
        <div style={{ width:44,height:44,borderRadius:"50%",background:`${tier.color}18`,border:`1px solid ${tier.color}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:19,color:tier.color,fontFamily:"Inter,sans-serif",fontWeight:700 }}>{(user?.first_name?.[0] || user?.email?.[0] || "U").toUpperCase()}</span>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:500,color:C.text,marginBottom:2 }}>{user?.first_name || ""} {user?.last_name || ""}</div>
          <div style={{ fontSize:12,color:C.textMuted }}>{user?.email || ""}</div>
        </div>
        <div style={{ marginLeft:"auto",display:"flex",gap:10,alignItems:"center" }}>
          <div style={{ textAlign:"right",marginRight:8 }}>
            <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase" }}>Current Plan</div>
            <div style={{ fontSize:13,fontWeight:600,color:tier.color }}>{tier.label} — {tier.price}{tier.billing}</div>
          </div>
          <span className="tg" style={{ background:`${tier.color}18`,color:tier.color,border:`1px solid ${tier.color}40` }}>Active</span>
          <button className="btn bg" onClick={() => { setProfileEdit(!profileEdit); setProfileMsg(""); }}>{profileEdit ? "Cancel" : "Edit Profile"}</button>
          <button className="btn bg" style={{ display:"flex",alignItems:"center",gap:6 }} onClick={() => { if(window.__fortitudeLogout) window.__fortitudeLogout(); }}><IC n="logout" s={13}/>Sign Out</button>
        </div>
      </div>

      {/* Edit Profile Panel */}
      {profileEdit && (
        <div className="mc" style={{ marginBottom:16, borderColor:C.accentDim }}>
          <div className="sl" style={{ marginBottom:14 }}>Edit Profile</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginBottom:12 }}>
            <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".07em",textTransform:"uppercase" }}>First Name</label>
              <input className="inp" value={firstName} onChange={e=>setFirstName(e.target.value)}/></div>
            <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".07em",textTransform:"uppercase" }}>Last Name</label>
              <input className="inp" value={lastName} onChange={e=>setLastName(e.target.value)}/></div>
            <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".07em",textTransform:"uppercase" }}>Experience Level</label>
              <select className="inp" value={expLevel} onChange={e=>setExpLevel(e.target.value)}>
                <option value="">Select...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select></div>
            <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".07em",textTransform:"uppercase" }}>Risk Profile</label>
              <select className="inp" value={riskProf} onChange={e=>setRiskProf(e.target.value)}>
                <option value="">Select...</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select></div>
            <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".07em",textTransform:"uppercase" }}>Timezone</label>
              <select className="inp" value={timezone} onChange={e=>setTimezone(e.target.value)}>
                {["UTC","Africa/Johannesburg","America/New_York","America/Chicago","America/Los_Angeles","Europe/London","Europe/Paris","Asia/Dubai","Asia/Singapore","Asia/Tokyo","Australia/Sydney"].map(tz=>(
                  <option key={tz} value={tz}>{tz.replace("_"," ")}</option>
                ))}
              </select></div>
          </div>
          {profileMsg && <div style={{ fontSize:12, color:profileMsg.startsWith("✓")?C.accent:C.pink, marginBottom:10 }}>{profileMsg}</div>}
          <button className="btn bp" style={{ padding:"9px 20px", opacity:profileSaving ? .6 : 1 }} onClick={saveProfile} disabled={profileSaving}>
            {profileSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Tab nav */}
      <div style={{ display:"flex",gap:2,marginBottom:16,borderBottom:`1px solid ${C.border}`,paddingBottom:0,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none" }}>
        {[{id:"subscription",label:"Subscription"},{id:"affiliate",label:"Affiliate Programme"},{id:"usage",label:"AI Usage & Limits"},{id:"security",label:"Security"}].map(t=>(
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
                  {l:"Next billing",v:"Managed via Stripe", c:C.textMuted},
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
            <div style={{ fontSize:12,color:C.textDim,lineHeight:1.9 }}>AI cost protection: Identical chart submissions within 24h return cached analysis. Background behavioral metric recalculation is batched every 30 minutes. Fair-use cap applies to unlimited tiers at 50 chart analyses/24h.</div>
          </div>
        </div>
      )}

      {tab==="security" && (
        <div className="fi">
          <div className="mc" style={{ marginBottom:14 }}>
            <div className="sl">Change Password</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12 }}>
              <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".07em",textTransform:"uppercase" }}>Current Password</label>
                <input className="inp" type="password" placeholder="••••••••" value={pwCurrent} onChange={e=>setPwCurrent(e.target.value)}/></div>
              <div><label style={{ fontSize:11,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".07em",textTransform:"uppercase" }}>New Password</label>
                <input className="inp" type="password" placeholder="Min 8 chars, 1 uppercase, 1 number" value={pwNew} onChange={e=>setPwNew(e.target.value)}/></div>
            </div>
            {pwMsg && <div style={{ fontSize:12, color:pwMsg.startsWith("✓")?C.accent:C.pink, marginTop:8 }}>{pwMsg}</div>}
            <div style={{ marginTop:14 }}><button className="btn bp" onClick={savePassword} disabled={pwSaving}>{pwSaving?"Saving…":"Change Password"}</button></div>
          </div>
          <div className="mc" style={{ marginBottom:14 }}>
            <div className="sl">Email Address</div>
            <div style={{ fontSize:13,color:C.textMuted,marginBottom:10 }}>Your registered email address. Contact support to change it.</div>
            <input className="inp" defaultValue={user?.email || ""} disabled style={{ opacity:.6 }}/>
          </div>
          <div className="mc">
            <div className="sl">Data & Privacy</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["Journal data is stored server-side and never shared with third parties.","Downgrading preserves all data in read-only format.","Account deletion removes all data permanently after 30-day grace period.","AI analysis inputs are not used for model training."].map((t,i)=>(
                <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                  <IC n="check" s={11} c={C.accent}/>
                  <span style={{ fontSize:13,color:C.textMuted,lineHeight:1.7 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14 }}><button className="btn bg" style={{ borderColor:C.pinkDim,color:C.pink,fontSize:11 }}>Request Account Deletion</button></div>
          </div>
        </div>
      )}

      {tab==="affiliate" && <AffiliatePortal currentTier={currentTier} setPage={setPage} />}
    </div>
  );
};


// ── Affiliate Portal ──────────────────────────────────────────────────────────

function generateCode(name) {
  const clean = name.replace(/[^a-zA-Z]/g,"").slice(0,6).toUpperCase();
  const suffix = Math.random().toString(36).slice(2,5).toUpperCase();
  return `FMF-${clean}-${suffix}`;
}

const AffiliatePortal = ({ currentTier, setPage }) => {
  const BASE_URL = "https://fortitude-app.vercel.app/join";
  const token = localStorage.getItem("fis_token");

  const [code,         setCode]         = useState("");
  const [referrals,    setReferrals]    = useState([]);
  const [rewards,      setRewards]      = useState([]);
  const [statusData,   setStatusData]   = useState(null);
  const [loadingData,  setLoadingData]  = useState(true);
  const [customInput,  setCustomInput]  = useState("");
  const [codeError,    setCodeError]    = useState("");
  const [codeSaving,   setCodeSaving]   = useState(false);
  const [copiedCode,   setCopiedCode]   = useState(false);
  const [copiedUrl,    setCopiedUrl]    = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (!token) return;
    setLoadingData(true);
    Promise.all([
      api.get("/affiliate/status",   token),
      api.get("/affiliate/referrals",token),
      api.get("/affiliate/rewards",  token),
    ]).then(([statusRes, refsRes, rewsRes]) => {
      if (statusRes.success) { setStatusData(statusRes.data); setCode(statusRes.data.referralCode || ""); }
      if (refsRes.success)   setReferrals(refsRes.data.referrals || []);
      if (rewsRes.success)   setRewards(rewsRes.data.rewards || []);
    }).catch(()=>{}).finally(()=>setLoadingData(false));
  }, [token]);

  const referralUrl = code ? `${BASE_URL}?ref=${code}` : "";

  const filteredRefs = activeFilter === "all"
    ? referrals
    : referrals.filter(r => r.status === activeFilter);

  const totalEarned     = statusData?.total_earned_usd    || 0;
  const pendingEarnings = statusData?.pending_earnings    || 0;
  const activeCount     = statusData?.active_referrals    || referrals.filter(r=>r.status==="active").length;
  const trialCount      = referrals.filter(r=>r.status==="trial").length;

  const validateCode = (val) => {
    if (val.length < 3) return "Code must be at least 3 characters.";
    if (!/^[a-zA-Z0-9_-]+$/.test(val)) return "Letters, numbers, hyphens and underscores only.";
    return "";
  };

  const handleSaveCode = async () => {
    const val = customInput.trim();
    if (!val) { setCodeError("Please enter a code."); return; }
    const err = validateCode(val);
    if (err) { setCodeError(err); return; }
    setCodeSaving(true); setCodeError("");
    try {
      const data = await api.put("/affiliate/code/custom", { code: val }, token);
      if (data.success) {
        setCode(data.data.referralCode || val.toUpperCase().replace(/\s+/g,"-"));
        setCustomInput("");
      } else {
        setCodeError(data.error?.message || "Code unavailable.");
      }
    } catch { setCodeError("Unable to save. Please try again."); }
    finally { setCodeSaving(false); }
  };

  const handleGenerate = async () => {
    setCodeSaving(true); setCodeError("");
    try {
      const data = await api.post("/affiliate/code/generate", {}, token);
      if (data.success) setCode(data.data.referralCode || "");
      else setCodeError(data.error?.message || "Could not generate code.");
    } catch { setCodeError("Unable to generate. Please try again."); }
    finally { setCodeSaving(false); }
  };

  const copyText = (text, which) => {
    navigator.clipboard?.writeText(text).catch(()=>{});
    if (which === "code") { setCopiedCode(true); setTimeout(()=>setCopiedCode(false),2000); }
    else                  { setCopiedUrl(true);  setTimeout(()=>setCopiedUrl(false),2000); }
  };

  const STATUS_META = {
    active:    { label:"Active",    color:C.accent },
    trial:     { label:"On Trial",  color:"#d4af37" },
    cancelled: { label:"Cancelled", color:C.pink },
    paid:      { label:"Paid",      color:C.accent },
  };

  return (
    <div className="fi">
      {/* KPI strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:20 }}>
        {[
          { l:"Total Earned",    v:`$${totalEarned.toFixed(2)}`,     c:C.accent, s:"Paid out" },
          { l:"Pending",         v:`$${pendingEarnings.toFixed(2)}`, c:C.accent, s:"Paid 30 days in arrears" },
          { l:"Active Referrals",v:activeCount,                       c:C.accent, s:`${trialCount} on trial` },
          { l:"Conversion Rate", v:"71%",                             c:C.accent, s:"vs 58% platform avg" },
          { l:"Reward Rate",     v:"10–20%",                          c:C.accent,  s:"Per successful referral" },
        ].map(m=>(
          <div key={m.l} className="mc" style={{ textAlign:"center", padding:"14px 10px" }}>
            <div className="mn" style={{ fontSize:22, color:m.c, lineHeight:1.1 }}>{m.v}</div>
            <div style={{ fontSize:10, color:C.textDim, marginTop:3, letterSpacing:".04em", textTransform:"uppercase" }}>{m.l}</div>
            <div style={{ fontSize:10, color:C.textDim, marginTop:2 }}>{m.s}</div>
          </div>
        ))}
      </div>

      {/* 5-referral threshold notice */}
      {activeCount < 5 && (
        <div style={{ padding:"11px 16px", background:"rgba(233,30,167,.05)", border:"1px solid rgba(233,30,167,.18)", borderRadius:8, marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
          <IC n="alert" s={16} c={C.pink}/>
          <div>
            <span style={{ fontSize:12, color:C.pink, fontWeight:600 }}>Rewards locked — </span>
            <span style={{ fontSize:12, color:C.textMuted }}>You need <strong style={{ color:C.text }}>{5 - activeCount} more successful referral{5 - activeCount !== 1 ? "s" : ""}</strong> to unlock payouts. Rewards earned before this threshold are held and released automatically once you reach 5.</span>
          </div>
        </div>
      )}
      {activeCount >= 5 && (
        <div style={{ padding:"11px 16px", background:"rgba(41,168,255,.05)", border:`1px solid ${C.accentDim}`, borderRadius:8, marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
          <IC n="check" s={16} c={C.accent}/>
          <span style={{ fontSize:12, color:C.textMuted }}><strong style={{ color:C.accent }}>Rewards active.</strong> You have reached the 5-referral threshold. All qualifying rewards are eligible for monthly payout.</span>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) min(320px,42%)", gap:16, marginBottom:20 }}>
        {/* Left — referral code + URL */}
        <div>
          <div className="mc" style={{ padding:"20px 22px", marginBottom:14 }}>
            <div className="sl" style={{ marginBottom:16 }}>Your Referral Code</div>

            {/* Code display */}
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px", background:C.surfaceAlt, borderRadius:7, border:`1px solid ${C.border}`, marginBottom:14 }}>
              <span className="mn" style={{ fontSize:22, color:C.accent, letterSpacing:".08em", flex:1 }}>{code}</span>
              <button className="btn bg" style={{ fontSize:11, padding:"6px 12px", flexShrink:0 }}
                onClick={() => copyText(code, "code")}>
                {copiedCode ? "Copied ✓" : "Copy Code"}
              </button>
            </div>

            {/* Custom code input */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, color:C.textDim, marginBottom:8, letterSpacing:".06em", textTransform:"uppercase" }}>Customise your code</div>
              <div style={{ display:"flex", gap:8 }}>
                <input className="inp" style={{ flex:1, textTransform:"uppercase", letterSpacing:".06em" }}
                  placeholder="e.g. MYCODE or TRADER2026"
                  value={customInput}
                  onChange={e => {
                    setCustomInput(e.target.value.toUpperCase().replace(/\s/g,"-").slice(0,20));
                    setCodeSaved(false);
                    setCodeError("");
                  }}
                  onKeyDown={e => e.key==="Enter" && handleSaveCode()}
                />
                <button className="btn bp" style={{ fontSize:11, padding:"8px 16px", flexShrink:0 }} onClick={handleSaveCode}>Save</button>
                <button className="btn bg" style={{ fontSize:11, padding:"8px 14px", flexShrink:0 }} onClick={handleGenerate} title="Generate a random code">↻</button>
              </div>
              {codeError && <div style={{ fontSize:11, color:C.pink, marginTop:6 }}>{codeError}</div>}
              {codeSaved && !codeError && !customInput && <div style={{ fontSize:11, color:C.accent, marginTop:6 }}>✓ Code active</div>}
            </div>

            <div style={{ padding:"10px 14px", background:"rgba(13,16,24,.6)", borderRadius:6, border:`1px solid ${C.border}`, fontSize:11, color:C.textDim, lineHeight:1.8 }}>
              Your code is unique and cannot be used by another member. Changing your code does not invalidate existing referrals — previous sign-ups remain tracked to your account.
            </div>
          </div>

          {/* Referral URL */}
          <div className="mc" style={{ padding:"20px 22px" }}>
            <div className="sl" style={{ marginBottom:14 }}>Your Referral Link</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 14px", background:C.surfaceAlt, borderRadius:7, border:`1px solid ${C.border}`, marginBottom:12 }}>
              <span style={{ fontSize:12, color:C.textMuted, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", fontFamily:"JetBrains Mono,monospace" }}>{referralUrl}</span>
              <button className="btn bg" style={{ fontSize:11, padding:"6px 12px", flexShrink:0 }}
                onClick={() => copyText(referralUrl, "url")}>
                {copiedUrl ? "Copied ✓" : "Copy Link"}
              </button>
            </div>

            {/* Share options */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {[
                { label:"Twitter / X",  bg:"#000",     href:`https://twitter.com/intent/tweet?text=I%20use%20Fortitude%20Market%20Intelligence%20to%20track%20my%20trading%20performance.%20Use%20my%20link%20for%20a%207-day%20free%20trial%3A%20${encodeURIComponent(referralUrl)}` },
                { label:"LinkedIn",     bg:"#0077b5",   href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}` },
                { label:"WhatsApp",     bg:"#25d366",   href:`https://wa.me/?text=${encodeURIComponent("Use my Fortitude referral link for a free trial: "+referralUrl)}` },
                { label:"Telegram",     bg:"#2ca5e0",   href:`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent("7-day free trial on Fortitude Market Intelligence")}` },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", borderRadius:5, background:`${s.bg}22`, border:`1px solid ${s.bg}44`, color:C.textMuted, textDecoration:"none", fontSize:11, transition:"all .15s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${s.bg}40`; e.currentTarget.style.color=C.text;}}
                  onMouseLeave={e=>{e.currentTarget.style.background=`${s.bg}22`; e.currentTarget.style.color=C.textMuted;}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — commission structure */}
        <div>
          <div className="mc" style={{ padding:"20px 20px", border:"1px solid rgba(212,175,55,.15)", marginBottom:14 }}>
            <div className="sl" style={{ marginBottom:14, color:C.accent }}>Referral Reward Structure</div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {[
                { tier:"Core ($45/mo)",    rate:"20%",  amount:"$9/mo",  color:C.accent },
                { tier:"Pro ($65/mo)",     rate:"20%",  amount:"$13/mo", color:C.accent },
                { tier:"Elite ($95/mo)",   rate:"20%",  amount:"$19/mo", color:C.accent },
                { tier:"Advanced Course",  rate:"10%",  amount:"$49.50", color:C.accent },
                { tier:"Workshop",         rate:"10%",  amount:"$49.50", color:C.accent },
                { tier:"Mentorship",       rate:"10%",  amount:"$299.50",color:C.accent },
              ].map((r,i,arr) => (
                <div key={r.tier} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom: i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <div>
                    <div style={{ fontSize:12, color:C.text }}>{r.tier}</div>
                    <div style={{ fontSize:10, color:C.textDim }}>{r.rate} of first paid billing cycle</div>
                  </div>
                  <div className="mn" style={{ fontSize:14, color:r.color }}>{r.amount}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14, padding:"10px 12px", background:"rgba(212,175,55,.05)", border:"1px solid rgba(212,175,55,.12)", borderRadius:6, fontSize:11, color:C.textDim, lineHeight:1.7 }}>
              Referral rewards are calculated on the first successful paid billing cycle. Rewards are paid in arrears — a minimum of 30 days after the qualifying payment — to allow for chargeback resolution. Rewards are not earned on trial periods or subscriptions that cancel before first billing. <strong style={{ color:C.text }}>Rewards unlock only after 5 successful referrals.</strong> Payouts processed monthly on the 1st.
            </div>
          </div>

          <div className="mc" style={{ padding:"18px 20px" }}>
            <div className="sl" style={{ marginBottom:12 }}>Payout Settings</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                { l:"Payout Method",  v:"Bank Transfer (SWIFT)" },
                { l:"Minimum Payout", v:"$50.00" },
                { l:"Next Payout",    v:"1 April 2026" },
                { l:"Currency",       v:"USD" },
              ].map(r=>(
                <div key={r.l} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:12, color:C.textDim }}>{r.l}</span>
                  <span style={{ fontSize:12, color:C.text }}>{r.v}</span>
                </div>
              ))}
              <button className="btn bg" style={{ fontSize:11, marginTop:6 }}>Update Payout Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* Referral activity table */}
      <div className="mc" style={{ padding:"20px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div className="sl" style={{ margin:0 }}>Referral Activity</div>
          <div style={{ display:"flex", gap:6 }}>
            {["all","active","trial","cancelled"].map(f=>(
              <button key={f} className="btn bg" style={{ fontSize:10, padding:"4px 10px", borderColor:activeFilter===f?C.accent:C.border, color:activeFilter===f?C.accent:C.textDim }}
                onClick={()=>setActiveFilter(f)}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="mob-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Referral</th>
                <th>Date</th>
                <th>Plan</th>
                <th>Status</th>
                <th style={{ textAlign:"right" }}>Reward</th>
                <th style={{ textAlign:"right" }}>Paid</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefs.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign:"center", color:C.textDim, padding:"20px 0" }}>No referrals matching this filter.</td></tr>
              ) : filteredRefs.map(r => {
                const sm = STATUS_META[r.status];
                return (
                  <tr key={r.id}>
                    <td style={{ fontWeight:500 }}>{r.name}</td>
                    <td style={{ color:C.textDim }}>{r.date}</td>
                    <td>{r.plan}</td>
                    <td><span style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:`${sm.color}15`, color:sm.color, border:`1px solid ${sm.color}30` }}>{sm.label}</span></td>
                    <td className="mn" style={{ textAlign:"right", color: r.commission > 0 ? C.accent : C.textDim }}>{r.commission > 0 ? `$${r.commission.toFixed(2)}` : "—"}</td>
                    <td style={{ textAlign:"right" }}>
                      {r.paid
                        ? <span style={{ fontSize:10, color:C.accent }}>✓ Paid</span>
                        : r.commission > 0
                          ? <span style={{ fontSize:10, color:"#d4af37" }}>Pending</span>
                          : <span style={{ fontSize:10, color:C.textDim }}>N/A</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Earnings summary footer */}
        <div style={{ display:"flex", justifyContent:"flex-end", gap:24, marginTop:14, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10, color:C.textDim, marginBottom:2 }}>Total paid</div>
            <div className="mn" style={{ fontSize:14, color:C.accent }}>${totalEarned.toFixed(2)}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10, color:C.textDim, marginBottom:2 }}>Pending</div>
            <div className="mn" style={{ fontSize:14, color:C.accent }}>${pendingEarnings.toFixed(2)}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:10, color:C.textDim, marginBottom:2 }}>Total pipeline</div>
            <div className="mn" style={{ fontSize:14, color:C.text }}>${(totalEarned+pendingEarnings).toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Terms note */}
      <div style={{ marginTop:14, padding:"12px 16px", background:"rgba(13,16,24,.6)", border:`1px solid ${C.border}`, borderRadius:6 }}>
        <div style={{ fontSize:11, color:C.textDim, lineHeight:1.9 }}>
          <strong style={{ color:C.textMuted }}>Referral Reward Programme Terms:</strong> Referral rewards are earned on the first successful paid billing cycle of each referred user. Rewards are paid in arrears — a minimum of 30 days after the qualifying payment clears — to allow adequate time for the resolution of any chargebacks or disputes. No reward is payable on trial periods, free plans, or subscriptions cancelled before the first billing date. Rewards are only activated once you have accumulated 5 successful qualifying referrals. Self-referrals are not permitted. Payouts are processed monthly on the 1st, subject to a minimum balance of $50. Fortitude Market Intelligence reserves the right to withhold or reclaim rewards where fraudulent referral activity is identified. Full programme terms available on request.
        </div>
      </div>
    </div>
  );
};

// ── Affiliate Landing (Sales Page) ───────────────────────────────────────────
const AffiliateLanding = ({ currentTier, setPage }) => {
  const isPaid = currentTier !== "free";

  // If paid member — show full portal immediately
  if (isPaid) return <AffiliatePortal currentTier={currentTier} setPage={setPage} />;

  // ── Free-tier gate: sales page ──────────────────────────────────────────────
  const STATS = [
    { v:"20%",    l:"Reward on every subscription referral" },
    { v:"10%",    l:"Reward on course & mentorship purchases" },
    { v:"$0",     l:"Cost to join — free with any paid plan" },
    { v:"Monthly",l:"Payouts, processed on the 1st" },
  ];

  const HOW = [
    { n:"01", title:"Upgrade your membership", body:"Any paid Fortitude plan (Core, Professional, or Elite) unlocks the Affiliate Programme instantly. No application, no waiting period." },
    { n:"02", title:"Get your unique referral link", body:"Generate your personal referral code and shareable link from the Affiliate dashboard. Share it anywhere — social media, Discord, email, YouTube." },
    { n:"03", title:"Earn on every successful referral", body:"When someone signs up through your link and completes their first paid billing cycle, your reward is calculated and queued for the next monthly payout." },
    { n:"04", title:"Reach 5 referrals to unlock payouts", body:"Rewards are held until you accumulate 5 successful referrals, then released automatically. This threshold protects against fraudulent activity and ensures quality." },
  ];

  const REWARDS = [
    { tier:"Core ($45/mo)",    rate:"20%", amount:"$9 / referral",   color:C.accent },
    { tier:"Professional ($65/mo)", rate:"20%", amount:"$13 / referral",  color:C.accent },
    { tier:"Elite ($95/mo)",   rate:"20%", amount:"$19 / referral",  color:C.accent },
    { tier:"Advanced Course",  rate:"10%", amount:"$49.50 one-time", color:C.accent },
    { tier:"5-Day Workshop",   rate:"10%", amount:"$49.50 one-time", color:C.accent },
    { tier:"Elite Mentorship", rate:"10%", amount:"$299.50 one-time",color:C.accent },
  ];

  return (
    <div className="fi">
      {/* Hero */}
      <div style={{ position:"relative", overflow:"hidden", borderRadius:10, padding:"36px 32px", marginBottom:20, background:"linear-gradient(135deg,rgba(13,16,24,.98),rgba(10,14,22,.95))", border:`1px solid ${C.accentDim}` }}>
        <div style={{ position:"absolute", top:0, right:0, width:320, height:240, background:"radial-gradient(ellipse at top right,rgba(41,168,255,.12),transparent)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:0, left:80, width:200, height:160, background:"radial-gradient(ellipse at bottom left,rgba(233,30,167,.07),transparent)", pointerEvents:"none" }} />
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:".12em", padding:"3px 10px", borderRadius:3, background:C.accentGlow, color:C.accent, border:`1px solid ${C.accentDim}` }}>AFFILIATE PROGRAMME</span>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:".1em", padding:"3px 10px", borderRadius:3, background:"rgba(233,30,167,.08)", color:C.pink, border:"1px solid rgba(233,30,167,.2)" }}>PAID MEMBERS ONLY</span>
          </div>
          <h1 className="df" style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:30, fontWeight:300, color:C.text, letterSpacing:".04em", marginBottom:12, lineHeight:1.2 }}>
            Earn While You Trade.
          </h1>
          <p style={{ fontSize:14, color:C.textMuted, lineHeight:1.9, maxWidth:540, marginBottom:24 }}>
            Refer other traders to Fortitude and earn a reward on every successful membership and course purchase. No cap on earnings, no complex tiers — just a straightforward reward for sharing something you already use.
          </p>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            <button className="btn bp" style={{ padding:"12px 24px", fontSize:13, fontWeight:600 }} onClick={() => setPage("pricing")}>
              Upgrade to Unlock →
            </button>
            <div style={{ padding:"12px 16px", background:"rgba(13,16,24,.8)", border:`1px solid ${C.border}`, borderRadius:5, fontSize:12, color:C.textMuted, display:"flex", alignItems:"center", gap:8 }}>
              <IC n="check" s={12} c={C.accent} />
              Included with every paid plan
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:20 }}>
        {STATS.map(s => (
          <div key={s.l} className="mc" style={{ textAlign:"center", padding:"18px 12px" }}>
            <div className="mn" style={{ fontSize:26, color:C.accent, lineHeight:1, marginBottom:6 }}>{s.v}</div>
            <div style={{ fontSize:11, color:C.textDim, lineHeight:1.6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) min(340px,42%)", gap:16, marginBottom:20, alignItems:"start" }}>
        {/* Left — how it works */}
        <div>
          <div className="mc" style={{ padding:"22px 24px", marginBottom:14 }}>
            <div className="sl" style={{ marginBottom:20 }}>How It Works</div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {HOW.map((step, i) => (
                <div key={step.n} style={{ display:"flex", gap:16, paddingBottom: i < HOW.length-1 ? 20 : 0, marginBottom: i < HOW.length-1 ? 20 : 0, borderBottom: i < HOW.length-1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ flexShrink:0 }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:C.accentGlow, border:`1px solid ${C.accentDim}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span className="mn" style={{ fontSize:11, color:C.accent }}>{step.n}</span>
                    </div>
                    {i < HOW.length-1 && <div style={{ width:1, height:"100%", background:C.border, margin:"6px auto 0", minHeight:8 }} />}
                  </div>
                  <div style={{ paddingTop:6 }}>
                    <div style={{ fontSize:14, color:C.text, fontWeight:500, marginBottom:5 }}>{step.title}</div>
                    <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.8 }}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial / social proof */}
          <div className="mc" style={{ padding:"18px 22px", background:"linear-gradient(135deg,rgba(13,16,24,.95),rgba(41,168,255,.03))", borderColor:C.accentDim }}>
            <div style={{ fontSize:13, color:C.textMuted, lineHeight:1.9, fontStyle:"italic", marginBottom:12 }}>
              "I shared my referral link in my trading Discord and hit 5 referrals within two weeks. The programme is straightforward and the dashboard makes it easy to track everything."
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:C.accentGlow, border:`1px solid ${C.accentDim}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:13, color:C.accent, fontWeight:700 }}>T</span>
              </div>
              <div>
                <div style={{ fontSize:12, color:C.text, fontWeight:500 }}>T. Adeyemi</div>
                <div style={{ fontSize:10, color:C.textDim }}>FMF Member · Professional Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — reward structure + CTA */}
        <div>
          <div className="mc" style={{ padding:"20px 20px", marginBottom:14, border:`1px solid ${C.accentDim}` }}>
            <div className="sl" style={{ marginBottom:14, color:C.accent }}>Reward Structure</div>
            <div style={{ display:"flex", flexDirection:"column", gap:0, marginBottom:16 }}>
              {REWARDS.map((r, i, arr) => (
                <div key={r.tier} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom: i<arr.length-1?`1px solid ${C.border}`:"none" }}>
                  <div>
                    <div style={{ fontSize:12, color:C.text }}>{r.tier}</div>
                    <div style={{ fontSize:10, color:C.textDim }}>{r.rate} of first paid cycle</div>
                  </div>
                  <div className="mn" style={{ fontSize:13, color:r.color, fontWeight:500 }}>{r.amount}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:"10px 12px", background:"rgba(41,168,255,.05)", border:`1px solid ${C.accentDim}`, borderRadius:6, fontSize:11, color:C.textDim, lineHeight:1.7 }}>
              Rewards are paid in arrears — 30 days after the qualifying payment — to allow for chargeback resolution. Payouts require a minimum of 5 successful referrals and a $50 balance.
            </div>
          </div>

          {/* Upgrade CTA card */}
          <div style={{ padding:"22px 22px", borderRadius:10, background:"linear-gradient(135deg,rgba(41,168,255,.07),rgba(41,168,255,.02))", border:`1px solid ${C.accentDim}` }}>
            <div style={{ fontSize:10, color:C.accent, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", marginBottom:10 }}>Unlock the Programme</div>
            <div style={{ fontSize:13, color:C.text, fontWeight:500, marginBottom:8, lineHeight:1.5 }}>Upgrade to any paid plan to access your affiliate dashboard, referral link, and earnings tracker.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
              {["Core — $45/month","Professional — $65/month","Elite — $95/month"].map((p,i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <IC n="check" s={11} c={C.accent} />
                  <span style={{ fontSize:12, color:C.textMuted }}>{p}</span>
                </div>
              ))}
            </div>
            <button className="btn bp" style={{ width:"100%", padding:13, fontSize:13 }} onClick={() => setPage("pricing")}>
              View Plans & Start Trial →
            </button>
            <div style={{ fontSize:10, color:C.textDim, textAlign:"center", marginTop:8 }}>All plans include a 7-day free trial</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mc" style={{ padding:"22px 24px", marginBottom:14 }}>
        <div className="sl" style={{ marginBottom:16 }}>Frequently Asked Questions</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
          {[
            { q:"When do I get paid?", a:"Rewards are processed monthly on the 1st. Your reward for a referral made in March will be paid on 1st May — 30 days in arrears to account for chargebacks." },
            { q:"Is there a cap on how much I can earn?", a:"No cap. There is no limit on the number of referrals you can make or the total rewards you can earn." },
            { q:"What counts as a successful referral?", a:"A referral is successful when the person you referred completes their first paid billing cycle on any Fortitude subscription or course purchase." },
            { q:"Does changing my referral code affect existing referrals?", a:"No. Changing your code does not invalidate previous referrals. All prior sign-ups remain tracked to your account permanently." },
            { q:"Can I refer someone on a free plan?", a:"Yes, but rewards are only triggered when they upgrade to a paid plan and complete their first billing cycle." },
            { q:"Why do I need 5 referrals before payouts unlock?", a:"The 5-referral threshold protects against fraudulent activity and ensures the programme remains sustainable. All rewards accrued before the threshold are held and released automatically once you reach it." },
          ].map(f => (
            <div key={f.q} style={{ paddingBottom:0 }}>
              <div style={{ fontSize:13, color:C.text, fontWeight:500, marginBottom:5 }}>{f.q}</div>
              <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.8 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div style={{ padding:"24px 28px", borderRadius:10, background:"linear-gradient(135deg,rgba(13,16,24,.97),rgba(13,16,24,.9))", border:`1px solid ${C.accentDim}`, display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontSize:16, color:C.text, fontWeight:500, marginBottom:4 }}>Ready to start earning?</div>
          <div style={{ fontSize:13, color:C.textMuted }}>Upgrade to any paid plan to unlock your referral dashboard instantly.</div>
        </div>
        <button className="btn bp" style={{ padding:"12px 28px", fontSize:13, fontWeight:600, flexShrink:0 }} onClick={() => setPage("pricing")}>
          Upgrade & Unlock →
        </button>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// QUANT RESEARCH ANALYST — Elite Only
// ═══════════════════════════════════════════════════════════════════════════════

const SAMPLE_EVENTS = [];

const NARRATIVES = [];

const ASSET_DATA = [];

const CAT_ICON_MAP = {
  "Monetary Policy":"bank", "Inflation Data":"inflation", "Economic Data":"gdp",
  "Geopolitical Conflict":"geopolitical", "War / Military":"war",
  "Energy / Commodities":"energy", "Banking / Financial Stability":"bank",
  "Fiscal Policy":"fiscal", "Trade / Tariffs":"trade",
  "Regulation":"regulation", "Crypto / Digital Assets":"crypto",
};
const CatIcon = ({ cat, s=18, c="currentColor" }) => <IC n={CAT_ICON_MAP[cat]||"globe"} s={s} c={c}/>;

const REGIME_META = {
  "Risk-On":      { color:"#29a8ff", bg:"rgba(41,168,255,.1)",  icon:"risk_on",    label:"Risk-On"      },
  "Risk-Off":     { color:"#e91ea7", bg:"rgba(233,30,167,.1)",  icon:"risk_off",   label:"Risk-Off"     },
  "Deflationary": { color:"#d4af37", bg:"rgba(212,175,55,.1)",  icon:"deflation_r",label:"Deflationary" },
  "Inflationary": { color:"#ff6b35", bg:"rgba(255,107,53,.1)",  icon:"inflation_r",label:"Inflationary" },
};

const QuantResearchAnalyst = ({ currentTier, setPage }) => {
  const isElite = currentTier === "95" || currentTier === "lifetime";
  const [activeTab,    setActiveTab]    = useState("feed");
  const [activeEvent,  setActiveEvent]  = useState(null);
  const [filterCat,    setFilterCat]    = useState("All");
  const [minScore,     setMinScore]     = useState(0);
  const [traderView,   setTraderView]   = useState(true);
  const [analysing,    setAnalysing]    = useState(false);
  const [aiAnalysis,   setAiAnalysis]   = useState("");
  const [alertThresh,  setAlertThresh]  = useState(7);
  const [lastUpdate,   setLastUpdate]   = useState(new Date());
  const [liveEvents,   setLiveEvents]   = useState(null);   // null = use fallback
  const [loadingFeed,  setLoadingFeed]  = useState(false);
  const [liveNarr,     setLiveNarr]     = useState(null);
  const [liveAssets,   setLiveAssets]   = useState(null);

  // Fetch live intelligence feed via Anthropic API
  const fetchLiveData = async () => {
    if (!isElite) return;
    setLoadingFeed(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Search for the top 5 most important macro market events happening right now or in the last 48 hours (central bank decisions, inflation data, geopolitical events, major economic releases). For each event return a JSON array with this exact structure. Return ONLY the JSON array, no other text:
[{
  "id":"ev1",
  "headline":"Short headline",
  "category":"Monetary Policy",
  "region":"United States",
  "status":"Confirmed",
  "impactScore":8,
  "confidence":"High",
  "urgency":"High",
  "regime":"Risk-Off",
  "summary":"2 sentence summary",
  "whatHappened":"What happened in detail",
  "whyItMatters":"Why this matters for markets",
  "immediateImpact":"Immediate market reaction",
  "secondaryEffects":"Secondary effects",
  "watchNext":"What to watch next",
  "invalidation":"What would invalidate this",
  "assets":{"XAU":1,"DXY":1,"OIL":0,"SPX":-1,"BONDS":-1,"EURUSD":-1,"BTCUSD":-1},
  "narratives":["Narrative 1","Narrative 2"],
  "sources":["Source 1"],
  "timestamp":"2026-03-22T10:00:00Z"
}]
Use 1 for bullish, -1 for bearish, 0 for neutral in assets. Make impactScore 1-10.`
          }]
        })
      });
      const data = await res.json();
      const textBlock = data.content?.find(b => b.type === "text");
      if (textBlock?.text) {
        const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const events = JSON.parse(jsonMatch[0]);
          if (Array.isArray(events) && events.length > 0) {
            setLiveEvents(events);
            setLastUpdate(new Date());
          }
        }
      }
    } catch(e) {
      console.error("QRA live fetch error:", e);
    } finally {
      setLoadingFeed(false);
    }
  };

  // Fetch live asset data
  const fetchLiveAssets = async () => {
    if (!isElite) return;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{
            role: "user",
            content: `Get current live prices and directional bias for these assets: Gold (XAU/USD), US Dollar Index (DXY), Brent Crude Oil, S&P 500, US 10Y Bond Yield, EUR/USD, USD/JPY, Bitcoin (BTC/USD). Return ONLY this JSON array:
[{"asset":"Gold","sym":"XAU/USD","bias":1,"score":7,"reason":"brief reason","change":"+0.5%","price":"2345.50"},{"asset":"US Dollar","sym":"DXY",...}]
bias: 1=bullish, -1=bearish, 0=neutral. score: 1-10 conviction. Use real current prices.`
          }]
        })
      });
      const data = await res.json();
      const textBlock = data.content?.find(b => b.type === "text");
      if (textBlock?.text) {
        const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const assets = JSON.parse(jsonMatch[0]);
          if (Array.isArray(assets) && assets.length > 0) setLiveAssets(assets);
        }
      }
    } catch(e) { console.error("QRA assets fetch:", e); }
  };

  useEffect(() => {
    if (!isElite) return;
    fetchLiveData();
    fetchLiveAssets();
    const t = setInterval(() => { setLastUpdate(new Date()); }, 30000);
    const t2 = setInterval(fetchLiveData, 300000);  // refresh feed every 5 min
    const t3 = setInterval(fetchLiveAssets, 60000); // refresh assets every 1 min
    return () => { clearInterval(t); clearInterval(t2); clearInterval(t3); };
  }, [isElite]);

  // Use live events if available, fall back to SAMPLE_EVENTS
  const EVENTS_DATA = liveEvents || SAMPLE_EVENTS;
  const cats = ["All",...new Set(EVENTS_DATA.map(e => e.category))].slice(0,6);
  const filtered = EVENTS_DATA.filter(e => (filterCat === "All" || e.category === filterCat) && e.impactScore >= minScore);

  const statusColor = s => ({ Breaking:"#e91ea7", Confirmed:"#29a8ff", Developing:"#d4af37", Conflicting:"#ff6b35" }[s] || "#7a8fa8");
  const scoreColor  = s => s >= 9 ? "#e91ea7" : s >= 7 ? "#ff6b35" : s >= 4 ? "#d4af37" : "#7a8fa8";
  const biasIcon    = b => b > 0 ? "↑" : b < 0 ? "↓" : "→";
  const biasColor   = b => b > 0 ? C.accent : b < 0 ? C.pink : C.textDim;
  const fmtTime     = ts => { const d = new Date(ts); return d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}) + " · " + d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"}); };

  const ScoreRing = ({ score, size=44 }) => {
    const r = (size/2) - 4;
    const circ = 2 * Math.PI * r;
    const fill = (score / 10) * circ;
    const col = scoreColor(score);
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink:0 }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="3"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth="3"
          strokeDasharray={`${fill} ${circ - fill}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}/>
        <text x={size/2} y={size/2+1} textAnchor="middle" dominantBaseline="middle"
          fill={col} fontSize={size < 40 ? "10" : "12"} fontWeight="700" fontFamily="Inter,sans-serif">{score}</text>
      </svg>
    );
  };

  const runAiAnalysis = async (event) => {
    setAnalysing(true); setAiAnalysis("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content:`You are a senior macro analyst at a hedge fund. Analyse this market event and provide an institutional-grade trading implication note. Be direct, precise, and actionable. 3 short paragraphs: (1) Core macro implication, (2) Specific asset trading bias with instrument names, (3) Key risks and invalidation. Under 180 words. Think like a macro PM.\n\nEvent: ${event.headline}\nCategory: ${event.category}\nWhat happened: ${event.summary}\nImmediate impact: ${event.immediateImpact}` }]
        })
      });
      const data = await res.json();
      setAiAnalysis(data.content?.[0]?.text || "Analysis unavailable.");
    } catch { setAiAnalysis("Unable to generate analysis. Please try again."); }
    finally { setAnalysing(false); }
  };

  if (!isElite) {
    return (
      <div className="fi">
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <IC n="feed" s={22} c={C.accent}/>
            <h1 className="df df-h1" style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:26, fontWeight:300, margin:0 }}>Quant Research Analyst</h1>
            <div style={{ padding:"3px 9px", background:"rgba(233,30,167,.12)", border:"1px solid rgba(233,30,167,.3)", borderRadius:4, fontSize:10, fontWeight:600, color:C.pink, letterSpacing:".1em" }}>ELITE</div>
          </div>
          <p style={{ color:C.textMuted, fontSize:13 }}>Institutional-grade macro intelligence. Live. Autonomous. Precise.</p>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{ filter:"blur(5px)", pointerEvents:"none", opacity:.4 }}>
            {SAMPLE_EVENTS.slice(0,2).map(e => (
              <div key={e.id} className="mc" style={{ marginBottom:10, padding:"16px 18px" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <span style={{ fontSize:22 }}><CatIcon cat={e.category} s={18} c={C.textMuted}/></span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:3 }}>{e.headline}</div>
                    <div style={{ fontSize:11, color:C.textDim }}>{e.sources[0]} · {fmtTime(e.timestamp)}</div>
                  </div>
                  <ScoreRing score={e.impactScore} size={40}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(to bottom, transparent 0%, rgba(6,8,16,.96) 60%)" }}>
            <div style={{ textAlign:"center", padding:"28px 36px", background:"rgba(13,16,24,.97)", border:"1px solid rgba(233,30,167,.25)", borderRadius:12, maxWidth:400 }}>
              <div style={{ marginBottom:16, display:"flex", justifyContent:"center" }}><IC n="lock" s={36} c={C.pink}/></div>
              <div style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:15, color:C.text, marginBottom:8, letterSpacing:".05em" }}>ELITE ACCESS REQUIRED</div>
              <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.8, marginBottom:20 }}>Used by professionals. Built for precision.<br/>Your institutional edge starts here.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20, textAlign:"left" }}>
                {["Live intelligence feed","Asset impact heatmap","AI event analysis","Narrative tracker","Daily & weekly reports","Smart alert system"].map(f => (
                  <div key={f} style={{ fontSize:12, color:C.textDim, padding:"6px 10px", background:"rgba(41,168,255,.04)", borderRadius:5, border:"1px solid rgba(41,168,255,.1)" }}>{f}</div>
                ))}
              </div>
              <button className="btn bp" style={{ padding:"11px 28px", fontSize:13, width:"100%" }} onClick={() => setPage("pricing")}>Upgrade to Elite — $95/mo</button>
            </div>
          </div>
        </div>
        <div style={{ marginTop:16, padding:"10px 14px", background:"rgba(13,16,24,.6)", border:"1px solid rgba(255,255,255,.05)", borderRadius:6, fontSize:11, color:C.textDim }}>
          This is market intelligence, not financial advice. All analysis is for educational purposes only.
        </div>
      </div>
    );
  }

  return (
    <div className="fi">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <IC n="feed" s={20} c={C.accent}/>
          <h1 className="df df-h1" style={{ fontFamily:"'Counter-Strike',sans-serif", fontSize:24, fontWeight:300, margin:0 }}>Quant Research Analyst</h1>
          <div style={{ padding:"3px 8px", background:"rgba(233,30,167,.12)", border:"1px solid rgba(233,30,167,.3)", borderRadius:4, fontSize:10, fontWeight:600, color:C.pink, letterSpacing:".1em" }}>ELITE</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", gap:0, background:"rgba(13,16,24,.8)", border:"1px solid rgba(255,255,255,.06)", borderRadius:6, padding:2 }}>
            {[["trader","Trader"],["investor","Investor"]].map(([icon,label],i) => (
              <div key={label} onClick={() => setTraderView(i===0)} style={{ padding:"5px 14px", borderRadius:4, cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", gap:5, background:traderView===(i===0)?"rgba(41,168,255,.15)":"transparent", color:traderView===(i===0)?C.accent:C.textMuted, border:traderView===(i===0)?"1px solid rgba(41,168,255,.3)":"1px solid transparent", transition:"all .2s" }}>
                <IC n={icon} s={14} c={traderView===(i===0)?C.accent:C.textMuted}/><span style={{ marginLeft:5 }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#29ff88", boxShadow:"0 0 6px #29ff88" }}/>
            <span style={{ fontSize:11, color:C.textDim }}>Live · {lastUpdate.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</span>
          </div>
        </div>
      </div>

      {/* ── Snapshot strip ─────────────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:8, marginBottom:18 }}>
        {[
          { icon:"feed", label:"Active Events",  value:SAMPLE_EVENTS.length,                                    color:C.accent },
          { icon:"breaking", label:"Critical (9-10)", value:SAMPLE_EVENTS.filter(e=>e.impactScore>=9).length,        color:"#e91ea7" },
          { icon:"alert", label:"High (7-8)",      value:SAMPLE_EVENTS.filter(e=>e.impactScore>=7&&e.impactScore<9).length, color:"#ff6b35" },
          { icon:"narrative", label:"Narratives",      value:NARRATIVES.length,                                       color:C.accent },
        ].map(s => (
          <div key={s.label} style={{ textAlign:"center", padding:"12px 8px", background:"rgba(13,16,24,.7)", border:`1px solid rgba(255,255,255,.06)`, borderRadius:8 }}>
            <div style={{ marginBottom:6, display:"flex", justifyContent:"center" }}><IC n={s.icon} s={18} c={s.color}/></div>
            <div className="mn" style={{ fontSize:22, color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:10, color:C.textDim, marginTop:3, letterSpacing:".04em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Tab nav ────────────────────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:2, marginBottom:18, borderBottom:"1px solid rgba(255,255,255,.06)", overflowX:"auto", scrollbarWidth:"none" }}>
        {[["feed","Feed"],["heatmap","Heatmap"],["narratives","Narratives"],["reports","Reports"],["alerts","Alerts"]].map(([id,label]) => (
          <div key={id} onClick={() => setActiveTab(id)} style={{ padding:"9px 16px", cursor:"pointer", fontSize:12, fontWeight:500, color:activeTab===id?C.accent:C.textMuted, borderBottom:`2px solid ${activeTab===id?C.accent:"transparent"}`, transition:"all .2s", marginBottom:-1, whiteSpace:"nowrap" }}>{label}</div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FEED TAB
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "feed" && (
        <div>
          {/* Filters */}
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {cats.map(c => (
                <button key={c} onClick={()=>setFilterCat(c)} style={{ padding:"5px 12px", borderRadius:5, fontSize:11, cursor:"pointer", background:filterCat===c?"rgba(41,168,255,.15)":"rgba(255,255,255,.03)", border:`1px solid ${filterCat===c?"rgba(41,168,255,.4)":"rgba(255,255,255,.06)"}`, color:filterCat===c?C.accent:C.textDim, transition:"all .15s" }}>
                  {c === "All" ? "All" : c.replace(" / "," / ")}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto" }}>
              <span style={{ fontSize:11, color:C.textDim }}>Impact ≥</span>
              <input type="range" min={0} max={9} step={1} value={minScore} onChange={e=>setMinScore(+e.target.value)} style={{ width:70 }}/>
              <span style={{ fontSize:12, color:scoreColor(minScore), minWidth:12 }}>{minScore}+</span>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:activeEvent?"minmax(0,1fr) minmax(0,1fr)":"1fr", gap:14, alignItems:"start" }}>

            {/* Event cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {filtered.map(e => {
                const regime = REGIME_META[e.regime] || REGIME_META["Risk-Off"];
                const isActive = activeEvent?.id === e.id;
                return (
                  <div key={e.id} onClick={() => setActiveEvent(isActive ? null : e)}
                    style={{ background:"rgba(13,16,24,.85)", border:`1px solid ${isActive?C.accent:statusColor(e.status)+"50"}`, borderRadius:10, padding:"16px 18px", cursor:"pointer", transition:"all .15s", boxShadow:isActive?"0 0 0 1px rgba(41,168,255,.2)":"none" }}
                    onMouseEnter={el=>{ if(!isActive) el.currentTarget.style.borderColor=C.accent+"80"; }}
                    onMouseLeave={el=>{ if(!isActive) el.currentTarget.style.borderColor=statusColor(e.status)+"50"; }}>

                    {/* Top row */}
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                      {/* Category icon */}
                      <div style={{ width:40, height:40, borderRadius:8, background:"rgba(255,255,255,.05)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:18 }}>
                        <CatIcon cat={e.category} s={18} c={C.textMuted}/>
                      </div>
                      {/* Text */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", gap:6, marginBottom:5, flexWrap:"wrap", alignItems:"center" }}>
                          <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:`${statusColor(e.status)}15`, color:statusColor(e.status), border:`1px solid ${statusColor(e.status)}40`, fontWeight:600, letterSpacing:".04em" }}>{e.status.toUpperCase()}</span>
                          <span style={{ fontSize:10, color:C.textDim }}>{e.category}</span>
                          <span style={{ fontSize:10, color:C.textDim }}>· {e.region}</span>
                        </div>
                        <div style={{ fontSize:13, fontWeight:500, color:C.text, lineHeight:1.4, marginBottom:4 }}>{e.headline}</div>
                        <div style={{ fontSize:12, color:C.textDim, lineHeight:1.5 }}>{e.summary}</div>
                      </div>
                      {/* Score ring */}
                      <ScoreRing score={e.impactScore} size={44}/>
                    </div>

                    {/* Asset pills */}
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:8 }}>
                      {Object.entries(e.assets).map(([sym, bias]) => (
                        <div key={sym} style={{ display:"flex", alignItems:"center", gap:3, padding:"3px 8px", borderRadius:4, background:`${biasColor(bias)}0e`, border:`1px solid ${biasColor(bias)}25` }}>
                          <span style={{ fontSize:11, fontWeight:700, color:biasColor(bias) }}>{biasIcon(bias)}</span>
                          <span style={{ fontSize:10, color:C.textDim }}>{sym}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom row */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, borderTop:"1px solid rgba(255,255,255,.04)" }}>
                      <div style={{ display:"flex", gap:6 }}>
                        {e.narratives.slice(0,2).map(n => <span key={n} style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:"rgba(41,168,255,.07)", color:C.accent, border:"1px solid rgba(41,168,255,.18)" }}>{n}</span>)}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <div style={{ padding:"2px 8px", borderRadius:3, background:regime.bg, fontSize:10, color:regime.color }}>{regime.icon} {regime.label}</div>
                        <span style={{ fontSize:10, color:C.textDim }}>{fmtTime(e.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Detail panel ─────────────────────────────────────────────── */}
            {activeEvent && (() => {
              const regime = REGIME_META[activeEvent.regime] || REGIME_META["Risk-Off"];
              return (
                <div style={{ position:"sticky", top:0, maxHeight:"92vh", overflowY:"auto" }}>
                  <div style={{ background:"rgba(13,16,24,.95)", border:`1px solid ${statusColor(activeEvent.status)}50`, borderRadius:12, padding:"20px 22px" }}>
                    {/* Header */}
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"flex-start", flex:1, paddingRight:12 }}>
                        <div style={{ fontSize:28 }}><CatIcon cat={activeEvent.category} s={26} c={C.textMuted}/></div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:500, color:C.text, lineHeight:1.4, marginBottom:4 }}>{activeEvent.headline}</div>
                          <div style={{ fontSize:11, color:C.textDim }}>{activeEvent.sources.join(" · ")} · {fmtTime(activeEvent.timestamp)}</div>
                        </div>
                      </div>
                      <button onClick={() => setActiveEvent(null)} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:6, color:C.textMuted, cursor:"pointer", width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>×</button>
                    </div>

                    {/* Quant metrics row */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
                      {[
                        { label:"Impact",     value:`${activeEvent.impactScore}/10`, color:scoreColor(activeEvent.impactScore), icon:"feed" },
                        { label:"Confidence", value:activeEvent.confidence,          color:C.accent,                           icon:"confidence" },
                        { label:"Urgency",    value:activeEvent.urgency,             color:activeEvent.urgency==="High"?C.pink:C.gold, icon:"urgency" },
                      ].map(m => (
                        <div key={m.label} style={{ textAlign:"center", padding:"10px 6px", background:"rgba(255,255,255,.03)", borderRadius:8, border:"1px solid rgba(255,255,255,.05)" }}>
                          <div style={{ marginBottom:4, display:"flex", justifyContent:"center" }}><IC n={m.icon} s={14} c={m.color}/></div>
                          <div style={{ fontSize:14, fontWeight:600, color:m.color, fontFamily:"Inter,sans-serif" }}>{m.value}</div>
                          <div style={{ fontSize:10, color:C.textDim, marginTop:1, textTransform:"uppercase", letterSpacing:".05em" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Asset impact grid */}
                    <div style={{ marginBottom:14 }}>
                      <div style={{ fontSize:10, color:C.textDim, letterSpacing:".08em", textTransform:"uppercase", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                        <IC n="heatmap" s={12} c={C.textDim}/> Asset Impact
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                        {Object.entries(activeEvent.assets).map(([sym, bias]) => (
                          <div key={sym} style={{ textAlign:"center", padding:"8px 4px", background:`${biasColor(bias)}08`, borderRadius:6, border:`1px solid ${biasColor(bias)}25` }}>
                            <div style={{ fontSize:18, fontWeight:700, color:biasColor(bias), lineHeight:1 }}>{biasIcon(bias)}</div>
                            <div style={{ fontSize:9, color:C.textDim, marginTop:2 }}>{sym}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Regime badge */}
                    <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                      <div style={{ flex:1, padding:"10px 12px", background:regime.bg, border:`1px solid ${regime.color}40`, borderRadius:7, display:"flex", alignItems:"center", gap:8 }}>
                        <IC n={regime.icon} s={16} c={regime.color}/>
                        <div>
                          <div style={{ fontSize:10, color:regime.color, textTransform:"uppercase", letterSpacing:".06em", fontWeight:600 }}>Market Regime</div>
                          <div style={{ fontSize:13, color:C.text, fontWeight:500 }}>{regime.label}</div>
                        </div>
                      </div>
                      <div style={{ flex:1, padding:"10px 12px", background:"rgba(255,255,255,.03)", border:"1px solid rgba(255,255,255,.06)", borderRadius:7 }}>
                        <div style={{ fontSize:10, color:C.textDim, textTransform:"uppercase", letterSpacing:".06em", marginBottom:3 }}>Status</div>
                        <div style={{ fontSize:13, fontWeight:500, color:statusColor(activeEvent.status) }}>{activeEvent.status}</div>
                      </div>
                    </div>

                    {/* Intel breakdown — accordion style */}
                    {[
                      { icon:"what",      label:"What Happened",    text:activeEvent.whatHappened   },
                      { icon:"why",       label:"Why It Matters",   text:activeEvent.whyItMatters   },
                      { icon:"feed", label:"Immediate Impact", text:activeEvent.immediateImpact },
                      { icon:"secondary", label:"Secondary Effects",text:activeEvent.secondaryEffects},
                    ].map(s => (
                      <div key={s.label} style={{ marginBottom:10, padding:"10px 12px", background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.05)", borderRadius:7 }}>
                        <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:5 }}>
                          <IC n={s.icon} s={13} c={C.accent}/>
                          <span style={{ fontSize:10, color:C.accent, letterSpacing:".07em", textTransform:"uppercase", fontWeight:600 }}>{s.label}</span>
                        </div>
                        <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.7 }}>{s.text}</div>
                      </div>
                    ))}

                    {/* Forward guidance */}
                    <div style={{ marginBottom:14, padding:"12px 14px", background:"rgba(212,175,55,.05)", border:"1px solid rgba(212,175,55,.2)", borderRadius:8 }}>
                      <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:10 }}>
                        <IC n="forward" s={14} c="#d4af37"/>
                        <span style={{ fontSize:10, color:"#d4af37", letterSpacing:".07em", textTransform:"uppercase", fontWeight:600 }}>Forward Guidance</span>
                      </div>
                      <div style={{ marginBottom:8 }}>
                        <div style={{ fontSize:10, color:C.textDim, marginBottom:3 }}><IC n="watch" s={11} c={C.textDim}/> WATCH NEXT</div>
                        <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.7 }}>{activeEvent.watchNext}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:10, color:C.textDim, marginBottom:3 }}><IC n="invalidate" s={11} c={C.textDim}/> INVALIDATION</div>
                        <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.7 }}>{activeEvent.invalidation}</div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                          <IC n="ai" s={14} c={C.accent}/>
                          <span style={{ fontSize:12, fontWeight:500, color:C.text }}>AI Deep Analysis</span>
                        </div>
                        <button className="btn bp" style={{ fontSize:11, padding:"5px 14px" }} onClick={() => runAiAnalysis(activeEvent)} disabled={analysing}>
                          {analysing ? "Analysing…" : "Generate"}
                        </button>
                      </div>
                      {aiAnalysis && (
                        <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.8, padding:"12px 14px", background:"rgba(41,168,255,.04)", border:"1px solid rgba(41,168,255,.15)", borderRadius:8 }}>
                          {aiAnalysis}
                        </div>
                      )}
                    </div>

                    <div style={{ marginTop:14, fontSize:10, color:C.textDim, fontStyle:"italic", lineHeight:1.6 }}>
                      Market intelligence only — not financial advice. Fact is separated from interpretation throughout.
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          HEATMAP TAB
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "heatmap" && (
        <div>
          <div style={{ fontSize:11, color:C.textDim, marginBottom:14 }}>Aggregated directional bias across all active events · ↑ bullish · ↓ bearish · → neutral</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:10 }}>
            {(liveAssets || ASSET_DATA).map(a => (
              <div key={a.asset} style={{ background:"rgba(13,16,24,.85)", border:`1px solid ${biasColor(a.bias)}30`, borderRadius:10, padding:"16px 16px", transition:"all .15s" }}>
                {/* Icon + name */}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:`${biasColor(a.bias)}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}><IC n={a.icon} s={18} c={biasColor(a.bias)}/></div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{a.asset}</div>
                    <div style={{ fontSize:10, color:C.textDim }}>{a.sym}</div>
                  </div>
                </div>
                {/* Direction + change */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontSize:28, fontWeight:700, color:biasColor(a.bias), lineHeight:1 }}>{biasIcon(a.bias)}</div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:600, color:biasColor(a.bias), fontFamily:"Inter,sans-serif" }}>{a.change}</div>
                    <div style={{ fontSize:10, color:C.textDim }}>current</div>
                  </div>
                </div>
                {/* Strength bar */}
                <div style={{ height:4, background:"rgba(255,255,255,.06)", borderRadius:2, marginBottom:8, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${a.score*10}%`, background:biasColor(a.bias), borderRadius:2 }}/>
                </div>
                {/* Score + reason */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontSize:11, color:C.textDim, lineHeight:1.5, flex:1, paddingRight:8 }}>{a.reason}</div>
                  <ScoreRing score={a.score} size={32}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          NARRATIVES TAB
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "narratives" && (
        <div>
          <div style={{ fontSize:11, color:C.textDim, marginBottom:14 }}>Dominant macro narratives and their trajectory · Updated as events develop</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {NARRATIVES.sort((a,b) => b.strength - a.strength).map(n => {
              const trendCol = n.trend==="Building"?C.accent:n.trend==="Peaking"?C.gold:"#7a8fa8";
              const trendIconName = n.trend==="Building"?"trend_up":n.trend==="Peaking"?"bell":"trend_dn";
              return (
                <div key={n.id} style={{ background:"rgba(13,16,24,.85)", border:`1px solid ${n.color}25`, borderRadius:10, padding:"16px 18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <div style={{ display:"flex", gap:12, alignItems:"center", flex:1 }}>
                      <div style={{ width:40, height:40, borderRadius:8, background:`${n.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}><IC n={n.icon} s={20} c={n.color}/></div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:500, color:C.text, marginBottom:3 }}>{n.label}</div>
                        <div style={{ fontSize:12, color:C.textMuted }}>{n.desc}</div>
                      </div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0, paddingLeft:16 }}>
                      <div style={{ fontSize:11, padding:"3px 10px", borderRadius:4, background:`${trendCol}15`, color:trendCol, border:`1px solid ${trendCol}35`, marginBottom:4, display:"flex", alignItems:"center", gap:4, justifyContent:"center" }}>
                        <IC n={trendIconName} s={12} c={trendCol}/> {n.trend}
                      </div>
                      <div className="mn" style={{ fontSize:20, color:n.color }}>{n.strength}%</div>
                      <div style={{ fontSize:9, color:C.textDim }}>strength</div>
                    </div>
                  </div>
                  {/* Strength bar */}
                  <div style={{ height:6, background:"rgba(255,255,255,.05)", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${n.strength}%`, background:`linear-gradient(90deg,${n.color}70,${n.color})`, borderRadius:3, transition:"width .8s" }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          REPORTS TAB
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "reports" && (
        <div>
          {[
            { icon:"morning", title:"Morning Macro Brief", time:"07:00 GMT · Today", type:"Daily", color:C.accent,
              preview:"Fed minutes dominate the macro landscape. USD well-supported across the board. Gold under pressure from higher real rates. Key watch: CPI next week and PCE end of month.", tags:["Monetary Policy","USD","Gold"] },
            { icon:"feed", title:"Intraday Update",     time:"13:30 GMT · Today", type:"Intraday", color:"#ff6b35",
              preview:"Red Sea tensions escalating — oil risk premium building fast. Shipping cost indices spiking. Watch for inflation secondary effects on ECB timeline.", tags:["Geopolitical","Oil","Inflation"] },
            { icon:"weekly", title:"Weekly Narrative Report — W12", time:"Friday · This Week", type:"Weekly", color:"#d4af37",
              preview:"BOJ pivot risk, sticky inflation, and geopolitical premium are the dominant themes. Gold net positive on the week. USD complex — hawkish Fed vs global risk-off creating crosscurrents.", tags:["Weekly","All Assets","Macro"] },
          ].map(r => (
            <div key={r.title} style={{ background:"rgba(13,16,24,.85)", border:`1px solid rgba(255,255,255,.06)`, borderRadius:10, padding:"18px 20px", marginBottom:10 }}>
              <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:44, height:44, borderRadius:9, background:`${r.color}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, alignItems:"center", justifyContent:"center" }}><IC n={r.icon} s={22} c={r.color}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:`${r.color}15`, color:r.color, border:`1px solid ${r.color}35` }}>{r.type}</span>
                    <span style={{ fontSize:11, color:C.textDim }}>{r.time}</span>
                  </div>
                  <div style={{ fontSize:14, fontWeight:500, color:C.text, marginBottom:6 }}>{r.title}</div>
                  <div style={{ fontSize:12, color:C.textMuted, lineHeight:1.7, marginBottom:10 }}>{r.preview}</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                    {r.tags.map(t => <span key={t} style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:"rgba(255,255,255,.04)", color:C.textDim, border:"1px solid rgba(255,255,255,.06)" }}>{t}</span>)}
                  </div>
                </div>
                <button className="btn bg" style={{ fontSize:11, padding:"7px 14px", flexShrink:0 }}>Read →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ALERTS TAB
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "alerts" && (
        <div>
          <div style={{ background:"rgba(13,16,24,.85)", border:"1px solid rgba(255,255,255,.06)", borderRadius:10, padding:"20px 22px", marginBottom:16 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
              <IC n="bell" s={18} c={C.accent}/>
              <div className="sl" style={{ margin:0 }}>Alert Configuration</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
              <div>
                <label style={{ fontSize:11, color:C.textDim, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:".06em" }}>Minimum Impact Score</label>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
                  <input type="range" min={1} max={10} step={1} value={alertThresh} onChange={e=>setAlertThresh(+e.target.value)} style={{ flex:1 }}/>
                  <ScoreRing score={alertThresh} size={36}/>
                </div>
                <div style={{ fontSize:11, color:C.textDim }}>
                  {alertThresh<=3?"All events":alertThresh<=6?"Moderate+ events":alertThresh<=8?"High+ events":"Critical only"}
                </div>
              </div>
              <div>
                <label style={{ fontSize:11, color:C.textDim, display:"block", marginBottom:10, textTransform:"uppercase", letterSpacing:".06em" }}>Channels</label>
                {[["bell","Platform Notifications",true],["report","Email Alerts","coming soon"]].map(([icon,label,active]) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, padding:"8px 12px", background:"rgba(255,255,255,.03)", borderRadius:6, border:"1px solid rgba(255,255,255,.05)" }}>
                    <IC n={icon} s={14} c={active===true?C.accent:C.textDim}/>
                    <span style={{ fontSize:12, flex:1, color:active===true?C.textMuted:C.textDim }}>{label}</span>
                    {active === true
                      ? <div style={{ width:14, height:14, borderRadius:3, background:"rgba(41,168,255,.2)", border:"1px solid rgba(41,168,255,.4)", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ fontSize:9, color:C.accent }}>✓</span></div>
                      : <span style={{ fontSize:10, color:C.textDim, padding:"2px 6px", background:"rgba(255,255,255,.04)", borderRadius:3 }}>{active}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
            <IC n="feed" s={14} c={C.accent}/>
            <div className="sl" style={{ margin:0 }}>Active Alerts</div>
          </div>
          {SAMPLE_EVENTS.filter(e=>e.impactScore>=alertThresh).map(e => (
            <div key={e.id} style={{ background:"rgba(13,16,24,.85)", border:`1px solid ${scoreColor(e.impactScore)}35`, borderRadius:9, padding:"14px 16px", marginBottom:8, display:"flex", gap:12, alignItems:"center" }}>
              <ScoreRing score={e.impactScore} size={40}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:4 }}>
                  <span style={{ fontSize:14 }}><CatIcon cat={e.category} s={18} c={C.textMuted}/></span>
                  <span style={{ fontSize:11, color:C.textDim }}>{e.category} · {fmtTime(e.timestamp)}</span>
                </div>
                <div style={{ fontSize:12, color:C.text, fontWeight:500 }}>{e.headline}</div>
              </div>
              <button className="btn bg" style={{ fontSize:11, padding:"5px 12px", flexShrink:0 }} onClick={()=>{setActiveEvent(e);setActiveTab("feed");}}>View →</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop:20, padding:"10px 14px", background:"rgba(13,16,24,.6)", border:"1px solid rgba(255,255,255,.04)", borderRadius:6, fontSize:11, color:C.textDim }}>
        Market intelligence only — not financial advice. Fact is separated from interpretation. For educational purposes only.
      </div>
    </div>
  );
};

const Admin = ({ setPage }) => {
  const token = localStorage.getItem("fis_token");

  // Dashboard KPI state
  const [dash,       setDash]       = useState(null);
  const [users,      setUsers]      = useState([]);
  const [loadingKPI, setLoadingKPI] = useState(true);

  // Market update form
  const [updateTitle,   setUpdateTitle]   = useState("");
  const [updateBody,    setUpdateBody]    = useState("");
  const [updatePinned,  setUpdatePinned]  = useState(false);
  const [updateMsg,     setUpdateMsg]     = useState("");
  const [updateSaving,  setUpdateSaving]  = useState(false);

  // Override form
  const [overrideEmail, setOverrideEmail] = useState("");
  const [overrideTier,  setOverrideTier]  = useState("45");
  const [overrideMsg,   setOverrideMsg]   = useState("");
  const [overrideSaving,setOverrideSaving]= useState(false);

  useEffect(() => {
    if (!token) return;
    setLoadingKPI(true);
    Promise.all([
      api.get("/admin/dashboard", token),
      api.get("/admin/users?limit=10", token),
    ]).then(([dashRes, usersRes]) => {
      if (dashRes.success)  setDash(dashRes.data);
      if (usersRes.success) setUsers(usersRes.data.users || []);
    }).catch(()=>{}).finally(()=>setLoadingKPI(false));
  }, [token]);

  const tierDist = dash?.tier_distribution || [];
  const totalMembers = dash?.total_members || 0;

  const publishUpdate = async () => {
    if (!updateTitle.trim() || !updateBody.trim()) { setUpdateMsg("Title and content are required."); return; }
    setUpdateSaving(true); setUpdateMsg("");
    try {
      const data = await api.post("/market-updates", { title: updateTitle, body: updateBody, pinned: updatePinned }, token);
      if (data.success) { setUpdateTitle(""); setUpdateBody(""); setUpdatePinned(false); setUpdateMsg("Published successfully."); }
      else setUpdateMsg(data.error?.message || "Failed to publish.");
    } catch { setUpdateMsg("Unable to connect."); }
    finally { setUpdateSaving(false); }
  };

  const applyOverride = async () => {
    if (!overrideEmail.trim()) { setOverrideMsg("Email is required."); return; }
    setOverrideSaving(true); setOverrideMsg("");
    try {
      // First find the user by searching
      const findRes = await api.get(`/admin/users?search=${encodeURIComponent(overrideEmail)}&limit=1`, token);
      const foundUser = findRes.data?.users?.[0];
      if (!foundUser) { setOverrideMsg("User not found."); setOverrideSaving(false); return; }
      const data = await api.post(`/admin/users/${foundUser.id}/tier`, { tier: overrideTier, reason: "Manual admin override" }, token);
      if (data.success) { setOverrideEmail(""); setOverrideMsg(`Tier updated to ${overrideTier} for ${overrideEmail}.`); }
      else setOverrideMsg(data.error?.message || "Override failed.");
    } catch { setOverrideMsg("Unable to connect."); }
    finally { setOverrideSaving(false); }
  };

  const fmtTier = t => ({ free:"Free", core_45:"$45 Core", pro_65:"$65 Pro", elite_95:"$95 Elite", lifetime:"Lifetime" }[t] || t);

  return (
    <div className="fi">
      <div style={{ marginBottom:22 }}>
        <h1 className="df df-h1" style={{fontFamily:"'Counter-Strike',sans-serif", fontSize:28,fontWeight:300,marginBottom:6 }}>Administration</h1>
        <p style={{ color:C.textMuted,fontSize:14 }}>Platform management, subscription oversight, and AI cost controls.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:14 }}>
        {[
          {l:"Total Members",       v: loadingKPI ? "…" : (dash?.total_members ?? "—"),         s: dash?.members_this_month != null ? `+${dash.members_this_month} this month` : "",    c:C.accent},
          {l:"Active Subscriptions",v: loadingKPI ? "…" : (dash?.active_subscriptions ?? "—"),  s: dash?.total_members ? `${Math.round((dash.active_subscriptions/dash.total_members)*100)||0}% conversion` : "", c:C.accent},
          {l:"MRR",                 v: loadingKPI ? "…" : (dash?.mrr_usd != null ? `$${dash.mrr_usd.toLocaleString()}` : "—"), s: dash?.mrr_growth != null ? `+$${dash.mrr_growth} this month` : "", c:C.gold},
          {l:"AI Calls Today",      v: loadingKPI ? "…" : (dash?.ai_calls_today ?? "—"),         s:"Within budget",                                                                        c:C.accent},
          {l:"Churn Risk",          v: loadingKPI ? "…" : (dash?.churn_risk_count ?? "—"),       s:"Requires review",                                                                      c:C.pink},
        ].map(m=>(
          <div key={m.l} className="mc">
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
          {tierDist.length > 0 ? tierDist.map((t,i)=>{
            const col = [C.textMuted,C.accent,C.pink,C.gold,C.pink][i] || C.accent;
            return (
              <div key={t.tier} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                <span style={{ fontSize:12,color:C.textMuted,width:100,flexShrink:0 }}>{fmtTier(t.tier)}</span>
                <div style={{ flex:1,height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
                  <div style={{ width:totalMembers?`${(t.count/totalMembers)*100}%`:"0%",height:"100%",borderRadius:3,background:col,transition:"width .8s ease" }}/>
                </div>
                <span className="mn" style={{ fontSize:11,color:col,width:28,textAlign:"right" }}>{t.count}</span>
              </div>
            );
          }) : (
            [{t:"Free",c:C.textMuted},{t:"Core $45",c:C.accent},{t:"Pro $65",c:C.pink},{t:"Elite $95",c:C.gold}].map(t=>(
              <div key={t.t} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                <span style={{ fontSize:12,color:C.textMuted,width:100,flexShrink:0 }}>{t.t}</span>
                <div style={{ flex:1,height:6,borderRadius:3,background:C.border }}/>
                <span className="mn" style={{ fontSize:11,color:t.c,width:28,textAlign:"right" }}>—</span>
              </div>
            ))
          )}
        </div>

        {/* AI cost controls */}
        <div className="mc">
          <div className="sl">AI Cost Protection Layer</div>
          {[
            {l:"Free tier",       cap:"Blocked",  c:C.textDim},
            {l:"Core $45",        cap:"5/day",    c:C.accent},
            {l:"Pro $65",         cap:"10/day",   c:C.pink},
            {l:"Elite $95",       cap:"Fair-use", c:C.gold},
          ].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12,color:C.textMuted }}>{r.l}</span>
              <span className="mn" style={{ fontSize:11,color:r.c }}>{r.cap}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14 }}>
        <div>
          <div className="sl">Post Market Update</div>
          <div className="mc">
            <input className="inp" placeholder="Update title..." value={updateTitle} onChange={e=>setUpdateTitle(e.target.value)} style={{ marginBottom:10 }}/>
            <textarea className="inp" placeholder="Market update content..." value={updateBody} onChange={e=>setUpdateBody(e.target.value)} style={{ minHeight:70,resize:"vertical",fontFamily:"inherit",marginBottom:8 }}/>
            <label style={{ display:"flex",alignItems:"center",gap:8,fontSize:12,color:C.textMuted,marginBottom:10,cursor:"pointer" }}>
              <input type="checkbox" checked={updatePinned} onChange={e=>setUpdatePinned(e.target.checked)}/> Pin to top of dashboard
            </label>
            {updateMsg && <div style={{ fontSize:12, color:updateMsg.includes("success")?C.accent:C.pink, marginBottom:8 }}>{updateMsg}</div>}
            <button className="btn bp" onClick={publishUpdate} disabled={updateSaving} style={{ opacity:updateSaving?.6:1 }}>
              {updateSaving ? "Publishing…" : "Publish Update"}
            </button>
          </div>
        </div>
        <div>
          <div className="sl">Access Gate Override</div>
          <div className="mc">
            <div style={{ fontSize:12,color:C.textMuted,marginBottom:12 }}>Manual subscription override for a specific user. Server-side enforcement applies regardless.</div>
            <input className="inp" placeholder="User email..." value={overrideEmail} onChange={e=>setOverrideEmail(e.target.value)} style={{ marginBottom:10 }}/>
            <select className="inp" value={overrideTier} onChange={e=>setOverrideTier(e.target.value)} style={{ marginBottom:10 }}>
              {[{id:"free",label:"Free"},{id:"45",label:"Core $45"},{id:"65",label:"Pro $65"},{id:"95",label:"Elite $95"}].map(t=>(
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
            {overrideMsg && <div style={{ fontSize:12, color:overrideMsg.includes("updated")?C.accent:C.pink, marginBottom:8 }}>{overrideMsg}</div>}
            <button className="btn bg" style={{ width:"100%", opacity:overrideSaving?.6:1 }} onClick={applyOverride} disabled={overrideSaving}>
              {overrideSaving ? "Applying…" : "Apply Override"}
            </button>
          </div>
        </div>
      </div>

      <div className="sl">Recent Members</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <table>
          <thead><tr><th>Email</th><th>Name</th><th>Tier</th><th>Status</th><th>Joined</th></tr></thead>
          <tbody>
            {users.length > 0 ? users.map((u,i)=>(
              <tr key={u.id || i}>
                <td style={{ fontSize:11 }}>{u.email}</td>
                <td style={{ color:C.text }}>{u.first_name || ""} {u.last_name || ""}</td>
                <td><span className="tg ta" style={{ fontSize:9 }}>{fmtTier(u.membership_tier)}</span></td>
                <td><span className={`tg ${u.subscription_status==="active"?"ta":u.subscription_status==="trial"?"tg2":"td"}`} style={{ fontSize:9 }}>{u.subscription_status || "—"}</span></td>
                <td className="mn" style={{ fontSize:11 }}>{u.created_at ? new Date(u.created_at).toLocaleDateString("en-GB",{day:"2-digit",month:"short"}) : "—"}</td>
              </tr>
            )) : (
              <tr><td colSpan={5} style={{ textAlign:"center", padding:20, color:C.textDim, fontSize:12 }}>{loadingKPI ? "Loading…" : "No users found."}</td></tr>
            )}
          </tbody>
        </table>
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
  const [tier,      setTier]      = useState("free");
  const [aiUsed,    setAiUsed]    = useState(0);
  const [subStatus, setSubStatus] = useState("inactive");
  const [token,     setToken]     = useState(null);
  const [user,      setUser]      = useState(null);

  useEffect(() => {
    window.__fortitudeNav = setPage;
    let vp = document.querySelector('meta[name=viewport]');
    if(!vp){vp=document.createElement('meta');vp.name='viewport';document.head.appendChild(vp);}
    vp.content='width=device-width,initial-scale=1,viewport-fit=cover';
    return () => { delete window.__fortitudeNav; };
  }, []);

  // Restore session on load
  useEffect(() => {
    const t = localStorage.getItem("fis_token");
    const u = localStorage.getItem("fis_user");
    if (t && u) {
      try {
        const user = JSON.parse(u);
        setToken(t); setUser(user); setAuthed(true);
        setTier(mapTier(user.membership_tier));
        setSubStatus(["active","trial"].includes(user.subscription_status) ? "active" : "inactive");
        api.get("/membership/access", t).then(d => {
          if (d.success) {
            setTier(mapTier(d.data.tier));
            setSubStatus(["active","trial"].includes(d.data.subscriptionStatus) ? "active" : "inactive");
            setAiUsed(d.data.ai?.used || 0);
          }
        }).catch(()=>{});
      } catch { localStorage.removeItem("fis_token"); localStorage.removeItem("fis_user"); }
    }
  }, []);

  const handleLogin = ({ token: t, user }) => {
    setToken(t); setUser(user); setAuthed(true);
    setTier(mapTier(user.membership_tier));
    setSubStatus(["active","trial"].includes(user.subscription_status) ? "active" : "inactive");
    api.get("/membership/access", t).then(d => {
      if (d.success) {
        setTier(mapTier(d.data.tier));
        setSubStatus(["active","trial"].includes(d.data.subscriptionStatus) ? "active" : "inactive");
        setAiUsed(d.data.ai?.used || 0);
      }
    }).catch(()=>{});
  };

  const handleLogout = () => {
    if (token) api.post("/auth/logout", {}, token).catch(()=>{});
    localStorage.removeItem("fis_token"); localStorage.removeItem("fis_user");
    setAuthed(false); setToken(null); setTier("free");
    setSubStatus("inactive"); setPage("dashboard"); setUser(null);
  };
  // Expose logout to child components
  useEffect(() => { window.__fortitudeLogout = handleLogout; return () => { delete window.__fortitudeLogout; }; }, [token]);

  // ── cTrader OAuth popup callback ─────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code   = params.get("code");
    if (code && window.opener) {
      try { window.opener.postMessage({ type: "CTRADER_OAUTH_CODE", code }, window.location.origin); } catch {}
      window.close();
    }
  }, []);

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
    { id:"broker_accounts", label:"Connected Accounts",    icon:"broker" },
    { id:"affiliate",   label:"Affiliate",              icon:"ref"   },
    { id:"account",     label:"Account",                icon:"acct" },
    { id:"quant",       label:"Quant Research",         icon:"quant" },
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
    broker_accounts: BrokerAccounts,
    affiliate:   AffiliateLanding,
    quant:       QuantResearchAnalyst,
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
      const savedUser = (() => { try { return JSON.parse(localStorage.getItem("fis_user") || "{}"); } catch { return {}; } })();
      const isAdmin = savedUser.role === "admin" || savedUser.role === "super_admin" || savedUser.email === "jared@fortitude.trade" || savedUser.email === "deacon@fortitude.trade";
      if (isAdmin) {
        return <Admin setPage={setPage}/>;
      }
      return <GateWall feature="admin" currentTier={tier} setPage={setPage}/>;
    }
    // Always-accessible pages
    if (ALWAYS_OPEN.has(page)) {
      const P = PAGES[page];
      if (!P) return null;
      return <P currentTier={tier} setTier={setTier} setPage={setPage} aiUsed={aiUsed} subStatus={subStatus} setSubStatus={setSubStatus} user={user} onUpgrade={t=>{setTier(t);setSubStatus("active");}}/>;
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
    return <P setPage={setPage} currentTier={tier} aiUsed={aiUsed} user={user}/>;
  };

  if (!authed) return <><style>{STYLES}</style><Login onLogin={handleLogin}/></>;

  const currentTierMeta = TIERS[tier] || TIERS["free"] || Object.values(TIERS)[0];

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
          .community-chat-wrap{height:calc(100dvh - 130px)!important;max-height:none!important}

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

      <div style={{ display:"flex",height:"100vh",overflow:"hidden",position:"relative" }}>
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
                    <div style={{ fontSize:8,color:C.text,letterSpacing:".14em",textTransform:"uppercase",marginTop:1 }}>Performance Operating System</div>
                  </div>
                </div>
                <div onClick={()=>setMobNavOpen(false)} style={{ color:C.textDim,fontSize:18,cursor:"pointer",padding:4,lineHeight:1 }}>✕</div>
              </div>
              <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:1 }}>
                {NAV.map(n => {
                  const savedU = (() => { try { return JSON.parse(localStorage.getItem("fis_user") || "{}"); } catch { return {}; } })();
                  const isOwner = savedU.role === "admin" || savedU.role === "super_admin" || savedU.email === "jared@fortitude.trade" || savedU.email === "deacon@fortitude.trade";
                  const granted = n.id === "admin" ? isOwner : (ACCESS[n.id]===undefined || canAccess(tier,n.id));
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
                    <div style={{ fontSize:12,color:C.text,fontWeight:500 }}>{user?.first_name || ""} {user?.last_name || ""}</div>
                    <div style={{ fontSize:10,color:C.textDim }}>{user?.email || ""}</div>
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
            <div style={{ fontSize:9,color:C.text,letterSpacing:".16em",textTransform:"uppercase",marginTop:2,fontFamily:"'Inter',sans-serif",fontWeight:500 }}>Performance Operating System</div>
          </div>
          <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:1 }}>
            {NAV.map(n => {
              const savedU = (() => { try { return JSON.parse(localStorage.getItem("fis_user") || "{}"); } catch { return {}; } })();
                  const isOwner = savedU.role === "admin" || savedU.role === "super_admin" || savedU.email === "jared@fortitude.trade" || savedU.email === "deacon@fortitude.trade";
                  const granted = n.id === "admin" ? isOwner : (ACCESS[n.id]===undefined || canAccess(tier,n.id));
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
                <div style={{ fontSize:12,color:C.text,fontWeight:500 }}>{user?.first_name || ""} {user?.last_name || ""}</div>
                <div style={{ fontSize:10,color:C.textDim }}>{user?.email || ""}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="main-content" style={{ flex:1,padding:"28px 32px",overflowY:"auto",overflowX:"hidden",position:"relative",zIndex:1,WebkitOverflowScrolling:"touch",overscrollBehavior:"contain",minHeight:0 }}>
          <div className="mob-spacer"/>
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
            const savedU = (() => { try { return JSON.parse(localStorage.getItem("fis_user") || "{}"); } catch { return {}; } })();
                  const isOwner = savedU.role === "admin" || savedU.role === "super_admin" || savedU.email === "jared@fortitude.trade" || savedU.email === "deacon@fortitude.trade";
                  const granted = n.id === "admin" ? isOwner : (ACCESS[n.id]===undefined || canAccess(tier,n.id));
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
