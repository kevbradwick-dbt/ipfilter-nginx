let ALLOW_LIST = [];
let DENY_LIST = [];

if (process.env.IP_DENY_LIST) {
  DENY_LIST = process.env.IP_DENY_LIST.split(",").map(ip => ip.trim());
} 

if (process.env.IP_ALLOW_LIST) {
  ALLOW_LIST = process.env.IP_ALLOW_LIST.split(",").map(ip => ip.trim());
}

function response(r) {
  if (!ALLOW_LIST.includes(r.remoteAddress)) {
    return r.return(403, "Access Denied");
  }
}

export default {response};