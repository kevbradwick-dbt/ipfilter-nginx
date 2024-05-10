let ALLOW_LIST = [];

// All access will be denied by default unless the ip address falls within the allow list.
// The allow list can be specified in CIDR ranges e.g. 192.168.1.1/24 or single IP addresses.
if (process.env.IP_ALLOW_LIST) {
  ALLOW_LIST = process.env.IP_ALLOW_LIST.split(",").map(ip => ip.trim());
}

function ip4ToInt(ip) {
  return ip.split('.').reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
}

function isIp4InCidr(ip) {
  return cidr => {
    const parts = cidr.split("/");
    const range = parts[0];
    let bits = 32;
    if (parts.length === 2) {
      bits = parts[1]
    }
    const mask = ~(2 ** (32 - bits) - 1);
    return (ip4ToInt(ip) & mask) === (ip4ToInt(range) & mask);
  }
}

// Check to see if a single IP4 is within a list of CIDR's
function isIp4InCidrs(ip, cidrs) {
  return cidrs.some(isIp4InCidr(ip));
}

function response(r) {
  if (!isIp4InCidrs(r.remoteAddress, ALLOW_LIST)) {
    return r.return(403, "Access Denied");
  }
}

export default {response};