import { isNull } from 'lodash/lang';

export const parseProxy = (string) => {

  const parserObj = string.split(':');

  if(string.includes("@")){
    return  {
      proxy_username: parserObj[1].slice(2),
      proxy_password: parserObj[2].split('@')[0],
      proxy_ip: parserObj[2].split('@')[1],
      proxy_port: Number(parserObj[3])
    };

  }
    return {
      proxy_ip: parserObj[1].slice(2),
      proxy_port: Number(parserObj[2])
    };


  // console.log(array)
  // if (array.length === 3 && array[1].slice(0,2) === "//" && array[2]?.search("@") === -1) {
  //   return {
  //     proxy_type: array[0] || 'HTTP',
  //     proxy_username: '',
  //     proxy_password: '',
  //     proxy_ip: array[1]?.slice(2) || '',
  //     proxy_port: array[2] || '',
  //   };
  // }


  // if (array.length === 4 && array[1].slice(0, 2) === '//' && array[2]?.search('@') !== -1) {
  //
  //   return {
  //     proxy_type: array[0].toUpperCase() || 'HTTP',
  //     proxy_username: array[1]?.slice(2) || '',
  //     proxy_password: array[2]?.split('@')[0] || '',
  //     proxy_ip: array[2]?.split('@')[1] || '',
  //     proxy_port: parseInt(array[3], 10) || 0,
  //   };
  // }

  // return null;
};


export const parseProxyName = (type, username, password, port, ip) => {
  if (isNull(username) && isNull(password)) {
    return `${type?.toLowerCase()}://${ip}:${port}`;
  }
  if (isNull(username)) {
    return `${type?.toLowerCase()}://${username}:@${ip}:${port}`;
  }

  return `${type?.toLowerCase()}://${username}:${password}@${ip}:${port}`;
};


export const changeProxyType = (proxyValue, proxyType) => {

  // console.log(proxyValue.startsWith('http'));

  if (proxyValue.includes(':')) {
    const after = proxyValue?.slice(proxyValue.indexOf(':'));
    return proxyType?.toLowerCase() + after;
  }

  return proxyType?.toLowerCase();
};

