import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import arabicLanguage from "../../assets/i18n/ar.json";
import defaultLanguage from "../../assets/i18n/en.json";

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  currentLang: string = 'en';
  constructor(
    private translate: TranslateService
  ) { }

  getDefaultLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    return language;
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  setLanguage(istrue) {
    if (!istrue) {
      this.translate.setTranslation('en', defaultLanguage);
      this.translate.setDefaultLang('en');
      this.currentLang = 'en';
    }
    else {
      this.translate.setTranslation('ar', arabicLanguage);
      this.translate.setDefaultLang('ar');
      this.currentLang = 'ar';
    }
  }
}
