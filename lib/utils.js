

export const productOptions = [
    'Onion Type A',
    'Banana',
    'Tomato',
    'Eggs',
    'Potato',
]

export const products = {
    'Onion Type A': { "unit": "kg", "unitPrice": 80},
    'Banana':  { "unit": "Dozen", "unitPrice": 150},
    'Tomato':  { "unit": "kg", "unitPrice": 150},
    'Eggs':  { "unit": "Dozen", "unitPrice": 204},
    'Potato':  { "unit": "kg", "unitPrice": 70},
}



//important to return only result, not Promise
export const fetcher = (url) => fetch(url).then((res) => res.json());