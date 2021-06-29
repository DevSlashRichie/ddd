# RDDD Framwork

This project includes all the required interfaces and abstract classes
to build a fully structured DDD project.

This is lacking of some features that will be added as the main project 
progresses.

It is needless to mention that everything is built-in is written in and for a typescript project.

## Summary

1. [Core Elements](#core-elements)
2. [Documentation](#documentation)
3. [Tools & Utilities](#tools--utilities)
4. [Expected Errors Library](#expected-errors-lib)

## Installing

Using npm:
```bash
$ npm install ddd-scaffold 
```

Using yarn:
```bash
$ yarn add ddd-scaffold 
```

## Core Elements

- It includes an interface for building **Entities**
- It includes an interface for building **ValueObjects**
- It includes a full library for expected errors called **ErrorOperations**.

## Documentation

The project includes a documentation at _/docs/_, open it at your favourite 
browser and read it to know where to start.

## Tools & Utilities

1. **Guard** This includes some tools to pre-validate arguments for the different
factories you'll build across the Entities and ValueObjects.
   
2. **ObjectUtilies** Is created to parse strings to object/primitives when using
those at DTOs or similar.
   
3. **Enum** Basically a tool with different tools to work with typescript enums

4. Finally and not less important, a logger built with winston, for a basic integration
   for it. You should modify that file for bigger approaches or just write everything again
   with the desired elements in it.
   
## Expected Errors Lib.

The project includes different methods that will help you to handle
error that requires a message or a return. Expected error can be traduced to
something like: "Missing Item"

_You should firstly should read the documentation._

   - **GResponse** Built for GRPC responses. 
   - **AResponse** Built for HTTP responses. 
   - **Result** Built general proposed that just need a message. 

OperationResult, is just for the abstract factory builder.

## Notes

 - This project is not finished.
 - Examples will be added in the future, tho you should read more about DDD.