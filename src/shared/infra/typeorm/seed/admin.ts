import {getConnection} from "typeorm";
import {v4 as uuidV4} from "uuid";
import {hash} from "bcrypt";
import createConnection from "../index";


async function create(){
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const passaword = await hash("admin",8);

    await connection.query(
        `INSERT INTO USERS(id,name,email, password, "isAdmin", created_at, driver_license)
         VALUES ( '${id}', 'admin','admin@rentex.com.br', '${passaword}', true, 'now()','XXXXXXX' ) `
    );
    await connection.close;
}

create().then(()=> console.log("User admin created!"));