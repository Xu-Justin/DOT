# DOT Hiring Online Test - Backend Developer

This project application provides simple interactions between User and Task.

This project is created with Node.Js express for API with mongodb/mongoose for the database and redis for the cache. This project is also equipped with centralized error handling and cypress e2e API test.

## Usage

Run the following codes on terminal to clone this repository, install necessary packages, and run the application.

```
git clone https://github.com/Xu-Justin/DOT.git
cd DOT
npm install
npm start
```

## Database Schema

![DOT - Table](https://user-images.githubusercontent.com/56458008/178113917-3873fed5-ccac-4fd3-a9cb-fd813de68616.png)

## API

| Method   | Route  | Request                                                   | Description                                     |
|:--------:|:------:|-----------------------------------------------------------|-------------------------------------------------|
| `GET`    | /users | -                                                         | Display all users.                              |
| `POST`   | /users | <pre>'name' : str<br>'age'  : int</pre>                   | Create new user.                                |
| `PUT`    | /users | <pre>'id'   : str<br>'name' : str<br>'age'  : int</pre>   | Update user by `id`.                            |
| `PATCH`  | /users | <pre>'id'   : str<br>'name' : str</pre>                   | Update user `name` by `id`.                     |
| `DELETE` | /users | <pre>'id'   : str</pre>                                   | Delete user by `id`.                            |
| `GET`    | /tasks | -                                                         | Display all tasks and populated with the users. |
| `POST`   | /tasks | <pre>'user_id'     : str<br>'description' : str</pre>     | Create new task belongs to `user_id`.           |
| `DELETE` | /tasks | <pre>'id'   : str</pre>                                   | Delete task by `id`.                            |

## Design Pattern

This project uses MVC pattern, but without view.

## Questions

a. Apa perbedaan Type dan Interface pada TypeScript ?
- [Interfaces vs Types in TypeScript](https://stackoverflow.com/a/52682220/19076403)

b. Bagaimana cara untuk mendebugging sebuah aplikasi di local maupun sudah di production ?
- Debugging process can be done using logger such as `console.log`. But, when code is large, using `console.log` might be harder since every log, either error or message, will be logged on same console. Another solutions is to use `winston` or `morgan`.
> Reference: [Production Debugging: Everything You Need to Know](https://www.rookout.com/blog/production-debugging/)

c. Bagaimana cara mengetahui kompleksitas sebuah query dan cara untuk menguranginya ?
- Get to know about data structure time complexity. A linear search is O(n), a binary search is O(log<sub>2</sub>n), and a hash search is O(1).
```sql
select * from user
where id = 1 or id = 2 or id = 3 or id = 4 or id = 5          # Linear search
```
```sql
select * from user
where id in (1, 2, 3, 4, 5)                                   # Hash search
```

---

This project was developed for DOT Hiring Online Test - Backend Developer.
