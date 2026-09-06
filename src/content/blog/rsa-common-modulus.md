---
title: 'Common modulus attack — recovering a flag from two ciphertexts'
date: 2026-03-04
author: 'Example Member'
tags: ['crypto', 'rsa', 'number-theory']
category: ctf
ctf: 'Internal Practice Set'
difficulty: medium
lang: en
---

## Summary

We are given one RSA modulus, two public exponents, and the same plaintext
encrypted under both. No factoring required: when a message is sent twice under
the same `n` with coprime exponents, the plaintext falls out of the extended
Euclidean algorithm. This is the classic *common modulus* attack, and the point
of the writeup is the derivation, not the script.

## The challenge

```
n  = 0x9a3f...  (2048-bit)
e1 = 65537
e2 = 3
c1 = pow(m, e1, n)
c2 = pow(m, e2, n)
```

Same `n`, same `m`, two exponents. That repetition is the vulnerability.

## Why it works

Because `gcd(e1, e2) = 1`, the extended Euclidean algorithm gives integers
`a`, `b` with:

```
a * e1 + b * e2 = 1
```

Substituting the ciphertexts:

```
c1^a * c2^b  =  (m^e1)^a * (m^e2)^b
             =  m^(a*e1 + b*e2)
             =  m^1
             =  m   (mod n)
```

One of `a`, `b` is always negative — `e1` and `e2` cannot both divide into 1
positively. A negative exponent means the modular inverse, which exists here
precisely because `gcd(c, n) = 1`.

## Implementation

```python
from Crypto.Util.number import long_to_bytes

def egcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x, y = egcd(b, a % b)
    return g, y, x - (a // b) * y

def common_modulus(c1, c2, e1, e2, n):
    g, a, b = egcd(e1, e2)
    assert g == 1, "exponents must be coprime"

    # Negative exponent -> invert the base instead.
    if a < 0:
        c1, a = pow(c1, -1, n), -a
    if b < 0:
        c2, b = pow(c2, -1, n), -b

    return (pow(c1, a, n) * pow(c2, b, n)) % n

m = common_modulus(c1, c2, e1, e2, n)
print(long_to_bytes(m).decode())
```

## Lessons learned

- The tell is structural, not numeric: *the same modulus appearing twice* is
  the whole finding. Look at how the parameters relate before reaching for a
  factoring database.
- `pow(x, -1, n)` is built into Python 3.8+. No need for a hand-rolled inverse.
- Textbook RSA has no randomised padding, which is what lets two ciphertexts of
  the same message be combined at all. OAEP breaks this attack.
