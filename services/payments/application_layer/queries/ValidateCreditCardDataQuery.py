

VALID_CREDIT_CARD_NUMBERS = [
    "4111111111111111",
    "5500000000000004",
    "340000000000009",
    "4242424242424242",
    "1010101010101010",
    "1111111111111111",
    "2222222222222222",
    "3333333333333333"
]

class ValidateCreditCardDataQuery:
    def __init__(self, card_number: str, expiry: str, cvv: str):
        self.card_number = card_number
        self.expiry = expiry
        self.cvv = cvv

    def execute(self) -> bool:
        # Placeholder for actual validation logic
        valid = False
        if len(self.card_number) == 16 and len(self.cvv) == 3:
            if self.card_number in VALID_CREDIT_CARD_NUMBERS:
                valid = True
        return valid
