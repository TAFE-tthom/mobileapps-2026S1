
# Huffman Coding


Huffman Coding is an early method for compressing data and sequencing data based on frequency. In Huffman code, each character can have a different number of bits similar to Morse code, but unlike ASCII, where each character are of a fixed size.

The code is constructed by creating a binary tree of each character as follows:

1. Count the frequency of each letter in the message

2. For each letter, construct a leaf node containing the letter and the frequency

3. While there are more than one node remaining, combine the two nodes with the smallest frequency into a new node with the combined frequency
  * If there are more than one nodes with the same frequency, choose the node which contains the letter with the smallest ASCII value, i.e, use the ASCII value of the smallest letter within the node

Refer to the following section on [Basic Technique - Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding#Basic_technique).

Your solution must implement the functions:

`type HuffmanCodingMap = { toCode: Map<string, string>, toChar: Map<string, string> }`.

* `generate(text: string): HuffmanCodingMap`, Used to generate a `toCode` and `toChar` map from the string given. Given a character in the text, you are able to translate it to its binary string representation.

* `encode(text: string, toCode: Map<string, string>)`, Uses the `toCode` map to generate a binary string encoding of the text given.

* `decode(bin: string, toChar: Map<string, string>)`, Given a binary string, it will use the `toChar` map to decode the binary string to its regular string interpretation.

What you may want to look up while attempting the challenge:

* Binarytree
* HashMap
* PriorityQueue
* Depth First Tree Traversal

Source: [Wikipedia](https://en.wikipedia.org/wiki/Huffman_coding)


## How to Test

You will be able to run your solution against the test cases given using `npm run test`, make sure you install the necessary dependencies with `npm install`.
