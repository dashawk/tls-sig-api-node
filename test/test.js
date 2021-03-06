var TLSAPI = require('../TLSAPI')
var assert = require('assert')
var private_key = `-----BEGIN EC PARAMETERS-----
BgUrgQQACg==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIJE3x8T2vGLrBvr2vNQkc7TUAThK/dEwRI5UAWeXdWNAoAoGCCqGSM49
AwEHoUQDQgAEvYrD/8S4m+xGdb0uTlMvoDrGAcHnrDzA71ok8oDwFLBmb9Txy6Gt
HIqrBJZDtXzBsDa8ziicdTqNfeEYvksqVQ==
-----END EC PRIVATE KEY-----
`
var public_key = `-----BEGIN PUBLIC KEY-----
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEvYrD/8S4m+xGdb0uTlMvoDrGAcHn
rDzA71ok8oDwFLBmb9Txy6GtHIqrBJZDtXzBsDa8ziicdTqNfeEYvksqVQ==
-----END PUBLIC KEY-----
`
var config = {
    "sdk_appid": 1400000000,
    "expire_after": 99999999,
    "private_key_string": private_key,
    "public_key_string": public_key
}

it('gen and verify', function(done){
    var api = new TLSAPI.Sig(config);
    var usersig = api.genSig('abc')
    assert.equal(true, api.verifySig(usersig, 'abc'))
    assert.equal(false, api.verifySig(usersig, 'abcb'))
    done()
})

it('userbuf gen and verify', function(done){
    var api = new TLSAPI.Sig(config);
    var usersig = api.genSigWithUserbuf('abc', '1234')
    assert.equal('1234', api.verifySigWithUserbuf(usersig, 'abc'))
    assert.equal(false, api.verifySigWithUserbuf(usersig, 'abcb'))
    done()
})

it('exist verify', function(done){
    var api = new TLSAPI.Sig(config);
    var sig = 'eAFNjlFvgjAUhf9LX1lGbxFZl-iwWGcUt8jQsflCOlpdJwKBguiy-24lmOw8ft89J-cXrRbhPU*SvM50rE*FRI8Io7sOKyEzrbZKlgbyr6THvCiUiLmOnVL8u67EPu6UYTDAJoBd0ndkW6hSxnyruzF6S68bWVYqz0yTYHjADnGu-V5qdbh*BS4BSgHobbNSO4NfJuvxLGCrd8Ws*ZPX*lEz9vYhnZwHDXx6wfLNXnrpccqzj5bZ6Tk8znbR9w-Poa3hdQgsPwQMnjV2N-bGF9O5X5M0stbEWqhhHYzQ3wVIlVX1'
    var sigwithuser = 'eAE1jl1vgjAYhf9Lb1lcKxDHEi*YNh2ESZiK86ppS9GKH3y028zifx*Yei6f55y87x9YJctRV1SU1bUqwCtAHuyDoD8GT3epCnnWqlSy7S3jwmKtTnKo*2MUBGjieZbL31q1krJS3weBjbVMiIs5a6qv9bCGDzwcp0xTtx1*eGDTyZabsifbTXyw3U7tevCB17OIVE0a7k38HhHnJU4LPk*Mm2FhMp6S*dfMeb5KlnkIbT9DhUNN4twngawgdJsjz8X3m1iECV7nBwMvG3yKFs6**dktiZiC2z-8z1UA'
    // assert.equal(true, api.verifySig(sig, 'abc'))
    assert.equal('abc', api.verifySigWithUserbuf(sigwithuser, 'abc'))
    done()
})

it('without3rd', function(done){
    var api = new TLSAPI.Sig({
        "sdk_appid": 1400000000,
        "public_key_string": `-----BEGIN PUBLIC KEY-----
MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAED5Ffi4qIe4XUZ5zDGR9pC0Z6UL/gCHf0
vgoLVestQxqOGJB5mcbaKULeriaevZoq0Sx8gGtfDlSf4fXwzPtGvg==
-----END PUBLIC KEY-----
        `
    });
    var sig = 'eJxNz11vgjAYBeB7fkXTW41rKwL1bkMMGnGyidu8IaxUfdehFWpkMfvv8ysL5-Y5yck5WQghPJ*8djIhdoetSc2Plhj1EabUwe1-lrWGUqbZysjyyqzHGSGkUYFcbg2s4F6gZ6UNrnKVZlpDflObXMJYc6SC9RWj4MMfxf57lz0xb8ztcd2aKgrTJYdSh8lsU8dmcnQTFaqdGC48dRxtHp8DL5qLw-fnW*Q8BCJosXj-FfpLx7eLRf2iOUnWVTEgXuI2Jg0U97s9do7LXY6tX*sPGj5LXg__'
    assert.equal(true, api.verifySig(sig, '10001'))
    done()
})
