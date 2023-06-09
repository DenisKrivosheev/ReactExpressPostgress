create Table person(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email  VARCHAR(255),
    password  VARCHAR(255)
);

create Table post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person(id)
);