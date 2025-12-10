import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './components/app/app.component';

import { MenuItem } from '@meadsoft/restaurant-catalog';

const menuItem: MenuItem = {
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    price: 0.0,
    isFavorite: false,
    isActive: false,
    createdDate: new Date(),
    updatedDate: new Date(),
    createdById: '',
    updatedById: '',
};
console.log(menuItem);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err),
);
