const os = require('os');

function getInterfacesList() {
    const ifaces = os.networkInterfaces();
    const list = [];
    Object.keys(ifaces).forEach(function (ifname) {
        let alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                list.push({iface, ifname});
                // this single interface has multiple ipv4 addresses
                // console.log(ifname + ':' + alias, iface.address);
            } else {
                list.push({iface, ifname});
                // this interface has only one ipv4 adress
                // console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
    return list;
}

function getFilteredInterfacesList() {
    return getInterfacesList().filter(({ifname}) => ifname.indexOf('VirtualBox') === -1);
}

function getFilteredIpList() {
    return getFilteredInterfacesList().map(({iface: {address}}) => address);
}

// console.log(getFilteredIpList());

module.exports = {
    getFilteredInterfacesList,
    getFilteredIpList,
    getInterfacesList,
}
