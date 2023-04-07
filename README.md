
# PDF Merger
PDF Merger is a Node.js command-line application that allows you to merge multiple images files into a single PDF file. It uses the pdf-lib library to manipulate PDF files.

## Installation
To install PDF Merger, you need to have Node.js and npm (or yarn) installed on your machine. Then, you can run the following command to install the application after you clone the repository:


```
npm install -g .
```
or
```
yarn global add .
```
You may need to use sudo to run the above command.

## How to use
To use PDF Merger, you can run the following command:
```
pmerge -i [INPUT_FOLDER] -o [OUTPUT_FILE]
```

The INPUT_FOLDER parameter is the folder containing the files to be merge. The OUTPUT_FILE parameter is the name of the output PDF file that will contain the images.


Here's an example command that merges the pngs into a single file (merged.pdf):

pmerge -i ./samples/png -o ./output/merge_png.pdf

The following options are available:
-m, --mode: Mode controls how to place an image in the page. Current support two mode: 
  - aspectFit: The whole image will be fitted in the page so you can see all the content of the origin image.
  - aspectFill: The whole image will be filled in the page. However, some of the images may not be seen.

-h, --help: Display help information.

## Contributing
Contributions are welcome! 

You can do the following to support this project:
- Use it and give me the feature requests
- Report Bugs 
- Modify or give suggestions on the code.

If you have pull requests, please submit them to the GitHub repository.

## Samples Images 
The samples used in this project are from the following sources
./samples/png - kenney.com
./samples/jpeg - unsplash.com 

## License
PDF Merger is licensed under the MIT License.