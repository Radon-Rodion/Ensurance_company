/* eslint-disable prettier/prettier */
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {models} from './models/models'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'test1',
            entities: [],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([])
    ],
})
export class AppModule {
}