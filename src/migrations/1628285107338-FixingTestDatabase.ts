import {MigrationInterface, QueryRunner} from "typeorm";

export class FixingTestDatabase1628285107338 implements MigrationInterface {
    name = 'FixingTestDatabase1628285107338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemonsUsers" ("id" SERIAL NOT NULL, "usersId" integer, "pokemonsId" integer, CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_602e702b0438adc6f010f1e140e"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_602e702b0438adc6f010f1e140e"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_1191df9b744c9a8c1a5475f3f98" PRIMARY KEY ("usersId", "pokemonsId")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_8fee9b6b9306105faa856139d33"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_1191df9b744c9a8c1a5475f3f98" PRIMARY KEY ("pokemonsId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_8fee9b6b9306105faa856139d33"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_b20c025df21ab9c4936286d0167" PRIMARY KEY ("pokemonsId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_b20c025df21ab9c4936286d0167"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "usersId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_602e702b0438adc6f010f1e140e"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_c213c7d7691136c96ccc104ec11" PRIMARY KEY ("id", "usersId")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "pokemonsId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_c213c7d7691136c96ccc104ec11"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_8fee9b6b9306105faa856139d33" PRIMARY KEY ("usersId", "id", "pokemonsId")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "pokemonsId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "usersId" SET NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_b91891622217eafe325ae48539" ON "pokemonsUsers" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_20234b706b49c4ac00b11f4171" ON "pokemonsUsers" ("pokemonsId") `);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_b91891622217eafe325ae485395" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_20234b706b49c4ac00b11f41712" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_20234b706b49c4ac00b11f41712"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_b91891622217eafe325ae485395"`);
        await queryRunner.query(`DROP INDEX "IDX_20234b706b49c4ac00b11f4171"`);
        await queryRunner.query(`DROP INDEX "IDX_b91891622217eafe325ae48539"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "usersId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "pokemonsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_8fee9b6b9306105faa856139d33"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_c213c7d7691136c96ccc104ec11" PRIMARY KEY ("usersId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "pokemonsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_c213c7d7691136c96ccc104ec11"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ALTER COLUMN "usersId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_602e702b0438adc6f010f1e140e"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_b20c025df21ab9c4936286d0167" PRIMARY KEY ("pokemonsId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_b20c025df21ab9c4936286d0167"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_8fee9b6b9306105faa856139d33" PRIMARY KEY ("usersId", "pokemonsId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_1191df9b744c9a8c1a5475f3f98"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_8fee9b6b9306105faa856139d33" PRIMARY KEY ("usersId", "pokemonsId", "id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_1191df9b744c9a8c1a5475f3f98"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "PK_602e702b0438adc6f010f1e140e"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "pokemonsUsers"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
