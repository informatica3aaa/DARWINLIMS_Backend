import sql, { Bit, DateTime } from 'mssql';
import {sqlConfig} from '../../db/connection';
import  moment from 'moment';

class Cotizaciones {
    // ``
    static async getCotizaciones(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1.[lastname_m]  as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as quotation_state
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,quo.[ap_prod_user_id]
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,quo.[ap_ven_date]
		      ,us2.[name] + ' ' + us2.[lastname_f] + ' ' + us2.[lastname_m]  as user_venta
          ,quo.[ap_prod_date]
		      ,us3.[name] + ' ' + us3.[lastname_f] + ' ' + us3.[lastname_m]  as user_prod
           FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
	  LEFT JOIN users us2 on  quo.ap_ven_user_id = us2.id
	  LEFT JOIN users us3 on  quo.ap_prod_user_id = us3.id
    LEFT JOIN currencies cu ON quo.currency_id = cu.id
    where quo.active=@active ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionesAll(data){
        // console.log("data", data);
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as start_date
          ,CONVERT(varchar,quo.[expiration_date], 103) as expiration_date
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1.[lastname_m]  as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as quotation_state
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,quo.[ap_prod_user_id]
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
      FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
      LEFT JOIN currencies cu ON quo.currency_id = cu.id
          where quo.active=@active ORDER BY ID DESC`)
        }).then(result => {
          // console.log("result", result);
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 
  
    static async getCotizacionesAll2(data){
      // console.log("data", data);
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`SELECT quo.[id]
        ,quo.[quotation_number]
        ,com.[name] as company_name
        ,st.[name] as estado
        ,qs.[name] as quotation_state
    FROM [quotations] quo 
    LEFT JOIN users us  ON quo.id = us.id 
    LEFT JOIN states st ON quo.state_id = st.id
    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
    LEFT JOIN companies com ON quo.company_id = com.id
    LEFT JOIN projects pro ON quo.project_id = pro.id
    LEFT JOIN currencies cu ON quo.currency_id = cu.id
        where quo.active=@active ORDER BY ID DESC`)
      }).then(result => {
        // console.log("result", result);
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
  } 

    static async getCotizacionesCondicional(query, data){
      // console.log("wuery para filter", query)
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
            ,quo.[user_id]
            ,us.[username]
            ,quo.[active]
            ,quo.[quotation_number]
            ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
            ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
            ,quo.[company_id]
            ,com.[name] as company_name
            ,com.[fantasy_name] 
            ,com.[rut]
            ,com.[dv]
            ,com.[active] as company_state
            ,quo.[estimated_days]
            ,quo.[project_id]
            ,pro.[name] as project
            ,pro.[active] as project_state
            ,quo.[parent_id]
            ,quo.[version]
            ,quo.[state_id]
            ,st.[name] as estado
            ,quo.[currency_id]
            ,cu.[prefix] as currency_name
            ,quo.[specific_condition]
            ,quo.[general_condition_id]
            ,gc.[title]
            ,quo.[user_creator_id]
            ,CONCAT(us1.[name], ' ', us1.[lastname_f], ' ', us1.[lastname_m])  as user_creator
            ,quo.[user_modifier_id]
            ,CONVERT(varchar,quo.[created], 103) as created
            ,CONVERT(varchar,quo.[modified], 103) as modified
            ,quo.[adjunto]
            ,quo.[for]
            ,quo.[quotation_comment]
            ,quo.[quotation_state_id]
            ,qs.[name] as quotation_state
            ,qs.[quotation_class]
            ,qs.[description]
            ,quo.[ap_ventas]
            ,quo.[ap_prod]
            ,quo.[ap_ven_user_id]
            ,quo.[ap_prod_user_id]
            ,quo.[reject_comment]
            ,quo.[reject_user_id]
            ,quo.[ap_ven_date]
            ,quo.[ap_prod_date]
            ,quo.[estado_notificacion]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id 
            LEFT JOIN currencies cu ON quo.currency_id = cu.id
            where ${ query }
            ORDER BY ID DESC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionesIdToken(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('id', sql.Int, Number(data.id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
          ,quo.[pago_previo]
          ,quo.[destinatario_id]
      FROM [quotations] quo 
      LEFT JOIN users us  ON quo.id = us.id 
      LEFT JOIN states st ON quo.state_id = st.id
      LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
      LEFT JOIN users us1  ON quo.user_creator_id = us1.id
      LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
      LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
      LEFT JOIN users us4 ON quo.reject_user_id = us4.id
      LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
      LEFT JOIN companies com ON quo.company_id = com.id
      LEFT JOIN projects pro ON quo.project_id = pro.id
      LEFT JOIN currencies cu ON quo.currency_id = cu.id
      where quo.id=@id and [token] is null`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionesId(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .query(`SELECT quo.[id]
        ,quo.[user_id]
        ,us.[username]
        ,quo.[active]
        ,quo.[quotation_number]
        ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
        ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
        ,quo.[company_id]
        ,com.[name] as company_name
        ,com.[fantasy_name] 
        ,com.[rut]
        ,com.[dv]
        ,com.[active] as company_state
        ,quo.[estimated_days]
        ,quo.[project_id]
        ,pro.[name] as project
        ,pro.[active] as project_state
        ,quo.[parent_id]
        ,quo.[version]
        ,quo.[state_id]
        ,st.[name] as estado
        ,quo.[currency_id]
        ,cu.[prefix] as currency_name
        ,quo.[specific_condition]
        ,quo.[general_condition_id]
        ,gc.[title]
        ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
        ,quo.[user_modifier_id]
        , CONVERT(varchar,quo.[created], 103) as created
        , CONVERT(varchar,quo.[modified], 103) as modified
        ,quo.[adjunto]
        ,quo.[for]
        ,quo.[quotation_comment]
        ,quo.[quotation_state_id]
        ,qs.[name] as estado_interno
        ,qs.[quotation_class]
        ,qs.[description]
        ,quo.[ap_ventas]
        ,quo.[ap_prod]
        ,quo.[ap_ven_user_id]
        ,us2.username as ap_ven_user
        ,quo.[ap_prod_user_id]
        ,us3.username as ap_prod_user
        ,quo.[reject_comment]
        ,quo.[reject_user_id]
        ,us4.[username] as reject_user
        ,quo.[ap_ven_date]
        ,quo.[ap_prod_date]
        ,quo.[pago_previo]
        ,quo.[destinatario_id]
    FROM [quotations] quo 
    LEFT JOIN users us  ON quo.id = us.id 
    LEFT JOIN states st ON quo.state_id = st.id
    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
    LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
    LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
    LEFT JOIN users us4 ON quo.reject_user_id = us4.id
    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
    LEFT JOIN companies com ON quo.company_id = com.id
    LEFT JOIN projects pro ON quo.project_id = pro.id
    LEFT JOIN currencies cu ON quo.currency_id = cu.id
    where quo.id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
  }  
  
    

    static async getCotizacionesIdCompany(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('id', sql.Int, Number(data.id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1.[lastname_m]  as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
          FROM [quotations] quo 
          LEFT JOIN users us  ON quo.id = us.id 
          LEFT JOIN states st ON quo.state_id = st.id
          LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
          LEFT JOIN users us1  ON quo.user_creator_id = us1.id
          LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
          LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
          LEFT JOIN users us4 ON quo.reject_user_id = us4.id
          LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
          LEFT JOIN companies com ON quo.company_id = com.id
          LEFT JOIN projects pro ON quo.project_id = pro.id
          LEFT JOIN currencies cu ON quo.currency_id = cu.id
          where quo.active=@active and quo.company_id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    }  
    
    static async getCotizacionesHistorial(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('company_id', sql.Int, Number(data.company_id))
          .input('project_id', sql.Int, Number(data.project_id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,quo.[user_modifier_id]
		  ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
            LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
            LEFT JOIN users us4 ON quo.reject_user_id = us4.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id
            LEFT JOIN currencies cu ON quo.currency_id = cu.id
            where quo.company_id=@company_id and quo.project_id=@project_id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    }  

    static async getCotizacionesHistorialComp(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('company_id', sql.Int, Number(data.company_id))
          .input('active', sql.Bit, Number(data.active))
          .input('offset', sql.Int, Number(data.offset))
          .input('limit', sql.Int, Number(data.limit))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1.[lastname_m]  as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as estado_interno
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,us2.username as ap_ven_user
          ,quo.[ap_prod_user_id]
          ,us3.username as ap_prod_user
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,us4.[username] as reject_user
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
            FROM [quotations] quo 
            LEFT JOIN users us  ON quo.id = us.id 
            LEFT JOIN states st ON quo.state_id = st.id
            LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
            LEFT JOIN users us1  ON quo.user_creator_id = us1.id
            LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
            LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
            LEFT JOIN users us4 ON quo.reject_user_id = us4.id
            LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
            LEFT JOIN companies com ON quo.company_id = com.id
            LEFT JOIN projects pro ON quo.project_id = pro.id
            LEFT JOIN currencies cu ON quo.currency_id = cu.id
            where quo.active=@active and quo.company_id=@company_id  ORDER BY ID ASC  OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    }  

    static async getCondicionesEspecificas(id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT [id]
                    ,[paragraph_1]
                    ,[paragraph_2]
                    ,[paragraph_3]
                    ,[paragraph_4]
                    , CONVERT(varchar,[created], 103) as created_cond
                    , CONVERT(varchar,[modified], 103) as modified_cond
                    ,[active] as estado_cond
                    ,[title]
                    FROM [general_conditions]
                    where id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }

    static async getAdjuntosCotizacion(id){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT [id]
                    ,[model]
                    ,[quotation_id]
                    ,[name]
                    ,[attachment]
                    ,[dir]
                    ,[type]
                    ,[size]
                    ,[active]
                    ,[module]
                    FROM [quotation_attachments]
                    where quotation_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }   
    
    static async getDestinatarioCotizacion(id){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT [id]
            ,[company_id]
            ,[mail]
            ,[modulo]
            ,[name]
            ,[user_creator_id]
            ,[user_modifier_id]
            ,[created]
            ,[modified]
            ,[active]
            ,[telefono]
            FROM [destinatarios] where id=@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }  
    
    static async getDetallesCotizacion(id){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`select qd.[id]
            ,qd.[assay_id]
            ,qd.[quotation_id]
            ,qd.[active]
            ,ass.[currency_id]
			,cu2.[prefix] as currency_service
			,cu2.valor as currency_valor
			,qd.[price]
			,(qd.price * cu2.valor) as valor_pesos_services
	        ,ass.[cost]
            ,cu.prefix as divisa
			,cu.valor as currency_actual_peso
			,q.currency_id as currency_id 
			,cu.prefix as currency_quo
			      ,((qd.price * cu2.valor) / cu.valor) as valor_final
            ,ass.[id] as id_assay
            ,ass.[assay_type_id]
            ,ast.[name] as tipo
            ,ass.[technique_id]
            ,tec.[name] as tecnica
            ,ass.[sample_type_id]
            ,sa.[name] as tipo_muestra
            ,ass.[digestion_id]
            ,dig.[name] as digestion
            ,ass.[name] as assay_name
            ,ass.[description]
            ,ass.[method_id]
            ,me.[name] as metodo
            ,ass.[nominal_weight]
            ,ass.[nominal_volume]
            ,ass.[volume_unity_id]
            ,vol.[name] as volumen
            ,ass.[mass_unity_id]
            ,ma.[name] as peso
            ,ass.[user_creator_id]
            ,ass.[user_modifier_id]
            , CONVERT(varchar,ass.[created], 103) as fecha_created
            , CONVERT(varchar,ass.[modified], 103) as fecha_modified
            ,ass.[unit_id]
            ,ass.[fin]
            ,ass.[assay_file]
            ,ass.[extensive_description]
            ,ass.[short_description]
        FROM [quotation_details] qd 
		    INNER JOIN quotations q ON q.id = qd.quotation_id
        INNER JOIN assays ass ON qd.assay_id = ass.id
        LEFT JOIN currencies cu ON q.currency_id = cu.id
        LEFT JOIN currencies cu2 ON ass.currency_id = cu2.id
        LEFT JOIN assay_types ast ON ass.assay_type_id = ast.id
        LEFT JOIN techniques tec ON ass.technique_id = tec.id
        LEFT JOIN sample_types sa ON ass.sample_type_id = sa.id
        LEFT JOIN digestions dig ON ass.digestion_id = dig.id
        LEFT JOIN units vol ON ass.volume_unity_id = vol.id
        LEFT JOIN units ma ON ass.mass_unity_id = ma.id
        LEFT JOIN methods me ON ass.method_id = me.id where qd.active = 1 and  quotation_id =@id order by tipo, assay_name asc`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }

    static async getDetallesCotizacionV2(id){
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('id', sql.Int, Number(id))
          .query(`SELECT qd.[id]
          ,qd.[assay_id]
          ,qd.[quotation_id]
          ,qd.[active]
          ,ass.[currency_id]
          ,qd.[price]
          ,ass.[cost]
          ,cu.prefix as divisa
          ,ass.[id] as id_assay
          ,ass.[assay_type_id]
          ,ast.[name] as tipo
          ,ass.[technique_id]
          ,tec.[name] as tecnica
          ,ass.[sample_type_id]
          ,sa.[name] as tipo_muestra
          ,ass.[digestion_id]
          ,dig.[name] as digestion
          ,ass.[name] as assay_name
          ,ass.[description]
          ,ass.[method_id]
          ,me.[name] as metodo
          ,ass.[nominal_weight]
          ,ass.[nominal_volume]
          ,ass.[volume_unity_id]
          ,vol.[name] as volumen
          ,ass.[mass_unity_id]
          ,ma.[name] as peso
          ,ass.[user_creator_id]
          ,ass.[user_modifier_id]
          , CONVERT(varchar,ass.[created], 103) as fecha_created
          , CONVERT(varchar,ass.[modified], 103) as fecha_modified
          ,ass.[unit_id]
          ,ass.[fin]
          ,ass.[assay_file]
          ,ass.[extensive_description]
          ,ass.[short_description]
      FROM [quotation_details] qd 
      LEFT JOIN assays ass ON qd.assay_id = ass.id
      LEFT JOIN currencies cu ON ass.currency_id = cu.id
      LEFT JOIN assay_types ast ON ass.assay_type_id = ast.id
      LEFT JOIN techniques tec ON ass.technique_id = tec.id
      LEFT JOIN sample_types sa ON ass.sample_type_id = sa.id
      LEFT JOIN digestions dig ON ass.digestion_id = dig.id
      LEFT JOIN units vol ON ass.volume_unity_id = vol.id
      LEFT JOIN units ma ON ass.mass_unity_id = ma.id
      LEFT JOIN methods me ON ass.method_id = me.id where qd.id =@id order by tipo, assay_name asc`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
  }


    static async getEtapasCotizacion(assay_id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(assay_id))
            .query(`SELECT pa.[id]
            ,ph.[name] as etapa
            ,ph.[variable]
            ,pa.[phase_id]
            ,pa.[assay_id]
            ,pa.[order]
            FROM [phase_assays] pa 
            LEFT JOIN phases ph ON pa.phase_id = ph.id
            where pa.assay_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    }

    static async getDetallesElementosCotizacion(id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(id))
            .query(`SELECT ea.[id]
                    ,ea.[chemical_element_id]
                    ,ce.[name] as elemento
                    ,ce.[symbol]
                    ,ea.[unit_id]
                    ,un.[name] as unidad
                    ,ea.[assay_id]
                    ,ea.[valor_f]
                    ,ea.[formula_id]
                    ,fo.[formula] as formula
                    ,ea.[limite_inferior]
                    ,ea.[limite_superior]
                    ,ea.[active]
                    ,ea.[decimals]
                    ,ea.[symbol_limite_inferior]
                    ,ea.[symbol_limite_superior]
                    FROM [element_assays] ea
                    LEFT JOIN formulas fo ON ea.formula_id = fo.id
                    LEFT JOIN units un ON ea.unit_id = un.id
                    LEFT JOIN chemical_elements ce ON ea.chemical_element_id = ce.id
                    where assay_id =@id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          }); 
    }

    static async ContToolsAllQuo(data, query){
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active))
            .query(`select count(id) as total  from [quotations] where active = @active`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });



      

    }  

    static async ContToolsAllQuoActive(data, query){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .input('active', sql.Bit, Number(data.active))
      .input('id', sql.Bit, Number(data.id))
      .query(`select count(id) as total  from [quotations] where active = @active and id=@id`)
    }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

    }).catch(err => {
      console.error(err);
      sql.close();
    });
    }   

    static async ContToolsFilter(data, query){
       return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request()
      .query(`SELECT count(quo.[id]) as total
              FROM [quotations] quo 
              LEFT JOIN users us  ON quo.id = us.id 
              LEFT JOIN states st ON quo.state_id = st.id
              LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
              LEFT JOIN users us1  ON quo.user_creator_id = us1.id
              LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
              LEFT JOIN companies com ON quo.company_id = com.id
              LEFT JOIN projects pro ON quo.project_id = pro.id where ${ query }`)
      }).then(result => {
      let rows = result.recordset;
      sql.close();
      return rows;

      }).catch(err => {
      console.error(err);
      sql.close();
      });
  
    }

    static async ContTools(data, query){
        switch(data.tipo){
          case 'cotizaciones':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('active', sql.Bit, Number(data.active))
              .query(`select count(id) as total  from [quotations] where active = @active`)
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;
      
            }).catch(err => {
              console.error(err);
              sql.close();
            });
    break;
          case 'cotizacion':
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active))
          .input('id', sql.Bit, Number(data.id))
          .query(`select count(id) as total  from [quotations] where active = @active and id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
break;  
          case 'filtros':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id where ${ query }`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
        break; 
          case 'historial':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('project_id', sql.Int, Number(data.project_id))
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
                    LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
                    LEFT JOIN users us4 ON quo.reject_user_id = us4.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id
                    where quo.company_id=@company_id and quo.project_id=@project_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break;  
          case 'historialxcompañia':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .query(`SELECT count(quo.[id]) as total
                    FROM [quotations] quo 
                    LEFT JOIN users us  ON quo.id = us.id 
                    LEFT JOIN states st ON quo.state_id = st.id
                    LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
                    LEFT JOIN users us1  ON quo.user_creator_id = us1.id
                    LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
                    LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
                    LEFT JOIN users us4 ON quo.reject_user_id = us4.id
                    LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
                    LEFT JOIN companies com ON quo.company_id = com.id
                    LEFT JOIN projects pro ON quo.project_id = pro.id
                    where quo.company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break;    
          case 'proyectos':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('active', sql.Bit, Number(data.active))
            .query(`SELECT count([id]) as total FROM [projects] WHERE active=@active and company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break
          case 'servicios':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('company_id', sql.Int, Number(data.company_id))
            .input('active', sql.Bit, Number(data.active))
            .query(`SELECT count([id]) as total FROM [projects] WHERE active=@active and company_id=@company_id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
          break
          default:
              throw new Error(`No existe tipo ${ data.tipo} para contar registros, revise su información`)  
      }
  
        
  
    }

    static async updateAccion(data, usuario){
      switch(data.accion){
          case 'aprobar_venta':
              return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('user_id', sql.Int, Number(usuario.id))
              .query(`UPDATE [quotations] SET
                      [ap_ventas] = 1,
                      [ap_ven_user_id]= @user_id,
                      [user_modifier_id]=@user_id,
                      [ap_ven_date]= CURRENT_TIMESTAMP,
                      [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
                      WHERE id=@id `)
              }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

              }).catch(err => {
              console.error(err);
              sql.close();
              });
            break;
          case 'aprobar_produccion':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('user_id', sql.Int, Number(usuario.id))
              .query(`UPDATE [quotations] SET
                      [ap_prod] = 1,
                      [ap_prod_user_id]= @user_id,
                      [ap_prod_date]= CURRENT_TIMESTAMP,
                      [user_modifier_id]= @user_id,
                      [modified]=CURRENT_TIMESTAMP  OUTPUT Inserted.*
                      WHERE id=@id`)
              }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;

              }).catch(err => {
              console.error(err);
              sql.close();
              });
            break;
          case 'rechazar':
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('id', sql.Int, Number(data.id))
              .input('user_id', sql.Int, Number(usuario.id))
              .input('comment', sql.Text, data.comentario)         
              .query(`UPDATE [quotations] SET
                      [state_id]=3,
                      [user_modifier_id]=@user_id,
                      [reject_user_id] =@user_id,
                      [reject_comment]= @comment,
                      [modified]=T_TIMESTAMP OUTPUT Inserted.*
                      WHERE id=@id`)
              }).then(result => {
                let rows = result.recordset;
              sql.close();
              return rows;

              }).catch(err => {
              console.error(err);
              sql.close();
              });
              break;          
          default:
              throw new Error('No existe tipo accion para terminar el proceso, revise su información')  
          }
    }  

    static async consultaEstadoCotizacion(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .query(`SELECT [id]
        ,[user_id]
        ,[active]
        ,[quotation_number]
        ,[start_date]
        ,[expiration_date]
        ,[company_id]
        ,[estimated_days]
        ,[project_id]
        ,[parent_id]
        ,[version]
        ,[state_id]
        ,[currency_id]
        ,[specific_condition]
        ,[general_condition_id]
        ,[user_creator_id]
        ,[user_modifier_id]
        ,[created]
        ,[modified]
        ,[adjunto]
        ,[for]
        ,[quotation_comment]
        ,[quotation_state_id]
        ,[ap_ventas]
        ,[ap_prod]
        ,[ap_ven_user_id]
        ,[ap_prod_user_id]
        ,[reject_comment]
        ,[reject_user_id]
        ,[ap_ven_date]
        ,[ap_prod_date]
        ,[pago_previo]
        ,[destinatario_id]
        ,[estado_notificacion]
        ,[token]
        FROM [quotations]
        where ap_ventas = 1 and ap_prod = 1 and id=@id`)
      }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

      }).catch(err => {
        console.error(err);
        sql.close();
      });
    }   
    
    static async cambiaEstadoCotizacion(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .input('user_id', sql.Int, Number(usuario.id))
        .query(`UPDATE [quotations] SET
                [state_id] = 2,
                [user_modifier_id]=@user_id,
                [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
                WHERE id=@id`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }  
    
    static async addCotizacion(data, usuario){

      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('active', sql.Bit, 0)
        .input('quotation_number', sql.VarChar, data.quotation_number)
        .input('start_date', sql.VarChar, data.start_date)
        .input('expiration_date', sql.VarChar, data.expiration_date)
        .input('company_id', sql.Int, Number(data.company_id))
        .input('estimated_days', sql.Int, Number(data.estimated_days))
        .input('project_id', sql.Int, Number(data.proyect_id) ? Number(data.proyect_id) : null )
        .input('version', sql.Int, Number(data.version))
        .input('state_id', sql.Int, Number(data.state_id))
        .input('currency_id', sql.Int, Number(data.currency_id))
        .input('specific_condition', sql.VarChar, data.specific_condition)
        .input('general_condition_id', sql.Int, Number(data.general_condition_id))
        .input('for', sql.VarChar, data.destinatario)
        .input('quotation_state_id', sql.Int, 5)
        .input('parent_id', sql.Int, Number(data.parent_id))
        .input('pago_previo', sql.Bit, Number(data.pago_previo))
        .input('destinatario_id', sql.Int, Number(data.destinatario_id))
        .query(`INSERT INTO [quotations]
                ([user_id]
                ,[active]
                ,[quotation_number]
                ,[start_date]
                ,[expiration_date]
                ,[company_id]
                ,[estimated_days]
                ,[project_id]
                ,[version]
                ,[state_id]
                ,[currency_id]
                ,[specific_condition]
                ,[general_condition_id]
                ,[user_creator_id]
                ,[created]
                ,[for]
                ,[quotation_state_id]
                ,[ap_ventas]
                ,[ap_prod]
                ,[parent_id]
                ,[pago_previo]
                ,[destinatario_id]
                ) OUTPUT Inserted.* 
                VALUES(
                @user_id, 
                @active, 
                @quotation_number,
                @start_date, 
                @expiration_date,
                @company_id, 
                @estimated_days, 
                @project_id,
                @version,
                @state_id,
                @currency_id,
                @specific_condition,
                @general_condition_id,
                @user_id,
                CURRENT_TIMESTAMP,
                @for,
                @quotation_state_id,
                @active,
                @active,
                @parent_id,
                @pago_previo,
                @destinatario_id)`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 

    static async addProyecto(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('company_id', sql.Int, Number(data.company_id))
        .input('name', sql.VarChar, String(data.name))
        .input('active', sql.Bit, 1)
        .input('user_id', sql.Int, Number(usuario.id))
        .query(`INSERT INTO [dbo].[projects]
              ([company_id]
              ,[name]
              ,[active]
              ,[user_creator_id]
              ,[created]) OUTPUT Inserted.* 
                VALUES(
                @company_id, 
                @name,
                @active, 
                @user_id,
                CURRENT_TIMESTAMP)`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 
    
    static async addDetallesCotizacion(data, usuario){
      // console.log("ADD-DETALLE", data);
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('quotation_id', sql.Int, Number(data.quotation_id))
        .input('assay_id', sql.Int, Number(data.assay_id))
        .input('price', sql.Float, data.price)
        .query(`INSERT INTO [quotation_details]
                 ([assay_id]
                ,[quotation_id]
                ,[active]
                ,[price]
                ,[user_creator_id]
                ,[created]) OUTPUT Inserted.* 
                VALUES (
                @assay_id, 
                @quotation_id,
                1, 
                @price,
                @user_id, 
                CURRENT_TIMESTAMP )`)
        }).then(result => {
          // console.log("resultado:::", result);
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    // static async addDetallesCotizacion(data, usuario){
    //   return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    //     return pool.request()
    //     .input('user_id', sql.Int, Number(usuario.id))
    //     .input('active', sql.Bit, Number(data.active))
    //     .input('quotation_id', sql.Int, Number(data.quotation_id))
    //     .input('assay_id', sql.Int, Number(data.assay_id))
    //     .input('price', sql.Float, data.price)
    //     .query(`INSERT INTO [quotation_details]
    //              ([assay_id] 
    //             ,[quotation_id]
    //             ,[active]
    //             ,[price]
    //             ,[user_creator_id]
    //             ,[created]) OUTPUT Inserted.* 
    //             VALUES (
    //             @assay_id, 
    //             @quotation_id,
    //             @active, 
    //             @price,
    //             @user_id, 
    //             CURRENT_TIMESTAMP )`)
    //     }).then(result => {
    //       // console.log("resultado:::", result);
    //     let rows = result.recordset;
    //     sql.close();
    //     return rows;

    //     }).catch(err => {
    //     console.error(err);
    //     sql.close();
    //     });
    // }
    
    static async addCotizacionFin(data, usuario){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('user_id', sql.Int, Number(usuario.id))
        .input('active', sql.Bit, Number(data.active))
        .input('quotation_id', sql.Int, Number(data.quotation_id))
         .query(`UPDATE [quotations] SET 
                [active]=@active
                ,[user_modifier_id]=@user_id
                ,[modified]=CURRENT_TIMESTAMP OUTPUT Inserted.* 
                where id = @quotation_id`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 

    static async getServiciosAnaliticos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('id', sql.Int, Number(data.assay_id))
        .query(`SELECT 
                       ass.[id] as assay_id
                      ,ass.[assay_type_id]
                      ,tp.[name] as assay_name
                      ,ass.[method_id]
                      ,mt.[name] as method_name
                      ,ass.[technique_id]
                      ,tc.[name]  as technique_name
                      ,ass.[sample_type_id]
                      ,st.[name] as sample_type_name
                      ,ass.[digestion_id]
                      ,dg.[name] as digestion_name
                      ,ass.[volume_unity_id]
                      ,ass.[nominal_volume]
                      ,un.[name] as volume_name
                      ,ass.[mass_unity_id]
                      ,ass.[nominal_weight]
                      ,un1.[name] as mass_name
                      ,ass.[unit_id]
                      ,ass.[currency_id]
                      ,cu.prefix as currency_name
                      ,ass.[name]
                      ,ass.[active]
                      ,ass.[description]
                      ,ass.[cost]
                      ,ass.[user_creator_id]
                      ,ass.[user_modifier_id]
                      ,ass.[created]
                      ,ass.[modified]
                      ,ass.[fin]
                      ,ass.[assay_file]
                      ,ass.[extensive_description]
                      ,ass.[short_description]
              FROM [assays] ass LEFT JOIN 
              assay_types tp ON ass.assay_type_id = tp.id LEFT JOIN 
              methods mt ON ass.method_id = mt.id LEFT JOIN 
              techniques tc ON ass.technique_id = tc.id LEFT JOIN 
              sample_types st ON ass.sample_type_id = st.id LEFT JOIN 
              digestions dg ON ass.digestion_id = dg.id LEFT JOIN
              currencies cu ON ass.currency_id = cu.id LEFT JOIN
              [units] un ON ass.volume_unity_id = un.id LEFT JOIN
              [units] un1 ON ass.mass_unity_id = un1.id
              WHERE ass.active=@active and ass.[id]= @id`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async getFasesServiciosAnaliticos(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(data.id))
        .query(`SELECT fa.[id]
                ,fa.[phase_id]
                ,fh.[name] as fase
                ,fa.[assay_id]
                ,fa.[order]
                FROM [phase_assays] fa LEFT JOIN phases fh On fa.phase_id = fh.id where fa.assay_id = @id order by fa.[order] asc`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async getFasesServiciosAnaliticosAssay_id(id){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('id', sql.Int, Number(id))
        .query(`SELECT fa.[id]
                ,fa.[phase_id]
                ,fh.[name] as fase
                ,fa.[assay_id]
                ,fa.[order]
                FROM [phase_assays] fa LEFT JOIN phases fh On fa.phase_id = fh.id where fa.assay_id = @id order by fa.[order] asc`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    }

    static async getServiciosAnaliticosAll(data, query){
      // console.log("query", query);
         return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .query(`SELECT 
                  ass.[id] as aasay_id
                  ,ass.[name]
                  ,ass.[extensive_description]
                  ,ass.[short_description]
                  FROM [chemical_elements] eq INNER JOIN [element_assays] ea ON ea.chemical_element_id = eq.id
                  INNER JOIN [assays] ass ON ea.assay_id = ass.id 
                  INNER JOIN [units] u ON ea.unit_id = u.id 
                  WHERE ${ query } ORDER BY ass.[name] ASC`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        // console.error("getServiciosAnaliticosAll",err);
        sql.close();
        });
    } 
    
    static async getProjectIdCompany(data){
      return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
        return pool.request()
        .input('active', sql.Bit, Number(data.active))
        .input('company_id', sql.Int, Number(data.company_id))
        .query(`SELECT [id]
        ,[company_id]
        ,UPPER([name]) as name
        ,[active]
        ,[user_creator_id]
        ,[user_modifier_id]
        ,[created]
        ,[modified] FROM [projects] WHERE active=@active and company_id=@company_id ORDER BY [name] ASC`)
        }).then(result => {
        let rows = result.recordset;
        sql.close();
        return rows;

        }).catch(err => {
        console.error(err);
        sql.close();
        });
    } 

    static async getCotizacionXuser(data, user){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('user_id', sql.Int, Number(user.id))
          .query(`SELECT [id] FROM [quotations] where active=0 and user_creator_id=@user_id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionXuserV2(data, user){
          return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('active', sql.Bit, Number(data.active) ?  Number(data.active) : 0)
            .input('user_id', sql.Int, Number(user.id))
            .query(`SELECT top 1 [id] FROM [quotations] where active=@active and user_creator_id=@user_id and quotation_state_id =5  order by id desc`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
    } 

    static async getCotizacionXuserDetalle(data, user){

        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active) ?  Number(data.active) : 0)
          .input('user_id', sql.Int, Number(user.id))
          .query(`SELECT quo.[id]
          ,quo.[user_id]
          ,us.[username]
          ,quo.[active]
          ,quo.[quotation_number]
          ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
          ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
          ,quo.[company_id]
          ,com.[name] as company_name
          ,com.[fantasy_name] 
          ,com.[rut]
          ,com.[dv]
          ,com.[active] as company_state
          ,quo.[estimated_days]
          ,quo.[project_id]
          ,pro.[name] as project
          ,pro.[active] as project_state
          ,quo.[parent_id]
          ,quo.[version]
          ,quo.[state_id]
          ,st.[name] as estado
          ,quo.[currency_id]
          ,cu.[prefix] as currency_name
          ,quo.[specific_condition]
          ,quo.[general_condition_id]
          ,gc.[title]
          ,quo.[user_creator_id]
          ,us1.[name] + ' ' + us1.[lastname_f] + ' ' + us1.[lastname_m] as user_creator
          ,quo.[user_modifier_id]
          , CONVERT(varchar,quo.[created], 103) as created
          , CONVERT(varchar,quo.[modified], 103) as modified
          ,quo.[adjunto]
          ,quo.[for]
          ,quo.[quotation_comment]
          ,quo.[quotation_state_id]
          ,qs.[name] as quotation_state
          ,qs.[quotation_class]
          ,qs.[description]
          ,quo.[ap_ventas]
          ,quo.[ap_prod]
          ,quo.[ap_ven_user_id]
          ,quo.[ap_prod_user_id]
          ,quo.[reject_comment]
          ,quo.[reject_user_id]
          ,quo.[ap_ven_date]
          ,quo.[ap_prod_date]
          FROM [quotations] quo 
          LEFT JOIN users us  ON quo.id = us.id 
          LEFT JOIN states st ON quo.state_id = st.id
          LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
          LEFT JOIN users us1  ON quo.user_creator_id = us1.id
          LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
          LEFT JOIN companies com ON quo.company_id = com.id
          LEFT JOIN projects pro ON quo.project_id = pro.id
          LEFT JOIN quotation_details qd on quo.id = qd.quotation_id
          LEFT JOIN currencies cu ON quo.currency_id = cu.id
          WHERE quo.active=@active and quo.user_creator_id=@user_id and qd.id is null and  quo.state_id < 2 order by quo.id desc`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionXNumber(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('active', sql.Bit, Number(data.active) ?  Number(data.active) : 0)
          // .input('state_id', sql.Int, Number(data.state_id))
          .query(`SELECT [id],[active],[quotation_number],[state_id]
           FROM [quotations] 
           WHERE active=@active order by id desc`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async buscarServiciosXquotation(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          // .input('id', sql.Bit, Number(data.active) ?  Number(data.active) : 0)
          .input('id', sql.Int, Number(data.id))
          .query(`SELECT 
          ass.[id]
          ,ass.[assay_type_id]
          ,tp.[name] as assay_name
          ,ass.[method_id]
          ,mt.[name] as method_name
          ,ass.[technique_id]
          ,tc.[name]  as technique_name
          ,ass.[sample_type_id]
          ,st.[name] as sample_type_name
          ,ass.[digestion_id]
          ,dg.[name] as digestion_name
          ,ass.[volume_unity_id]
          ,ass.[nominal_volume]
          ,un.[name] as volume_name
          ,ass.[mass_unity_id]
          ,ass.[nominal_weight]
          ,un1.[name] as mass_name
          ,ass.[unit_id]
          ,ass.[currency_id]
          ,cu.prefix as currency_name
          ,ass.[name]
          ,ass.[active]
          ,ass.[description]
          ,ass.[cost]
          ,ass.[user_creator_id]
          ,ass.[user_modifier_id]
          ,ass.[created]
          ,ass.[modified]
          ,ass.[fin]
          ,ass.[assay_file]
          ,ass.[extensive_description]
          ,ass.[short_description]
  FROM [assays] ass LEFT JOIN 
  assay_types tp ON ass.assay_type_id = tp.id LEFT JOIN 
  methods mt ON ass.method_id = mt.id LEFT JOIN 
  techniques tc ON ass.technique_id = tc.id LEFT JOIN 
  sample_types st ON ass.sample_type_id = st.id LEFT JOIN 
  digestions dg ON ass.digestion_id = dg.id LEFT JOIN
  currencies cu ON ass.currency_id = cu.id LEFT JOIN
  [units] un ON ass.volume_unity_id = un.id LEFT JOIN
  [units] un1 ON ass.mass_unity_id = un1.id INNER JOIN 
[quotation_details] qd ON
ass.id = qd.assay_id INNER JOIN quotations q ON
qd.quotation_id = q.id where q.id=@id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async getCotizacionXDetalle(quotation_id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .input('quotation_id', sql.Int, Number(quotation_id) )
          .query(`SELECT [id] FROM [quotation_details] where quotation_id=@quotation_id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    } 

    static async buscarAllQuo(data){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          .query(`WITH VISTA_QUO as
          (
          SELECT  ROW_NUMBER() 
          over(partition by quo.[company_id] 
          ORDER BY quo.[company_id]) ORDEN ,
                quo.[id]
                    ,quo.[quotation_number]
                    ,UPPER(com.[name]) as company_name
                    ,'('+st.[name] +')'  as estado
                     FROM [quotations] quo 
                      LEFT JOIN states st ON quo.state_id = st.id
                      LEFT JOIN companies com ON quo.company_id = com.id
          WHERE  quo.[active] = 1	
          )
          SELECT id, quotation_number, company_name, estado FROM  VISTA_QUO where orden = 1 ORDER BY ID`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
    }
      
   static async existeCotizacionId(id, company_id){
        return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
          return pool.request()
          // .input('active', sql.Bit, Number(data.active) ?  Number(data.active) : 0)
          .input('id', sql.Int, Number(id))
          .input('company_id', sql.Int, Number(company_id))
          .query(`SELECT [id]
           FROM [quotations] 
           WHERE id=@id and company_id = @company_id`)
        }).then(result => {
          let rows = result.recordset;
          sql.close();
          return rows;
  
        }).catch(err => {
          console.error(err);
          sql.close();
        });
   } 

   static async getCotizacionesbyParent(id){
         return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('parent_id', sql.Int, Number(id))
            .query(`SELECT quo.[id]
            ,quo.[user_id]
            ,us.[username]
            ,quo.[active]
            ,quo.[quotation_number]
            ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
            ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
            ,quo.[company_id]
            ,com.[name] as company_name
            ,com.[fantasy_name] 
            ,com.[rut]
            ,com.[dv]
            ,com.[active] as company_state
            ,quo.[estimated_days]
            ,quo.[project_id]
            ,pro.[name] as project
            ,pro.[active] as project_state
            ,quo.[parent_id]
            ,quo.[version]
            ,quo.[state_id]
            ,st.[name] as estado
            ,quo.[currency_id]
            ,cu.[prefix] as currency_name
            ,quo.[specific_condition]
            ,quo.[general_condition_id]
            ,gc.[title]
            ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
            ,quo.[user_modifier_id]
            , CONVERT(varchar,quo.[created], 103) as created
            , CONVERT(varchar,quo.[modified], 103) as modified
            ,quo.[adjunto]
            ,quo.[for]
            ,quo.[quotation_comment]
            ,quo.[quotation_state_id]
            ,qs.[name] as estado_interno
            ,qs.[quotation_class]
            ,qs.[description]
            ,quo.[ap_ventas]
            ,quo.[ap_prod]
            ,quo.[ap_ven_user_id]
            ,us2.username as ap_ven_user
            ,quo.[ap_prod_user_id]
            ,us3.username as ap_prod_user
            ,quo.[reject_comment]
            ,quo.[reject_user_id]
            ,us4.[username] as reject_user
            ,quo.[ap_ven_date]
            ,quo.[ap_prod_date]
            ,quo.[estado_notificacion]
        FROM [quotations] quo 
        LEFT JOIN users us  ON quo.id = us.id 
        LEFT JOIN states st ON quo.state_id = st.id
        LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
        LEFT JOIN users us1  ON quo.user_creator_id = us1.id
        LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
        LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
        LEFT JOIN users us4 ON quo.reject_user_id = us4.id
        LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
        LEFT JOIN companies com ON quo.company_id = com.id
        LEFT JOIN projects pro ON quo.project_id = pro.id
        LEFT JOIN currencies cu ON quo.currency_id = cu.id
            where  quo.parent_id=@parent_id`)
          }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;
    
          }).catch(err => {
            console.error(err);
            sql.close();
          });
   }  

   static async cambiaEstado(data, usuario){

                  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
                  return pool.request()
                  .input('id', sql.Int, Number(data.quotation_id))
                  .input('state_id', sql.Int, Number(data.state_id))
                  .input('user_id', sql.Int, Number(usuario.id))
                  .query(`UPDATE [quotations] SET
                          [state_id] = @state_id,
                          [user_modifier_id]= @user_id,
                          [modified]=CURRENT_TIMESTAMP  OUTPUT Inserted.* 
                          WHERE id=@id`)
                  }).then(result => {
                  let rows = result.recordset;
                  sql.close();
                  return rows;
    
                  }).catch(err => {
                  console.error(err);
                  sql.close();
                  });
        
   }  
  
   static async getCotizacionesPendientes(data){
           return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
              return pool.request()
              .input('offset', sql.Int, Number(data.offset))
              .input('limit', sql.Int, Number(data.limit))
              .query(`SELECT quo.[id]
              ,quo.[user_id]
              ,us.[username]
              ,quo.[active]
              ,quo.[quotation_number]
              ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
              ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
              ,quo.[company_id]
              ,com.[name] as company_name
              ,com.[fantasy_name] 
              ,com.[rut]
              ,com.[dv]
              ,com.[active] as company_state
              ,quo.[estimated_days]
              ,quo.[project_id]
              ,pro.[name] as project
              ,pro.[active] as project_state
              ,quo.[parent_id]
              ,quo.[version]
              ,quo.[state_id]
              ,st.[name] as estado
              ,quo.[currency_id]
              ,cu.[prefix] as currency_name
              ,quo.[specific_condition]
              ,quo.[general_condition_id]
              ,gc.[title]
              ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
              ,quo.[user_modifier_id]
              , CONVERT(varchar,quo.[created], 103) as created
              , CONVERT(varchar,quo.[modified], 103) as modified
              ,quo.[adjunto]
              ,quo.[for]
              ,quo.[quotation_comment]
              ,quo.[quotation_state_id]
              ,qs.[name] as estado_interno
              ,qs.[quotation_class]
              ,qs.[description]
              ,quo.[ap_ventas]
              ,quo.[ap_prod]
              ,quo.[ap_ven_user_id]
              ,us2.username as ap_ven_user
              ,quo.[ap_prod_user_id]
              ,us3.username as ap_prod_user
              ,quo.[reject_comment]
              ,quo.[reject_user_id]
              ,us4.[username] as reject_user
              ,quo.[ap_ven_date]
              ,quo.[ap_prod_date]
              ,quo.[estado_notificacion]
          FROM [quotations] quo 
          LEFT JOIN users us  ON quo.id = us.id 
          LEFT JOIN states st ON quo.state_id = st.id
          LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
          LEFT JOIN users us1  ON quo.user_creator_id = us1.id
          LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
          LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
          LEFT JOIN users us4 ON quo.reject_user_id = us4.id
          LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
          LEFT JOIN companies com ON quo.company_id = com.id
          LEFT JOIN projects pro ON quo.project_id = pro.id
          LEFT JOIN currencies cu ON quo.currency_id = cu.id
		  WHERE quo.quotation_state_id = 5 and quo.state_id =1 and quo.active =1
		  order by quo.[id] desc OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
            }).then(result => {
              let rows = result.recordset;
              sql.close();
              return rows;
      
            }).catch(err => {
              console.error(err);
              sql.close();
            });
   }  

   static async getCotizacionesPendienteId(data){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
       return pool.request()
       .input('id', sql.Int, Number(data.id))
       .query(`SELECT quo.[id]
       ,quo.[user_id]
       ,us.[username]
       ,quo.[active]
       ,quo.[quotation_number]
       ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
       ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
       ,quo.[company_id]
       ,com.[name] as company_name
       ,com.[fantasy_name] 
       ,com.[rut]
       ,com.[dv]
       ,com.[active] as company_state
       ,quo.[estimated_days]
       ,quo.[project_id]
       ,pro.[name] as project
       ,pro.[active] as project_state
       ,quo.[parent_id]
       ,quo.[version]
       ,quo.[state_id]
       ,st.[name] as estado
       ,quo.[currency_id]
       ,cu.[prefix] as currency_name
       ,quo.[specific_condition]
       ,quo.[general_condition_id]
       ,gc.[title]
       ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
       ,quo.[user_modifier_id]
       , CONVERT(varchar,quo.[created], 103) as created
       , CONVERT(varchar,quo.[modified], 103) as modified
       ,quo.[adjunto]
       ,quo.[for]
       ,quo.[quotation_comment]
       ,quo.[quotation_state_id]
       ,qs.[name] as estado_interno
       ,qs.[quotation_class]
       ,qs.[description]
       ,quo.[ap_ventas]
       ,quo.[ap_prod]
       ,quo.[ap_ven_user_id]
       ,us2.username as ap_ven_user
       ,quo.[ap_prod_user_id]
       ,us3.username as ap_prod_user
       ,quo.[reject_comment]
       ,quo.[reject_user_id]
       ,us4.[username] as reject_user
       ,quo.[ap_ven_date]
       ,quo.[ap_prod_date]
       ,quo.[estado_notificacion]
   FROM [quotations] quo 
   LEFT JOIN users us  ON quo.id = us.id 
   LEFT JOIN states st ON quo.state_id = st.id
   LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
   LEFT JOIN users us1  ON quo.user_creator_id = us1.id
   LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
   LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
   LEFT JOIN users us4 ON quo.reject_user_id = us4.id
   LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
   LEFT JOIN companies com ON quo.company_id = com.id
   LEFT JOIN projects pro ON quo.project_id = pro.id
   LEFT JOIN currencies cu ON quo.currency_id = cu.id
WHERE quo.quotation_state_id = 5 and quo.state_id =1 and quo.active =1 and quo.[id] = @id
order by quo.[id] desc`)
     }).then(result => {
       let rows = result.recordset;
       sql.close();
       return rows;

     }).catch(err => {
       console.error(err);
       sql.close();
     });
}  

   static async contarCotizacionesPendientes(){
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
               return pool.request()
               .query(`SELECT count(quo.[id]) as total
           FROM [quotations] quo 
           LEFT JOIN users us  ON quo.id = us.id 
           LEFT JOIN states st ON quo.state_id = st.id
           LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
           LEFT JOIN users us1  ON quo.user_creator_id = us1.id
           LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
           LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
           LEFT JOIN users us4 ON quo.reject_user_id = us4.id
           LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
           LEFT JOIN companies com ON quo.company_id = com.id
           LEFT JOIN projects pro ON quo.project_id = pro.id
       WHERE quo.quotation_state_id = 5 and quo.state_id =1 and quo.active =1`)
             }).then(result => {
               let rows = result.recordset;
               sql.close();
               return rows;
       
             }).catch(err => {
               console.error(err);
               sql.close();
             });
   }  
 
   static async contarCotizacionesPorVencer(){
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
               return pool.request()
               .query(`SELECT count(quo.[id]) as total
           FROM [quotations] quo 
           LEFT JOIN users us  ON quo.id = us.id 
           LEFT JOIN states st ON quo.state_id = st.id
           LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
           LEFT JOIN users us1  ON quo.user_creator_id = us1.id
           LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
           LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
           LEFT JOIN users us4 ON quo.reject_user_id = us4.id
           LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
           LEFT JOIN companies com ON quo.company_id = com.id
           LEFT JOIN projects pro ON quo.project_id = pro.id
           WHERE quo.state_id =2 and quo.active =1 and quo.expiration_date >= CONVERT(varchar,GETDATE(),101)`)
             }).then(result => {
               let rows = result.recordset;
               sql.close();
               return rows;
       
             }).catch(err => {
               console.error(err);
               sql.close();
             });
   }  

  static async getCotizacionesPorVencer(data){
            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
               return pool.request()
               .input('offset', sql.Int, Number(data.offset))
               .input('limit', sql.Int, Number(data.limit))
               .query(`SELECT quo.[id]
               ,quo.[user_id]
               ,us.[username]
               ,quo.[active]
               ,quo.[quotation_number]
               ,CONVERT(varchar,quo.[start_date], 103) as [start_date]
               ,CONVERT(varchar,quo.[expiration_date], 103) as [expiration_date]
               ,quo.[company_id]
               ,com.[name] as company_name
               ,com.[fantasy_name] 
               ,com.[rut]
               ,com.[dv]
               ,com.[active] as company_state
               ,quo.[estimated_days]
               ,quo.[project_id]
               ,pro.[name] as project
               ,pro.[active] as project_state
               ,quo.[parent_id]
               ,quo.[version]
               ,quo.[state_id]
               ,st.[name] as estado
               ,quo.[currency_id]
               ,cu.[prefix] as currency_name
               ,quo.[specific_condition]
               ,quo.[general_condition_id]
               ,gc.[title]
               ,CONCAT(us1.[name] , ' ' , us1.[lastname_f] , ' ', us1.[lastname_m]) as user_creator
               ,quo.[user_modifier_id]
               , CONVERT(varchar,quo.[created], 103) as created
               , CONVERT(varchar,quo.[modified], 103) as modified
               ,quo.[adjunto]
               ,quo.[for]
               ,quo.[quotation_comment]
               ,quo.[quotation_state_id]
               ,qs.[name] as estado_interno
               ,qs.[quotation_class]
               ,qs.[description]
               ,quo.[ap_ventas]
               ,quo.[ap_prod]
               ,quo.[ap_ven_user_id]
               ,us2.username as ap_ven_user
               ,quo.[ap_prod_user_id]
               ,us3.username as ap_prod_user
               ,quo.[reject_comment]
               ,quo.[reject_user_id]
               ,us4.[username] as reject_user
               ,quo.[ap_ven_date]
               ,quo.[ap_prod_date]
               ,quo.[estado_notificacion]
           FROM [quotations] quo 
           LEFT JOIN users us  ON quo.id = us.id 
           LEFT JOIN states st ON quo.state_id = st.id
           LEFT JOIN general_conditions gc ON quo.general_condition_id = gc.id
           LEFT JOIN users us1  ON quo.user_creator_id = us1.id
           LEFT JOIN users us2  ON quo.ap_ven_user_id = us2.id
           LEFT JOIN users us3  ON quo.ap_prod_user_id = us3.id
           LEFT JOIN users us4 ON quo.reject_user_id = us4.id
           LEFT JOIN quotation_states qs ON quo.quotation_state_id = qs.id
           LEFT JOIN companies com ON quo.company_id = com.id
           LEFT JOIN projects pro ON quo.project_id = pro.id
           LEFT JOIN currencies cu ON quo.currency_id = cu.id
           WHERE quo.state_id =2 and quo.active =1 and quo.expiration_date >= CONVERT(varchar,GETDATE(),101)
           order by quo.expiration_date asc OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`)
             }).then(result => {
               let rows = result.recordset;
               sql.close();
               return rows;
       
             }).catch(err => {
               console.error(err);
               sql.close();
             });
   }  
     
  static async cambiaEstadoIterno(data, usuario){

            return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
            return pool.request()
            .input('id', sql.Int, Number(data.id))
            .input('quotation_state_id', sql.Int, Number(data.quotation_state_id))
            .input('user_id', sql.Int, Number(usuario.id))
            .input('quotation_comment', sql.VarChar, Number(data.quotation_comment))
            .query(`UPDATE [quotations] SET
                    [quotation_state_id] = @quotation_state_id,
                    [user_modifier_id]= @user_id,
                    [quotation_comment]=@quotation_comment,
                    [modified]=CURRENT_TIMESTAMP  OUTPUT Inserted.* 
                    WHERE id=@id`)
            }).then(result => {
            let rows = result.recordset;
            sql.close();
            return rows;

            }).catch(err => {
            console.error(err);
            sql.close();
            });
  
  }  

  static async validaSiExiste(data){

    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(data.id))
    .query(`SELECT id FROM [quotations] WHERE id=@id`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });

  } 

  static async addCotizacionClonCompany(data, usuario, quo_id){
  let fecha1 =  new Date(data.start_date).toISOString('yyyy-mm-dd').replace('T', ' ')
  // console.log("fecha1", fecha1);
  let fecha2 =  new Date(data.start_date).toISOString('yyyy-mm-dd').replace('T', ' ')
  // console.log("fecha2", fecha2)

  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('user_id', sql.Int, Number(usuario.id))
    .input('active', sql.Bit, 0)
    .input('quotation_number', sql.VarChar, data.quotation_number)
    .input('start_date', sql.Date, fecha1)
    .input('expiration_date', sql.Date, fecha2)
    .input('company_id', sql.Int, Number(data.company_id))
    .input('estimated_days', sql.Int, Number(data.estimated_days))
    .input('project_id', sql.Int, Number(data.project_id) ? Number(data.project_id) : null )
    .input('version', sql.Int,1 )
    .input('state_id', sql.Int,1)
    .input('currency_id', sql.Int, Number(data.currency_id))
    .input('specific_condition', sql.VarChar, data.specific_condition)
    .input('general_condition_id', sql.Int, Number(data.general_condition_id))
    .input('for', sql.VarChar, data.destinatario)
    .input('quotation_state_id', sql.Int, 5)
    .input('parent_id', sql.Int, Number(quo_id))
    .query(`INSERT INTO [quotations]
            ([user_id]
            ,[active]
            ,[start_date]
            ,[expiration_date]
            ,[company_id]
            ,[estimated_days]
            ,[project_id]
            ,[version]
            ,[state_id]
            ,[currency_id]
            ,[specific_condition]
            ,[general_condition_id]
            ,[user_creator_id]
            ,[created]
            ,[for]
            ,[quotation_state_id]
            ,[ap_ventas]
            ,[ap_prod]
            ,[parent_id]
            ) OUTPUT Inserted.* 
            VALUES(
            @user_id, 
            @active, 
            @start_date, 
            @expiration_date,
            @company_id, 
            @estimated_days, 
            @project_id,
            @version,
            @state_id,
            @currency_id,
            @specific_condition,
            @general_condition_id,
            @user_id,
            CURRENT_TIMESTAMP,
            @for,
            @quotation_state_id,
            @active,
            @active,
            @parent_id)`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
  } 

  static async addCotizacionClon(data, usuario){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('user_id', sql.Int, Number(usuario.id))
    .input('active', sql.Bit, 0)
    // .input('quotation_number', sql.VarChar, data.quotation_number)
    .input('start_date', sql.VarChar, data.start_date)
    .input('expiration_date', sql.VarChar, data.expiration_date)
    .input('company_id', sql.Int, Number(data.company_id))
    .input('estimated_days', sql.Int, Number(data.estimated_days))
    .input('project_id', sql.Int, Number(data.project_id) ? Number(data.project_id) : null )
    .input('version', sql.Int, Number(data.version))
    .input('state_id', sql.Int, Number(data.state_id))
    .input('currency_id', sql.Int, Number(data.currency_id))
    .input('specific_condition', sql.VarChar, data.specific_condition)
    .input('general_condition_id', sql.Int, Number(data.general_condition_id))
    .input('for', sql.VarChar, data.destinatario)
    .input('quotation_state_id', sql.Int, 5)
    .input('parent_id', sql.Int, Number(data.parent_id))
    .query(`INSERT INTO [quotations]
            ([user_id]
            ,[active]
            ,[start_date]
            ,[expiration_date]
            ,[company_id]
            ,[estimated_days]
            ,[project_id]
            ,[version]
            ,[state_id]
            ,[currency_id]
            ,[specific_condition]
            ,[general_condition_id]
            ,[user_creator_id]
            ,[created]
            ,[for]
            ,[quotation_state_id]
            ,[ap_ventas]
            ,[ap_prod]
            ,[parent_id]
            ) OUTPUT Inserted.* 
            VALUES(
            @user_id, 
            @active, 
            @start_date, 
            @expiration_date,
            @company_id, 
            @estimated_days, 
            @project_id,
            @version,
            @state_id,
            @currency_id,
            @specific_condition,
            @general_condition_id,
            @user_id,
            CURRENT_TIMESTAMP,
            @for,
            @quotation_state_id,
            @active,
            @active,
            @parent_id)`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
  } 

  static async addCotizacionFinClon(data, usuario){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('user_id', sql.Int, Number(usuario.id))
    .input('active', sql.Bit, Number(data.active))
    .input('quotation_id', sql.Int, Number(data.quotation_id))
     .query(`UPDATE [quotations] SET 
            [active]=@active
            ,[user_modifier_id]=@user_id
            ,[modified]=CURRENT_TIMESTAMP OUTPUT Inserted.* 
            where id = @quotation_id`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
  }

  static async updateDetalles(data, usuario){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(data.id))
    .input('user_id', sql.Int, Number(usuario.id))
    .input('price',  sql.Float, data.price)
    .query(`UPDATE [quotation_details] SET
            [price] = @price,
            [user_modifier_id]=@user_id,
            [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
            WHERE id=@id `)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async actulizarQuoClon(data, usuario){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(data.id))
    .input('user_id', sql.Int, Number(usuario.id))
    .input('expiration_date', sql.VarChar, data.expiration_date)
    .input('estimated_days', sql.Int, Number(data.estimated_days))
    .input('project_id', sql.Int, Number(data.project_id) ? Number(data.project_id) : null )
    // .input('version', sql.Int, Number(data.version)) pendiente
    .input('currency_id', sql.Int, Number(data.currency_id))
    .input('specific_condition', sql.VarChar, data.specific_condition)
    .input('general_condition_id', sql.Int, Number(data.general_condition_id))
    .input('for', sql.VarChar, data.for)
    .query(`UPDATE [quotations] SET
            [start_date]=@start_date,
            [expiration_date]=@expiration_date,
            [estimated_days]=@estimated_days,
            [project_id]=@project_id,
            [currency_id]=@currency_id,
            [for]=@for,
            [specific_condition]=@specific_condition,
            [general_condition_id]=@general_condition_id,
            [user_modifier_id]=@user_id,
            [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
            WHERE id=@id`)
    }).then(result => {
      let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async eliminaDetalles(data, usuario){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(data.id))
    .input('user_id', sql.Int, Number(usuario.id))
    .query(`UPDATE [quotation_details] SET
            [active]=0,
            [user_modifier_id]=@user_id,
            [modified]=CURRENT_TIMESTAMP OUTPUT Inserted.*
            WHERE id=@id`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async getDetallesAdmin(){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .query(`SELECT 
    ass.id,
    ass.assay_type_id,
    ass.sample_type_id,
    ass.digestion_id,
    ass.technique_id,
    ass.name,
    ass.active,
    ass.description,
    ass.method_id,
    ass.nominal_weight,
    ass.nominal_volume,
    ass.cost,
    ass.volume_unity_id,
    ass.mass_unity_id,
    ass.currency_id,
    ass.user_creator_id,
    ass.user_modifier_id,
    ass.created,
    ass.modified,
    ass.unit_id,
    ass.fin,
    ass.assay_file,
    ass.extensive_description,
    ass.short_description,
    ass.is_admin_code,
    cu.valor,
    cu.name,
    (cu.valor * ass.cost) as precio
    FROM [assays] ass  
    LEFT JOIN currencies cu on ass.currency_id = cu.id
    where ass.active = 1 and [is_admin_code] = 1`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;
    }).catch(err => {
    console.error(err);
    sql.close();
    }); 
}

static async getDestinatario(company_id, modulo){
    return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('company_id', sql.Int, Number(company_id))
    .input('modulo', sql.VarChar, modulo)
    .query(`SELECT 
          [id]
          ,[company_id]
          ,[mail]
          ,[modulo]
          ,[name]
          ,[user_creator_id]
          ,[user_modifier_id]
          ,[created]
          ,[modified]
          ,[active]
          ,[telefono]
          FROM [dbo].[destinatarios] where company_id = @company_id and active = 1 and modulo=@modulo`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;
    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async addDestinatario(company_id, mail, name, user_creator_id, telefono, modulo){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
  return pool.request()
  .input('company_id', sql.Int, Number(company_id))
  .input('name', sql.VarChar, name)
  .input('mail', sql.VarChar, mail)
  .input('user_creator_id', sql.Int, Number(user_creator_id))
  .input('active', sql.Bit, 1)
  .input('modulo', sql.VarChar, modulo)
  .input('telefono', sql.VarChar, telefono)
  .query(`INSERT INTO [dbo].[destinatarios]
          ([company_id]
          ,[mail]
          ,[name]
          ,[user_creator_id]
          ,[created]
          ,[active]
          ,[modulo]
          ,[telefono]) OUTPUT Inserted.* 
        VALUES
          (@company_id
          ,@mail
          ,@name
          ,@user_creator_id
          ,CURRENT_TIMESTAMP  
          ,@active
          ,@modulo
          ,@telefono)`)
  }).then(result => {
  let rows = result.recordset;
  sql.close();
  return rows;
  }).catch(err => {
  console.error(err);
  sql.close();
  });
}

static async getStatusEstados(){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
  return pool.request()
  .query(`SELECT COUNT(quo.id) as cant, year(quo.created) as anio , st.name as estado ,quo.quotation_state_id,
  datepart(quarter, quo.created) as trimestre 
  FROM [dbo].[quotations] quo  INNER JOIN quotation_states st ON quo.quotation_state_id = st.id
  where 
  YEAR(quo.created) = 2015
  and datepart(quarter, quo.created) = datepart(quarter, CURRENT_TIMESTAMP)
  group by
  YEAR(quo.created),
  datepart(quarter, quo.created),
  st.name,
  quo.quotation_state_id
  order by datepart(quarter, quo.created) desc
          `)
  }).then(result => {
  let rows = result.recordset;
  sql.close();
  return rows;
  }).catch(err => {
  console.error(err);
  sql.close();
  });
}


static async cambiarEstado(id, estado, token){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(id))
    .input('estado', sql.Int, Number(estado))
    .input('token', sql.NVarChar,token)
    .query(`UPDATE [quotations] SET [state_id] = @estado , token = @token OUTPUT Inserted.* WHERE [id]=@id`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;
    }).catch(err => {
    console.error(err);
    sql.close();
    });
}


