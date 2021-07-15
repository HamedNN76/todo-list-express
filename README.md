# Welcome to TodoList node.js project

This is a simple CRUD project based on REST API.

## Make it run

After cloning project, install dependencies with `npm i` command,
Then execute `npm run dev` for development, and `npm run production` to build and start you application in production mode.

# Directories

1.  Controllers
2.  Models
3.  Response
4.  Router
5.  types
6.  Validator

## Controllers

Here you will find methods that handle queries and send response for each model.

## Models

In this directory you will find mongoose schemas for each entity.

## Response

With Response module you can handle send responses with success and failure structure.

## Router

Each entity's router could be find here.

## types

Here you will see global types.

## Validators

This directory includes:

- Yup schemas to validate query params and body params
- Customized yup validations methods
