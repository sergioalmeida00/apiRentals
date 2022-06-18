import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSpecifications1650577838954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"specifications",
                columns:[
                    {
                        name:"id_specification",
                        type:"uuid",
                        isPrimary: true
                    },
                    {
                        name:"name_specification",
                        type:"varchar",                        
                    },
                    {
                        name:"description_specification",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ]

            })
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("specifications")
    }

}