static async cambiarEstadoNotificacion(id, estado){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(id))
    .input('estado', sql.VarChar, estado)
    .query(`UPDATE [quotations] SET [estado_notificacion] = @estado  OUTPUT Inserted.* WHERE [id]=@id`)
    }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;
    }).catch(err => {
    console.error(err);
    sql.close();
    });
}


static async getServicioClasico(data){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('data', sql.VarChar, data)
    .query(`SELECT 
    ass.[id] as assay_id
   ,ass.[assay_type_id]
   ,tp.[name] as assay_name
   ,ass.[method_id]
   ,mt.[name] as method_name
   ,ass.[technique_id]
   ,tc.[name]  as technique_name
   ,ass.[sample_type_id]
   ,st.[name] as sample_type_name
   ,ass.[digestion_id]
   ,dg.[name] as digestion_name
   ,ass.[volume_unity_id]
   ,ass.[nominal_volume]
   ,un.[name] as volume_name
   ,ass.[mass_unity_id]
   ,ass.[nominal_weight]
   ,un1.[name] as mass_name
   ,ass.[unit_id]
   ,ass.[currency_id]
   ,cu.prefix as currency_name
   ,ass.[name]
   ,ass.[active]
   ,ass.[description]
   ,ass.[cost]
   ,ass.[user_creator_id]
   ,ass.[user_modifier_id]
   ,ass.[created]
   ,ass.[modified]
   ,ass.[fin]
   ,ass.[assay_file]
   ,ass.[extensive_description]
   ,ass.[short_description]
FROM [assays] ass LEFT JOIN 
assay_types tp ON ass.assay_type_id = tp.id LEFT JOIN 
methods mt ON ass.method_id = mt.id LEFT JOIN 
techniques tc ON ass.technique_id = tc.id LEFT JOIN 
sample_types st ON ass.sample_type_id = st.id LEFT JOIN 
digestions dg ON ass.digestion_id = dg.id LEFT JOIN
currencies cu ON ass.currency_id = cu.id LEFT JOIN
[units] un ON ass.volume_unity_id = un.id LEFT JOIN
[units] un1 ON ass.mass_unity_id = un1.id
WHERE ass.name LIKE '%' + @data + '%'
order by ass.[id] desc OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`)
    }).then(result => {
      // console.log("result", result);
    let rows = result.recordset;

    sql.close();
    return rows;
    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async updateCotizacionesDesiertas(){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .query(`
    UPDATE [quotations]
    SET [user_modifier_id] = 542
    ,[modified] = CURRENT_TIMESTAMP
    ,[quotation_state_id] = 6 OUTPUT Inserted.*
    WHERE quotation_state_id = 5 and state_id = 1 and expiration_date < GETDATE()
    `)
  }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}


static async ListarCompanys(){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .query(`
    select DISTINCT(UPPER(com.fantasy_name)) as name , com.rut, com.id from quotations quo inner join companies com on com.id= quo.company_id where quo.active =1 and quo.state_id = 2
    GROUP BY com.fantasy_name,  com.rut , com.id
    `)
  }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async ListarQuoByCompany(id){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(id))
    .query(`
    select quo.quotation_number, quo.id, quo.project_id, pr.name from quotations quo inner join companies com on com.id= quo.company_id  left join projects pr on quo.project_id = pr.id  
    where quo.active =1 and quo.state_id = 2
    and quo.company_id = @id
    
    `)
  }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

    }).catch(err => {
    console.error(err);
    sql.close();
    });
}

static async getCompaniaId(id){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('id', sql.Int, Number(id))
    .query(`select 
             [id]
            ,[rut]
            ,[dv]
            ,UPPER([name]) as [name]
            ,[fantasy_name]
            ,[active]
    from [companies] where id=@id`)
  }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

  }).catch(err => {
    console.error(err);
    sql.close();
  });
}   

static async validarDetalleExiste(data){
  return await new sql.ConnectionPool(sqlConfig).connect().then(pool => {
    return pool.request()
    .input('quotation_id', sql.Int, Number(data.quotation_id))
    .input('assay_id', sql.Int, Number(data.assay_id))
    .query(`SELECT [id]
          FROM [quotation_details]
          WHERE quotation_id =  @quotation_id AND assay_id = @assay_id AND active = 1
    `)
  }).then(result => {
    let rows = result.recordset;
    sql.close();
    return rows;

  }).catch(err => {
    console.error(err);
    sql.close();
  });
}   



}
    

    export default Cotizaciones;