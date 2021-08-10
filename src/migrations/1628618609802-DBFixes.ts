import {MigrationInterface, QueryRunner} from "typeorm";

export class DBFixes1628618609802 implements MigrationInterface {
    name = 'DBFixes1628618609802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_b91891622217eafe325ae485395"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_20234b706b49c4ac00b11f41712"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_b91891622217eafe325ae485395" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_20234b706b49c4ac00b11f41712" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_20234b706b49c4ac00b11f41712"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_b91891622217eafe325ae485395"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_20234b706b49c4ac00b11f41712" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_b91891622217eafe325ae485395" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
