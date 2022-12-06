import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAssetResponse {
  @IsNumber()
  @ApiProperty()
  user: number

  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  assetId: string
}