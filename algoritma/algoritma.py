def reverse_alphabet(s):
    """
    Reverse the alphabet characters in the string and keep numbers at the end.
    """
    letters = ''.join([c for c in s if c.isalpha()])
    numbers = ''.join([c for c in s if c.isdigit()])
    reversed_letters = letters[::-1]
    return reversed_letters + numbers

def longest(sentence):
    """
    Find the longest word in the given sentence.
    """
    words = sentence.split()
    longest_word = max(words, key=len)
    return longest_word

def count_occurrences(input_list, query_list):
    """
    Count the occurrences of each word in QUERY within INPUT.
    """
    from collections import Counter
    input_counter = Counter(input_list)
    result = [input_counter[word] for word in query_list]
    return result

def diagonal_difference(matrix):
    """
    Calculate the difference between the sums of the primary and secondary diagonals of a square matrix.
    """
    n = len(matrix)
    primary_diagonal = sum(matrix[i][i] for i in range(n))
    secondary_diagonal = sum(matrix[i][n - 1 - i] for i in range(n))
    return primary_diagonal - secondary_diagonal


if __name__ == "__main__":
    result1 = reverse_alphabet("NEGIE1")
    print(f"Reverse Alphabet Result: {result1}")  

    sentence = "Saya sangat senang mengerjakan soal algoritma"
    result2 = longest(sentence)
    print(f"Longest Word Result: {result2}") 

    INPUT = ['xc', 'dz', 'bbb', 'dz']
    QUERY = ['bbb', 'ac', 'dz']
    result3 = count_occurrences(INPUT, QUERY)
    print(f"Count Occurrences Result: {result3}")  

    matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
    result4 = diagonal_difference(matrix)
    print(f"Diagonal Difference Result: {result4}")  
