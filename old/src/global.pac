function FindProxyForURL(url, host) {
    if (host == '127.0.0.1' || host == 'localhost')
        return 'DIRECT'
    return 'SOCKS 127.0.0.1:1080';
}
