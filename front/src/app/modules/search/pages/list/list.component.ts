import {Component, OnInit} from '@angular/core';
import {
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any = []
  faPhoneAlt = faPhoneAlt;

  constructor() {
  }

  ngOnInit(): void {
    this.data = {
      purchases: [
        {
          "_id": "5ee1fe0c2d7a5e3cb450eedc",
          "controlNumber": "MA-1591874078Th",
          "status": "paid",
          "deliveryType": "to_send",
          "total": 111,
          "customer": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "loginAttempts": 0,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "password": "$2b$05$erC3MW5pp4sVb/xMhqF/z.rqDcsDPgf0Rg/51jcBfnqDtm4xMs.9y",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "blockExpires": "2020-06-09T12:44:05.624Z",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "items": "",
          "deliveryAddress": "deadeafa",
          "description": "",
          "author": {
            "_id": "5edf4ca2b0a29c04405d95b0",
            "role": "admin",
            "verified": false,
            "loginAttempts": 0,
            "name": "Administrador (JOSE)",
            "email": "admin@admin.com",
            "password": "$2b$05$S1n0WAWIhvTKUQPdOVabkuvC0hvXvLNu9/LBuD77SLZBWTCBCsxyC",
            "verification": "22aabc54-24ee-4f62-8501-a746c34a7449",
            "blockExpires": "2020-06-09T08:47:30.113Z",
            "createdAt": "2020-06-09T08:47:30.114Z",
            "updatedAt": "2020-06-11T09:29:58.022Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "createdAt": "2020-06-11T09:49:00.679Z",
          "updatedAt": "2020-06-11T11:14:38.019Z"
        },
        {
          "_id": "5ee1fe0c2d7a5e3cb450eedc",
          "controlNumber": "MA-1591874078Th",
          "status": "hold",
          "deliveryType": "to_send",
          "total": 111,
          "customer": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "loginAttempts": 0,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "password": "$2b$05$erC3MW5pp4sVb/xMhqF/z.rqDcsDPgf0Rg/51jcBfnqDtm4xMs.9y",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "blockExpires": "2020-06-09T12:44:05.624Z",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "items": "",
          "deliveryAddress": "deadeafa",
          "description": "",
          "author": {
            "_id": "5edf4ca2b0a29c04405d95b0",
            "role": "admin",
            "verified": false,
            "loginAttempts": 0,
            "name": "Administrador (JOSE)",
            "email": "admin@admin.com",
            "password": "$2b$05$S1n0WAWIhvTKUQPdOVabkuvC0hvXvLNu9/LBuD77SLZBWTCBCsxyC",
            "verification": "22aabc54-24ee-4f62-8501-a746c34a7449",
            "blockExpires": "2020-06-09T08:47:30.113Z",
            "createdAt": "2020-06-09T08:47:30.114Z",
            "updatedAt": "2020-06-11T09:29:58.022Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "createdAt": "2020-06-11T09:49:00.679Z",
          "updatedAt": "2020-06-11T11:14:38.019Z"
        },
        {
          "_id": "5ee1fe0c2d7a5e3cb450eedc",
          "controlNumber": "MA-1591874078Th",
          "status": "hold",
          "deliveryType": "to_send",
          "total": 111,
          "customer": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "loginAttempts": 0,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "password": "$2b$05$erC3MW5pp4sVb/xMhqF/z.rqDcsDPgf0Rg/51jcBfnqDtm4xMs.9y",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "blockExpires": "2020-06-09T12:44:05.624Z",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "items": "",
          "deliveryAddress": "deadeafa",
          "description": "",
          "author": {
            "_id": "5edf4ca2b0a29c04405d95b0",
            "role": "admin",
            "verified": false,
            "loginAttempts": 0,
            "name": "Administrador (JOSE)",
            "email": "admin@admin.com",
            "password": "$2b$05$S1n0WAWIhvTKUQPdOVabkuvC0hvXvLNu9/LBuD77SLZBWTCBCsxyC",
            "verification": "22aabc54-24ee-4f62-8501-a746c34a7449",
            "blockExpires": "2020-06-09T08:47:30.113Z",
            "createdAt": "2020-06-09T08:47:30.114Z",
            "updatedAt": "2020-06-11T09:29:58.022Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "createdAt": "2020-06-11T09:49:00.679Z",
          "updatedAt": "2020-06-11T11:14:38.019Z"
        },
      ],
      products: [
        {
          "_id": "5edfa3169eaa3501b874293c",
          "gallery": [
            {
              "_id": "5ee0b594ed8e365b5c4b3c86",
              "original": "http://localhost:3000/media/original_UxQygYomm6WB4rajgZvE7bhVRzPheL.jpg",
              "small": "http://localhost:3000/media/small_UxQygYomm6WB4rajgZvE7bhVRzPheL.jpg",
              "medium": "http://localhost:3000/media/medium_UxQygYomm6WB4rajgZvE7bhVRzPheL.jpg",
              "large": "http://localhost:3000/media/large_UxQygYomm6WB4rajgZvE7bhVRzPheL.jpg",
              "author": {
                "role": "admin",
                "verified": false,
                "_id": "5edf4ca2b0a29c04405d95b0",
                "name": "Administrador (JOSE)",
                "email": "admin@admin.com",
                "verification": "22aabc54-24ee-4f62-8501-a746c34a7449",
                "createdAt": "2020-06-09T08:47:30.114Z",
                "updatedAt": "2020-06-10T09:13:06.122Z",
                "tenantId": "test",
                "deleted": false,
                "deletedAt": null
              },
              "createdAt": "2020-06-10T10:27:32.322Z",
              "updatedAt": "2020-06-10T10:27:32.322Z",
              "deleted": false,
              "deletedAt": null,
              "tenantId": "test"
            }
          ],
          "name": "33r3r3r",
          "prices": [
            {
              "amount": 3434.34
            }
          ],
          "measures": "",
          "categories": [],
          "tag": [],
          "sku": "343434",
          "description": "<p>33r3r3r33r3r3r33r3r3r33r3r3r33r3r3r</p>",
          "author": "5edf4ca2b0a29c04405d95b0",
          "createdAt": "2020-06-09T14:56:22.848Z",
          "updatedAt": "2020-06-10T10:27:32.513Z",
          "qty": 0
        },
        {
          "_id": "5edfa3239eaa3501b874293d",
          "gallery": [],
          "name": "33r3r3r33r3r3r33r3r3r33r3r3r33r3r3r33r3r3r",
          "prices": [
            {
              "amount": 3434.34
            }
          ],
          "measures": "",
          "categories": [],
          "tag": [],
          "sku": "erere",
          "description": "<p>33r3r3r33r3r3r33r3r3r33r3r3r33r3r3r</p>",
          "author": "5edf4ca2b0a29c04405d95b0",
          "createdAt": "2020-06-09T14:56:35.263Z",
          "updatedAt": "2020-06-09T14:56:35.263Z",
          "qty": 0
        },
        {
          "_id": "5edf5cd117e4bf4704def96a",
          "gallery": [],
          "name": "TESTET",
          "prices": [
            {
              "amount": 33.33
            }
          ],
          "measures": "",
          "categories": [],
          "tag": [],
          "sku": "er",
          "description": "<p>TESTETTESTETTESTETTESTETTESTETTESTET</p>",
          "author": "5edf4ca2b0a29c04405d95b0",
          "createdAt": "2020-06-09T09:56:33.431Z",
          "updatedAt": "2020-06-09T09:56:33.431Z",
          "qty": 0
        }
      ],
      users: [
        {
          "_id": "5edf4ca2b0a29c04405d95b0",
          "role": "admin",
          "verified": false,
          "name": "Administrador (JOSE)",
          "email": "admin@admin.com",
          "verification": "22aabc54-24ee-4f62-8501-a746c34a7449",
          "createdAt": "2020-06-09T08:47:30.114Z",
          "updatedAt": "2020-06-11T09:29:58.022Z",
          "tenantId": "test",
          "deleted": false,
          "deletedAt": null
        }
      ],
      deposits: [
        {
          "_id": "5edf8df49eaa3501b87428dd",
          "name": "fefefef",
          "manager": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null,
            "router": [
              "/",
              "deposits",
              "5edf84159eaa3501b87428d0"
            ]
          },
          "tag": [],
          "phone": "5343",
          "address": "faefaef",
          "description": "",
          "createdAt": "2020-06-09T13:26:12.033Z",
          "updatedAt": "2020-06-09T13:26:12.033Z",
          "tenantId": "test",
          "deleted": false,
          "deletedAt": null
        },
        {
          "_id": "5edf8ded9eaa3501b87428dc",
          "name": "DEposito",
          "manager": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null,
            "router": [
              "/",
              "deposits",
              "5edf84159eaa3501b87428d0"
            ]
          },
          "tag": [],
          "phone": "34343434",
          "address": "okfokoefk",
          "description": "",
          "createdAt": "2020-06-09T13:26:05.953Z",
          "updatedAt": "2020-06-09T13:26:05.953Z",
          "tenantId": "test",
          "deleted": false,
          "deletedAt": null
        }
      ],
      providers: [
        {
          "_id": "5edf8b7a9eaa3501b87428d5",
          "name": "lllllk",
          "address": "lklklk, lklkl",
          "manager": {
            "_id": "5edf84159eaa3501b87428d0",
            "role": "manager",
            "verified": false,
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "trace": "",
          "phone": "04247494491",
          "email": "demo9@demo9.com",
          "tag": [],
          "description": "wfwfwfwf",
          "createdAt": "2020-06-09T13:15:38.525Z",
          "updatedAt": "2020-06-09T13:15:38.525Z",
          "tenantId": "test",
          "deleted": false,
          "deletedAt": null
        },
        {
          "_id": "5edf842a9eaa3501b87428d1",
          "name": "MAKRO",
          "address": "Calle de María Juana, 22",
          "manager": {
            "role": "manager",
            "verified": false,
            "_id": "5edf84159eaa3501b87428d0",
            "name": "Armena",
            "lastName": "Zambrano",
            "nie": "34343",
            "email": "leiferfff33@gmail.com",
            "phone": "4343433",
            "address": "Urb VIlla del Edcucado",
            "verification": "7af7d613-07c9-443f-9291-ed7ffc78a1a7",
            "createdAt": "2020-06-09T12:44:05.624Z",
            "updatedAt": "2020-06-09T12:44:05.624Z",
            "tenantId": "test",
            "deleted": false,
            "deletedAt": null
          },
          "trace": "",
          "phone": "+34691015468",
          "email": "info@macro.com",
          "tag": [],
          "description": "",
          "createdAt": "2020-06-09T12:44:26.682Z",
          "updatedAt": "2020-06-09T12:44:26.682Z",
          "tenantId": "test",
          "deleted": false,
          "deletedAt": null
        }
      ]
    }
  }

}
