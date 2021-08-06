import {MigrationInterface, QueryRunner} from "typeorm";

export class ManyToManyOnPokemonsAndUser1628218953906 implements MigrationInterface {
    name = 'ManyToManyOnPokemonsAndUser1628218953906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemonsUsers" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PokemonsUser" ("usersId" integer NOT NULL, "pokemonsId" integer NOT NULL, CONSTRAINT "PK_f26832f6c805de74f6f3dc4d87e" PRIMARY KEY ("usersId", "pokemonsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d3c88fe39d8311e26899007bf" ON "PokemonsUser" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d589e26ea17c1c576efc64fb2f" ON "PokemonsUser" ("pokemonsId") `);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PokemonsUser" ADD CONSTRAINT "FK_4d3c88fe39d8311e26899007bfa" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "PokemonsUser" ADD CONSTRAINT "FK_d589e26ea17c1c576efc64fb2fb" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PokemonsUser" DROP CONSTRAINT "FK_d589e26ea17c1c576efc64fb2fb"`);
        await queryRunner.query(`ALTER TABLE "PokemonsUser" DROP CONSTRAINT "FK_4d3c88fe39d8311e26899007bfa"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`DROP INDEX "IDX_d589e26ea17c1c576efc64fb2f"`);
        await queryRunner.query(`DROP INDEX "IDX_4d3c88fe39d8311e26899007bf"`);
        await queryRunner.query(`DROP TABLE "PokemonsUser"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "pokemonsUsers"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
