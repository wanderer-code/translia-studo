// ============================================================================
// 2. COMPLETE ALIGNED BILINGUAL DATASETS (Lesson 2: 37 Segs & Lesson 3: 49 Segs)
// ============================================================================

const LESSON_2_SEGMENTS = [
  {
    id: 'seg-1',
    enId: 'en-1',
    faId: 'fa-1',
    index: 1,
    sourcePage: 1,
    english: 'Lesson 2',
    rawPersian: 'درس ۲',
    editedPersian: 'درس ۲',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-2',
    enId: 'en-2',
    faId: 'fa-2',
    index: 2,
    sourcePage: 1,
    english: "Don't be a sucker",
    rawPersian: 'ساده‌لوح نباشید',
    editedPersian: 'ساده‌لوح نباشید',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-3',
    enId: 'en-3',
    faId: 'fa-3',
    index: 3,
    sourcePage: 1,
    english:
      'Career criminals Alex and Bob are collectively charged with a crime and held in separate cells, with no way of meeting or communicating. This is what they know:',
    rawPersian:
      'تبهکاران حرفه‌ای، الکس و باب، مشترکاً به ارتکاب جرمی متهم شده و در سلول‌هایی جداگانه نگه داشته می‌شوند، بی‌آنکه هیچ راهی برای ملاقات یا برقراری ارتباط با یکدیگر داشته باشند. آنچه آن‌ها می‌دانند از این قرار است:',
    editedPersian:
      'تبهکاران حرفه‌ای، الکس و باب، مشترکاً به ارتکاب جرمی متهم شده و در سلول‌هایی جداگانه نگه داشته می‌شوند، بی‌آنکه هیچ راهی برای ملاقات یا برقراری ارتباط با یکدیگر داشته باشند. آنچه آن‌ها می‌دانند از این قرار است:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-4',
    enId: 'en-4',
    faId: 'fa-4',
    index: 4,
    sourcePage: 1,
    english:
      "• if one of them confesses to the crime and the other does not, the confessor will be freed and the other will be jailed for three years (in the UK, we call this 'turning King's evidence' - it tends to make you unpopular with other villains);",
    rawPersian:
      '• اگر یکی از آن دو به جرم اعتراف کند و دیگری اعتراف نکند، فرد اعتراف‌کننده آزاد خواهد شد و دیگری به مدت سه سال به زندان خواهد افتاد (در بریتانیا، به این کار «شهادت دادن به نفع پادشاه» می‌گوییم – کاری که معمولاً شما را در میان سایر تبهکاران منفور می‌سازد)؛',
    editedPersian:
      '• اگر یکی از آن دو به جرم اعتراف کند و دیگری اعتراف نکند، فرد اعتراف‌کننده آزاد خواهد شد و دیگری به مدت سه سال به زندان خواهد افتاد (در بریتانیا، به این کار «شهادت دادن به نفع پادشاه» می‌گوییم – کاری که معمولاً شما را در میان سایر تبهکاران منفور می‌سازد)؛',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-5',
    enId: 'en-5',
    faId: 'fa-5',
    index: 5,
    sourcePage: 1,
    english: '• if both confess, each will be jailed for two years; and',
    rawPersian: '• اگر هر دو اعتراف کنند، هر یک به مدت دو سال به زندان خواهد افتاد؛ و',
    editedPersian: '• اگر هر دو اعتراف کنند، هر یک به مدت دو سال به زندان خواهد افتاد؛ و',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-6',
    enId: 'en-6',
    faId: 'fa-6',
    index: 6,
    sourcePage: 1,
    english: '• if neither confesses, each will be jailed for one year.',
    rawPersian: '• اگر هیچ‌یک اعتراف نکند، هر یک به مدت یک سال به زندان خواهد افتاد.',
    editedPersian: '• اگر هیچ‌یک اعتراف نکند، هر یک به مدت یک سال به زندان خواهد افتاد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-7',
    enId: 'en-7',
    faId: 'fa-7',
    index: 7,
    sourcePage: 1,
    english: 'The prisoners must each decide whether to keep quiet or to confess to the crime.',
    rawPersian: 'هر یک از دو زندانی باید تصمیم بگیرد که سکوت اختیار کند یا به جرم اعتراف نماید.',
    editedPersian: 'هر یک از دو زندانی باید تصمیم بگیرد که سکوت اختیار کند یا به جرم اعتراف نماید.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-8',
    enId: 'en-8',
    faId: 'fa-8',
    index: 8,
    sourcePage: 1,
    english:
      'Alex and Bob are hard-boiled criminals, and the only thing they care about is minimizing the amount of time they spend in prison: nothing else matters to them.',
    rawPersian:
      'الکس و باب تبهکارانی سرسخت و کارکشته‌اند، و تنها چیزی که برایشان اهمیت دارد به کمینه رساندنِ مدت‌زمانی است که در زندان سپری می‌کنند: هیچ چیز دیگری برایشان مهم نیست.',
    editedPersian:
      'الکس و باب تبهکارانی سرسخت و کارکشته‌اند، و تنها چیزی که برایشان اهمیت دارد به کمینه رساندنِ مدت‌زمانی است که در زندان سپری می‌کنند: هیچ چیز دیگری برایشان مهم نیست.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-9',
    enId: 'en-9',
    faId: 'fa-9',
    index: 9,
    sourcePage: 1,
    english: 'How should they choose whether to confess or to keep quiet?',
    rawPersian: 'آن‌ها چگونه باید میان اعتراف کردن یا سکوت اختیار کردن دست به انتخاب بزنند؟',
    editedPersian: 'آن‌ها چگونه باید میان اعتراف کردن یا سکوت اختیار کردن دست به انتخاب بزنند؟',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-10',
    enId: 'en-10',
    faId: 'fa-10',
    index: 10,
    sourcePage: 2,
    english:
      "This is the Prisoner's Dilemma: the most famous and, perhaps, the most infamous member of the game theory canon. Its notoriety derives from the fact that, as we will see, the game-theoretic analysis of the Prisoner's Dilemma confidently advocates a course of action that runs strongly counter to our common-sense assessment of what is reasonable in this case. This has led many people to conclude that the game-theoretic analysis must be wrong, and it has even been taken as evidence that the entire field of game theory itself is fundamentally flawed. As a consequence, probably more nonsense has been written about the Prisoner's Dilemma than on any other subject in game theory. If the Prisoner's Dilemma were just an abstract mathematical invention, then I daresay nobody but insiders would have heard of it, still less have an opinion about it. But it is far from being an abstract mathematical puzzle. The reason we care about it is that it is ubiquitous: versions of the Prisoner's Dilemma are all around us in the real world, relating to some of the most fundamental problems that we face in society and international affairs. If we can't safely navigate through this most classic of problems, then we may all suffer as a consequence.",
    rawPersian:
      'این معمای زندانی است: مشهورترین و، شاید، بدنام‌ترین عضو در مجموعهٔ آثار کلاسیکِ نظریهٔ بازی‌ها. بدنامیِ آن از این واقعیت سرچشمه می‌گیرد که، همان‌طور که خواهیم دید، تحلیلِ مبتنی بر نظریهٔ بازی‌ها از معمای زندانی با اطمینان تمام شیوه‌ای از عمل را توصیه می‌کند که به‌شدت در تقابل با ارزیابیِ فهم متعارف ما از امر معقول در این مورد قرار دارد. همین امر بسیاری از افراد را به این نتیجه‌گیری سوق داده است که تحلیلِ نظریهٔ بازی‌ها لابد نادرست است، و حتی به‌عنوان شاهدی بر این گرفته شده که کلیتِ حوزهٔ نظریهٔ بازی‌ها خود بنیاداً معیوب است. در نتیجه، احتمالاً یاوه‌گویی‌هایی که دربارهٔ معمای زندانی نوشته شده بیش از هر موضوع دیگری در نظریهٔ بازی‌هاست. اگر معمای زندانی صرفاً یک ابداع ریاضیِ انتزاعی می‌بود، به‌جرئت می‌توانم بگویم هیچ‌کس جز اهل فن نامی از آن نشنیده بود، چه رسد به آنکه نظری درباره‌اش داشته باشد. اما این مسئله به هیچ روی یک معمای ریاضی انتزاعی نیست. دلیل اینکه به آن اهمیت می‌دهیم آن است که در همه‌جا حضور دارد: نسخه‌های گوناگونِ معمای زندانی در سرتاسر دنیای واقعی پیرامون ما یافت می‌شوند و با برخی از بنیادی‌ترین مسائلی که در جامعه و امور بین‌الملل با آن‌ها روبه‌رو هستیم پیوند دارند. اگر نتوانیم به‌سلامت از میان این کلاسیک‌ترینِ مسئله‌ها عبور کنیم، آنگاه ممکن است همگی ما در نتیجهٔ آن آسیب ببینیم.',
    editedPersian:
      'این معمای زندانی است: مشهورترین و، شاید، بدنام‌ترین عضو در مجموعهٔ آثار کلاسیکِ نظریهٔ بازی‌ها. بدنامیِ آن از این واقعیت سرچشمه می‌گیرد که، همان‌طور که خواهیم دید، تحلیلِ مبتنی بر نظریهٔ بازی‌ها از معمای زندانی با اطمینان تمام شیوه‌ای از عمل را توصیه می‌کند که به‌شدت در تقابل با ارزیابیِ فهم متعارف ما از امر معقول در این مورد قرار دارد. همین امر بسیاری از افراد را به این نتیجه‌گیری سوق داده است که تحلیلِ نظریهٔ بازی‌ها لابد نادرست است، و حتی به‌عنوان شاهدی بر این گرفته شده که کلیتِ حوزهٔ نظریهٔ بازی‌ها خود بنیاداً معیوب است. در نتیجه، احتمالاً یاوه‌گویی‌هایی که دربارهٔ معمای زندانی نوشته شده بیش از هر موضوع دیگری در نظریهٔ بازی‌هاست. اگر معمای زندانی صرفاً یک ابداع ریاضیِ انتزاعی می‌بود، به‌جرئت می‌توانم بگویم هیچ‌کس جز اهل فن نامی از آن نشنیده بود، چه رسد به آنکه نظری درباره‌اش داشته باشد. اما این مسئله به هیچ روی یک معمای ریاضی انتزاعی نیست. دلیل اینکه به آن اهمیت می‌دهیم آن است که در همه‌جا حضور دارد: نسخه‌های گوناگونِ معمای زندانی در سرتاسر دنیای واقعی پیرامون ما یافت می‌شوند و با برخی از بنیادی‌ترین مسائلی که در جامعه و امور بین‌الملل با آن‌ها روبه‌رو هستیم پیوند دارند. اگر نتوانیم به‌سلامت از میان این کلاسیک‌ترینِ مسئله‌ها عبور کنیم، آنگاه ممکن است همگی ما در نتیجهٔ آن آسیب ببینیم.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-11',
    enId: 'en-11',
    faId: 'fa-11',
    index: 11,
    sourcePage: 2,
    english:
      "Let's begin by looking at how game theorists analyse the scenario. Put yourself in Alex's place, and consider the following reasoning:",
    rawPersian:
      'بیایید کار را با بررسی چگونگی تحلیل این سناریو توسط نظریه‌پردازان بازی‌ها آغاز کنیم. خودتان را به جای الکس بگذارید و استدلال زیر را در نظر بگیرید:',
    editedPersian:
      'بیایید کار را با بررسی چگونگی تحلیل این سناریو توسط نظریه‌پردازان بازی‌ها آغاز کنیم. خودتان را به جای الکس بگذارید و استدلال زیر را در نظر بگیرید:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-12',
    enId: 'en-12',
    faId: 'fa-12',
    index: 12,
    sourcePage: 2,
    english:
      '• Suppose Bob were to confess. Then I have a choice of confessing, in which case we both go to jail for two years, or keeping quiet, in which case I would go to jail for three years. Clearly, serving two years is better than serving three: so if Bob confesses, the best thing for me to do is confess.',
    rawPersian:
      '• فرض کنید باب بنا را بر اعتراف بگذارد. در این صورت من میان اعتراف کردن، که در آن حالت هر دو برای دو سال به زندان می‌رویم، یا سکوت اختیار کردن، که در آن حالت من برای سه سال به زندان خواهم رفت، حق انتخاب دارم. روشن است که گذراندن دو سال حبس بهتر از گذراندن سه سال است: بنابراین اگر باب اعتراف کند، بهترین کار برای من اعتراف کردن است.',
    editedPersian:
      '• فرض کنید باب بنا را بر اعتراف بگذارد. در این صورت من میان اعتراف کردن، که در آن حالت هر دو برای دو سال به زندان می‌رویم، یا سکوت اختیار کردن، که در آن حالت من برای سه سال به زندان خواهم رفت، حق انتخاب دارم. روشن است که گذراندن دو سال حبس بهتر از گذراندن سه سال است: بنابراین اگر باب اعتراف کند، بهترین کار برای من اعتراف کردن است.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-13',
    enId: 'en-13',
    faId: 'fa-13',
    index: 13,
    sourcePage: 2,
    english:
      '• Suppose Bob were to keep quiet. Then I have a choice of confessing and going free or keeping quiet and serving one year in jail. In this case, the best thing for me would be to go free so if Bob were to keep quiet, I would do best by confessing.',
    rawPersian:
      '• فرض کنید باب بنا را بر سکوت اختیار کردن بگذارد. در این صورت من میان اعتراف کردن و آزاد شدن، یا سکوت اختیار کردن و گذراندن یک سال حبس در زندان، حق انتخاب دارم. در این حالت، بهترین چیز برای من آزاد شدن خواهد بود – بنابراین اگر قرار باشد باب سکوت اختیار کند، بهترین عملکرد من اعتراف کردن است.',
    editedPersian:
      '• فرض کنید باب بنا را بر سکوت اختیار کردن بگذارد. در این صورت من میان اعتراف کردن و آزاد شدن، یا سکوت اختیار کردن و گذراندن یک سال حبس در زندان، حق انتخاب دارم. در این حالت، بهترین چیز برای من آزاد شدن خواهد بود – بنابراین اگر قرار باشد باب سکوت اختیار کند، بهترین عملکرد من اعتراف کردن است.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-14',
    enId: 'en-14',
    faId: 'fa-14',
    index: 14,
    sourcePage: 2,
    english:
      '• So, no matter what Bob chooses to do, the best choice for me would be to confess.',
    rawPersian:
      '• بنابراین، صرف‌نظر از اینکه باب چه کاری را برای انجام دادن انتخاب کند، بهترین انتخاب برای من اعتراف کردن خواهد بود.',
    editedPersian:
      '• بنابراین، صرف‌نظر از اینکه باب چه کاری را برای انجام دادن انتخاب کند، بهترین انتخاب برای من اعتراف کردن خواهد بود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-15',
    enId: 'en-15',
    faId: 'fa-15',
    index: 15,
    sourcePage: 2,
    english:
      "Based on this analysis, it seems very clear what Alex should do: confess. Alex has discovered that confessing is what game theorists call a dominant strategy. A dominant strategy is a choice that would be the best thing to do no matter what your counterpart does. From a game theory standpoint, the presence of such a choice is about as transparent and clear cut as it gets when it comes to deciding what to do: if a player has a dominant strategy available, then it could never be beneficial to choose anything else. Observe that the Prisoner's Dilemma is symmetric: the analysis from Bob's point of view is the same, and so Bob will conclude that confession is a dominant strategy for him also. In this case, we say that we have a dominant strategy equilibrium. It is called an equilibrium because the outcome is stable against the forces of self-interest - nobody has any incentive to move away from this outcome, because if they did, by the argument above, they could never be better off and may end up worse off.",
    rawPersian:
      'بر پایهٔ این تحلیل، کاملاً روشن به نظر می‌رسد که الکس چه باید بکند: اعتراف کند. الکس کشف کرده است که اعتراف کردن همان چیزی است که نظریه‌پردازان بازی‌ها به آن راهبرد غالب می‌گویند. راهبرد غالب انتخابی است که صرف‌نظر از اینکه طرف مقابلتان چه کند، بهترین کار ممکن خواهد بود. از دیدگاه نظریهٔ بازی‌ها، وجود چنین انتخابی در تصمیم‌گیری دربارهٔ اینکه چه باید کرد، شفاف‌ترین و سرراست‌ترین وضعیت ممکن است: اگر بازیکنی راهبرد غالبی در اختیار داشته باشد، انتخاب کردن هر گزینهٔ دیگری هرگز نمی‌تواند سودمند باشد. دقت کنید که معمای زندانی متقارن است: تحلیل از دیدگاه باب نیز دقیقاً به همین صورت است، و بنابراین باب نیز نتیجه خواهد گرفت که اعتراف کردن برای او هم یک راهبرد غالب است. در این حالت، می‌گوییم که یک تعادل راهبرد غالب داریم. این وضعیت از آن رو تعادل نامیده می‌شود که پیامدِ حاصل در برابر نیروهای نفع شخصی پایدار است – هیچ‌کس هیچ انگیزه‌ای برای فاصله گرفتن از این پیامد ندارد، زیرا اگر چنین کند، بنا بر استدلال بالا، هرگز نمی‌تواند به وضعیت بهتری برسد و چه‌بسا در وضعیت بدتری قرار بگیرد.',
    editedPersian:
      'بر پایهٔ این تحلیل، کاملاً روشن به نظر می‌رسد که الکس چه باید بکند: اعتراف کند. الکس کشف کرده است که اعتراف کردن همان چیزی است که نظریه‌پردازان بازی‌ها به آن راهبرد غالب می‌گویند. راهبرد غالب انتخابی است که صرف‌نظر از اینکه طرف مقابلتان چه کند، بهترین کار ممکن خواهد بود. از دیدگاه نظریهٔ بازی‌ها، وجود چنین انتخابی در تصمیم‌گیری دربارهٔ اینکه چه باید کرد، شفاف‌ترین و سرراست‌ترین وضعیت ممکن است: اگر بازیکنی راهبرد غالبی در اختیار داشته باشد، انتخاب کردن هر گزینهٔ دیگری هرگز نمی‌تواند سودمند باشد. دقت کنید که معمای زندانی متقارن است: تحلیل از دیدگاه باب نیز دقیقاً به همین صورت است، و بنابراین باب نیز نتیجه خواهد گرفت که اعتراف کردن برای او هم یک راهبرد غالب است. در این حالت، می‌گوییم که یک تعادل راهبرد غالب داریم. این وضعیت از آن رو تعادل نامیده می‌شود که پیامدِ حاصل در برابر نیروهای نفع شخصی پایدار است – هیچ‌کس هیچ انگیزه‌ای برای فاصله گرفتن از این پیامد ندارد، زیرا اگر چنین کند، بنا بر استدلال بالا، هرگز نمی‌تواند به وضعیت بهتری برسد و چه‌بسا در وضعیت بدتری قرار بگیرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-16',
    enId: 'en-16',
    faId: 'fa-16',
    index: 16,
    sourcePage: 3,
    english:
      "The result of our analysis is thus that both players will confess to the crime and, as a result, both will serve two years in jail. So, imagine Alex and Bob pacing the exercise yard in Wormwood Scrubs, or Strangeways, or one of our other colourfully named British prisons. 'But this doesn't make any sense,' says Alex. 'The game theory experts told us to confess and so we're doing two years in here; but if we'd both just kept quiet, then we'd both have been better off - we'd both only be in here for a year!' Alex has put his finger on why the Prisoner's Dilemma is called a dilemma: game-theoretic analysis gives a very strong recommendation (as strong a piece of advice as game theory can provide) and yet this leads to an outcome that is worse for all players than an outcome they could have obtained had they all chosen differently.",
    rawPersian:
      'بنابراین نتیجهٔ تحلیل ما این است که هر دو بازیکن به جرم اعتراف خواهند کرد و در نتیجه، هر دو به مدت دو سال در زندان حبس خواهند کشید. پس تصور کنید الکس و باب در حیاط هواخوریِ زندان ورم‌وود اسکرابز، یا استرنج‌ویز، یا یکی دیگر از زندان‌های بریتانیا با آن نام‌های رنگارنگشان قدم می‌زنند. الکس می‌گوید: «اما این اصلاً منطقی نیست. کارشناسان نظریهٔ بازی‌ها به ما گفتند اعتراف کنیم و به همین خاطر داریم اینجا دو سال حبس می‌کشیم؛ اما اگر هر دویمان فقط سکوت کرده بودیم، وضع هر دویمان بهتر می‌شد – هر دویمان فقط یک سال اینجا می‌ماندیم!» الکس دقیقاً دست روی نکته‌ای گذاشته است که نشان می‌دهد چرا معمای زندانی را یک معما یا تنگنا می‌نامند: تحلیل مبتنی بر نظریهٔ بازی‌ها یک توصیهٔ بسیار نیرومند ارائه می‌دهد (نیرومندترین پندی که نظریهٔ بازی‌ها می‌تواند عرضه کند) و با این حال، این توصیه به پیامدی می‌انجامد که برای تمامی بازیکنان بدتر از پیامدی است که اگر همگی طور دیگری انتخاب کرده بودند می‌توانستند به دست آورند.',
    editedPersian:
      'بنابراین نتیجهٔ تحلیل ما این است که هر دو بازیکن به جرم اعتراف خواهند کرد و در نتیجه، هر دو به مدت دو سال در زندان حبس خواهند کشید. پس تصور کنید الکس و باب در حیاط هواخوریِ زندان ورم‌وود اسکرابز، یا استرنج‌ویز، یا یکی دیگر از زندان‌های بریتانیا با آن نام‌های رنگارنگشان قدم می‌زنند. الکس می‌گوید: «اما این اصلاً منطقی نیست. کارشناسان نظریهٔ بازی‌ها به ما گفتند اعتراف کنیم و به همین خاطر داریم اینجا دو سال حبس می‌کشیم؛ اما اگر هر دویمان فقط سکوت کرده بودیم، وضع هر دویمان بهتر می‌شد – هر دویمان فقط یک سال اینجا می‌ماندیم!» الکس دقیقاً دست روی نکته‌ای گذاشته است که نشان می‌دهد چرا معمای زندانی را یک معما یا تنگنا می‌نامند: تحلیل مبتنی بر نظریهٔ بازی‌ها یک توصیهٔ بسیار نیرومند ارائه می‌دهد (نیرومندترین پندی که نظریهٔ بازی‌ها می‌تواند عرضه کند) و با این حال، این توصیه به پیامدی می‌انجامد که برای تمامی بازیکنان بدتر از پیامدی است که اگر همگی طور دیگری انتخاب کرده بودند می‌توانستند به دست آورند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-17',
    enId: 'en-17',
    faId: 'fa-17',
    index: 17,
    sourcePage: 3,
    english:
      "At first blush, therefore, it seems that game theory is giving Alex and Bob very bad advice indeed. Well, nothing compels them to follow my advice: they are free to choose whatever they want. So why don't they just both choose to keep quiet? The problem is that if, say, Bob was to remain silent, then Alex's best choice would be to confess - remember, the only thing that they care about is minimizing the time they spend in prison. This would give Alex the best possible outcome (going free) but would result in the worst possible outcome for Bob - the 'sucker's payoff' - three years in jail.",
    rawPersian:
      'از این رو، در نگاه اول، چنین به نظر می‌رسد که نظریهٔ بازی‌ها پندِ واقعاً بسیار بدی به الکس و باب می‌دهد. خب، هیچ‌چیز آن‌ها را مجبور به پیروی از پند من نمی‌کند: آن‌ها آزادند هر آنچه می‌خواهند برگزینند. پس چرا خیلی ساده هر دو تصمیم نمی‌گیرند که سکوت اختیار کنند؟ مشکل اینجاست که اگر، برای مثال، قرار بود باب سکوت کند، آنگاه بهترین انتخاب الکس اعتراف کردن می‌بود – به یاد داشته باشید، تنها چیزی که برایشان اهمیت دارد به کمینه رساندن زمانی است که در زندان سپری می‌کنند. این کار بهترین پیامد ممکن (آزاد شدن) را نصیب الکس می‌کرد، اما برای باب به بدترین پیامد ممکن – یعنی «بازدهی ساده‌لوح» – یا همان سه سال زندان می‌انجامید.',
    editedPersian:
      'از این رو، در نگاه اول، چنین به نظر می‌رسد که نظریهٔ بازی‌ها پندِ واقعاً بسیار بدی به الکس و باب می‌دهد. خب، هیچ‌چیز آن‌ها را مجبور به پیروی از پند من نمی‌کند: آن‌ها آزادند هر آنچه می‌خواهند برگزینند. پس چرا خیلی ساده هر دو تصمیم نمی‌گیرند که سکوت اختیار کنند؟ مشکل اینجاست که اگر، برای مثال، قرار بود باب سکوت کند، آنگاه بهترین انتخاب الکس اعتراف کردن می‌بود – به یاد داشته باشید، تنها چیزی که برایشان اهمیت دارد به کمینه رساندن زمانی است که در زندان سپری می‌کنند. این کار بهترین پیامد ممکن (آزاد شدن) را نصیب الکس می‌کرد، اما برای باب به بدترین پیامد ممکن – یعنی «بازدهی ساده‌لوح» – یا همان سه سال زندان می‌انجامید.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-18',
    enId: 'en-18',
    faId: 'fa-18',
    index: 18,
    sourcePage: 3,
    english:
      "Of course, if there were some way in which Alex and Bob could make an agreement that would bind them both to keeping quiet, then the dilemma evaporates. But if they can do that, then they are not playing the Prisoner's Dilemma: we explicitly ruled out any way of meeting or communicating. In the real world, of course, binding agreements between people and organizations are often possible, for example in the form of legal contracts. As in the Prisoner's Dilemma, the possibility of binding agreements makes outcomes feasible that would be impossible if players must make decisions and act alone. Game theory with the possibility of binding agreements is called cooperative game theory, and we will encounter it later in this book. Unfortunately for Alex and Bob, however, they are playing the Prisoner's Dilemma, in which there can be no binding agreement.",
    rawPersian:
      'البته، اگر راهی وجود می‌داشت که از طریق آن الکس و باب می‌توانستند توافقی بکنند که هر دو را ملزم به سکوت اختیار کردن سازد، آنگاه این معما دود می‌شد و به هوا می‌رفت. اما اگر بتوانند چنین کاری بکنند، دیگر مشغول انجام بازی معمای زندانی نیستند: ما صراحتاً هرگونه راهی را برای ملاقات یا برقراری ارتباط منتفی دانستیم. البته در دنیای واقعی، توافق‌های الزام‌آور میان انسان‌ها و سازمان‌ها اغلب امکان‌پذیرند، برای نمونه در قالب قراردادهای حقوقی. درست مانند معمای زندانی، امکانِ بستن توافق‌های الزام‌آور پیامدهایی را شدنی می‌سازد که اگر بازیکنان ناگزیر بودند به‌تنهایی تصمیم بگیرند و عمل کنند ناممکن می‌بودند. نظریهٔ بازی‌ها همراه با امکانِ توافق‌های الزام‌آور، نظریهٔ بازی‌های همکارانه نامیده می‌شود، و در ادامهٔ این کتاب با آن روبه‌رو خواهیم شد. اما متأسفانه از بخت بدِ الکس و باب، آن‌ها مشغول انجام بازی معمای زندانی هستند که در آن هیچ توافق الزام‌آوری نمی‌تواند وجود داشته باشد.',
    editedPersian:
      'البته، اگر راهی وجود می‌داشت که از طریق آن الکس و باب می‌توانستند توافقی بکنند که هر دو را ملزم به سکوت اختیار کردن سازد، آنگاه این معما دود می‌شد و به هوا می‌رفت. اما اگر بتوانند چنین کاری بکنند، دیگر مشغول انجام بازی معمای زندانی نیستند: ما صراحتاً هرگونه راهی را برای ملاقات یا برقراری ارتباط منتفی دانستیم. البته در دنیای واقعی، توافق‌های الزام‌آور میان انسان‌ها و سازمان‌ها اغلب امکان‌پذیرند، برای نمونه در قالب قراردادهای حقوقی. درست مانند معمای زندانی، امکانِ بستن توافق‌های الزام‌آور پیامدهایی را شدنی می‌سازد که اگر بازیکنان ناگزیر بودند به‌تنهایی تصمیم بگیرند و عمل کنند ناممکن می‌بودند. نظریهٔ بازی‌ها همراه با امکانِ توافق‌های الزام‌آور، نظریهٔ بازی‌های همکارانه نامیده می‌شود، و در ادامهٔ این کتاب با آن روبه‌رو خواهیم شد. اما متأسفانه از بخت بدِ الکس و باب، آن‌ها مشغول انجام بازی معمای زندانی هستند که در آن هیچ توافق الزام‌آوری نمی‌تواند وجود داشته باشد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-19',
    enId: 'en-19',
    faId: 'fa-19',
    index: 19,
    sourcePage: 4,
    english:
      "The Prisoner's Dilemma, then, appears to raise questions about game-theoretic analysis. And it's important to confront these questions because our world is full of Prisoner's Dilemmas, some of which relate to issues of global concern possibly even up to questions about the continued existence of humanity.",
    rawPersian:
      'بنابراین به نظر می‌رسد که معمای زندانی پرسش‌هایی را دربارهٔ تحلیل مبتنی بر نظریهٔ بازی‌ها برمی‌انگیزد. و رویارویی با این پرسش‌ها از آن رو اهمیت دارد که جهان ما آکنده از معماهای زندانی است که برخی از آن‌ها به مسائل مورد دغغدغهٔ جهانی مربوط می‌شوند – و چه‌بسا حتی تا پرسش‌هایی دربارهٔ تداوم بقای بشریت پیش می‌روند.',
    editedPersian:
      'بنابراین به نظر می‌رسد که معمای زندانی پرسش‌هایی را دربارهٔ تحلیل مبتنی بر نظریهٔ بازی‌ها برمی‌انگیزد. و رویارویی با این پرسش‌ها از آن رو اهمیت دارد که جهان ما آکنده از معماهای زندانی است که برخی از آن‌ها به مسائل مورد دغدغهٔ جهانی مربوط می‌شوند – و چه‌بسا حتی تا پرسش‌هایی دربارهٔ تداوم بقای بشریت پیش می‌روند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-20',
    enId: 'en-20',
    faId: 'fa-20',
    index: 20,
    sourcePage: 4,
    english:
      "The Tragedy of the Commons is an example of a Prisoner's Dilemma that has a lot to say about the parlous state of our global environment and the challenges we face if we are serious about improving it. The idea was first described by the American ecologist Garrett James Hardin in a 1968 essay, in which he introduced the scenario through the idea of common land in a village. The land can be used by villagers to graze their livestock. If the villagers exercise moderation, then the land remains in good shape and they can all get some value out of it; but if they all overuse it, then it becomes of less value to everyone. More generally, any scenario in which there is some resource that can be shared but which degrades if it is overused is a Tragedy of the Commons. This is a Prisoner's Dilemma because individual overgrazing takes the role of confession, while moderation takes the role of keeping quiet. The problem is that from any individual villager's point of view the best outcome possible is for them to sneakily overgraze, while the other villagers exercise moderation. In this case, the land stays in good shape while our cheating villager exploits the common resource at will. But if everyone overgrazes, then the commons are degraded, and everyone ends up worse off as a consequence.",
    rawPersian:
      'تراژدی منابع مشترک نمونه‌ای از یک معمای زندانی است که حرف‌های بسیاری دربارهٔ وضعیت وخیم و پرمخاطرهٔ محیط زیست جهانی ما و چالش‌هایی که اگر در بهبود آن جدی باشیم پیش رو داریم، برای گفتن دارد. این ایده نخستین بار توسط بوم‌شناس آمریکایی، گرت جیمز هاردین، در جستاری در سال ۱۹۶۸ تشریح شد،۸ که در آن وی این سناریو را از رهگذر ایدهٔ زمین مشترک (مرتع عمومی) در یک روستا معرفی کرد. روستاییان می‌توانند از این زمین برای چراندن دام‌های خود استفاده کنند. اگر روستاییان میانه‌روی پیشه کنند، زمین در وضعیت خوبی باقی می‌ماند و همگی می‌توانند بهره‌ای از آن ببرند؛ اما اگر همگی بیش از اندازه از آن بهره‌برداری کنند، آنگاه ارزش آن برای همه کمتر می‌شود. به بیان کلی‌تر، هر سناریویی که در آن منبعی قابل اشتراک وجود داشته باشد که در صورت استفادهٔ بیش از حد رو به زوال بگذارد، یک تراژدی منابع مشترک است. این موقعیت از آن رو یک معمای زندانی است که چرای بی‌رویهٔ فردی نقش اعتراف کردن را ایفا می‌کند، در حالی که میانه‌روی نقش سکوت اختیار کردن را دارد. مشکل اینجاست که از دیدگاه هر روستاییِ منفرد، بهترین پیامد ممکن این است که زیرکانه و پنهانی بیش از حد دام بچراند، در حالی که سایر روستاییان میانه‌روی پیشه می‌کنند. در این حالت، زمین در وضعیت خوبی باقی می‌ماند در حالی که روستاییِ متقلب ما به دلخواه خود از منبع مشترک بهره‌کشی می‌کند. اما اگر همه بیش از حد دام بچرانند، آنگاه منابع مشترک تخریب می‌شوند و در نتیجه وضعیت همگان بدتر می‌شود.',
    editedPersian:
      'تراژدی منابع مشترک نمونه‌ای از یک معمای زندانی است که حرف‌های بسیاری دربارهٔ وضعیت وخیم و پرمخاطرهٔ محیط زیست جهانی ما و چالش‌هایی که اگر در بهبود آن جدی باشیم پیش رو داریم، برای گفتن دارد. این ایده نخستین بار توسط بوم‌شناس آمریکایی، گرت جیمز هاردین، در جستاری در سال ۱۹۶۸ تشریح شد،۸ که در آن وی این سناریو را از رهگذر ایدهٔ زمین مشترک (مرتع عمومی) در یک روستا معرفی کرد. روستاییان می‌توانند از این زمین برای چراندن دام‌های خود استفاده کنند. اگر روستاییان میانه‌روی پیشه کنند، زمین در وضعیت خوبی باقی می‌ماند و همگی می‌توانند بهره‌ای از آن ببرند؛ اما اگر همگی بیش از اندازه از آن بهره‌برداری کنند، آنگاه ارزش آن برای همه کمتر می‌شود. به بیان کلی‌تر، هر سناریویی که در آن منبعی قابل اشتراک وجود داشته باشد که در صورت استفادهٔ بیش از حد رو به زوال بگذارد، یک تراژدی منابع مشترک است. این موقعیت از آن رو یک معمای زندانی است که چرای بی‌رویهٔ فردی نقش اعتراف کردن را ایفا می‌کند، در حالی که میانه‌روی نقش سکوت اختیار کردن را دارد. مشکل اینجاست که از دیدگاه هر روستاییِ منفرد، بهترین پیامد ممکن این است که زیرکانه و پنهانی بیش از حد دام بچراند، در حالی که سایر روستاییان میانه‌روی پیشه می‌کنند. در این حالت، زمین در وضعیت خوبی باقی می‌ماند در حالی که روستاییِ متقلب ما به دلخواه خود از منبع مشترک بهره‌کشی می‌کند. اما اگر همه بیش از حد دام بچرانند، آنگاه منابع مشترک تخریب می‌شوند و در نتیجه وضعیت همگان بدتر می‌شود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-21',
    enId: 'en-21',
    faId: 'fa-21',
    index: 21,
    sourcePage: 4,
    english:
      'In the modern world, we see the Tragedy of the Commons play out in overfishing of international waters. A century ago the waters of the North Atlantic were teeming with cod, but, because of industrial overfishing and lack of regulation, by the 1990s the cod population had collapsed to just 1% of its pre-industrial levels. Now, in response to a situation like this, the fishing nations around the North Atlantic might sign an agreement to impose fishing quotas. If they all adhere to the quota, then the fish stocks recover and become sustainable. However, just like our sneaky medieval villagers, the best thing from the point of view of any one signatory would be to secretly ignore the quota and extract all the fish all they want, while everyone else adheres to it. If they all did that, though, then the fish population continues to plummet, and they are all worse off than if they had all exercised moderation.',
    rawPersian:
      'در جهان مدرن، به جریان افتادن تراژدی منابع مشترک را در صید بی‌رویه در آب‌های بین‌المللی می‌بینیم. یک سده پیش، آب‌های اقیانوس اطلس شمالی مملو از ماهی کاد بودند، اما به سبب صید بی‌رویهٔ صنعتی و نبود مقررات، تا دههٔ ۱۹۹۰ جمعیت ماهی کاد فروپاشید و به تنها ۱ درصدِ سطوح پیشاصنعتی خود رسید. اکنون، در واکنش به وضعیتی مانند این، کشورهای صیاد پیرامون اقیانوس اطلس شمالی ممکن است توافق‌نامه‌ای را برای اعمال سهمیه‌های صید ماهی امضا کنند. اگر همگی به سهمیه پایبند بمانند، ذخایر ماهی احیا می‌شوند و پایدار می‌گردند. با این حال، درست مانند روستاییان زیرک سده‌های میانه در مثال ما، از دیدگاه هر یک از امضاکنندگانِ منفرد بهترین کار این خواهد بود که پنهانی سهمیه را نادیده بگیرد و هر چقدر ماهی که دلش می‌خواهد صید کند، در حالی که سایرین به سهمیه پایبند می‌مانند. اما اگر همگی چنین کنند، جمعیت ماهی‌ها همچنان به سقوط آزاد خود ادامه می‌دهد و وضعیت همگی آن‌ها بدتر از حالتی می‌شود که همگی میانه‌روی پیشه کرده بودند.',
    editedPersian:
      'در جهان مدرن، به جریان افتادن تراژدی منابع مشترک را در صید بی‌رویه در آب‌های بین‌المللی می‌بینیم. یک سده پیش، آب‌های اقیانوس اطلس شمالی مملو از ماهی کاد بودند، اما به سبب صید بی‌رویهٔ صنعتی و نبود مقررات، تا دههٔ ۱۹۹۰ جمعیت ماهی کاد فروپاشید و به تنها ۱ درصدِ سطوح پیشاصنعتی خود رسید. اکنون، در واکنش به وضعیتی مانند این، کشورهای صیاد پیرامون اقیانوس اطلس شمالی ممکن است توافق‌نامه‌ای را برای اعمال سهمیه‌های صید ماهی امضا کنند. اگر همگی به سهمیه پایبند بمانند، ذخایر ماهی احیا می‌شوند و پایدار می‌گردند. با این حال، درست مانند روستاییان زیرک سده‌های میانه در مثال ما، از دیدگاه هر یک از امضاکنندگانِ منفرد بهترین کار این خواهد بود که پنهانی سهمیه را نادیده بگیرد و هر چقدر ماهی که دلش می‌خواهد صید کند، در حالی که سایرین به سهمیه پایبند می‌مانند. اما اگر همگی چنین کنند، جمعیت ماهی‌ها همچنان به سقوط آزاد خود ادامه می‌دهد و وضعیت همگی آن‌ها بدتر از حالتی می‌شود که همگی میانه‌روی پیشه کرده بودند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-22',
    enId: 'en-22',
    faId: 'fa-22',
    index: 22,
    sourcePage: 5,
    english:
      "Nuclear arms reduction treaties are also Prisoner's Dilemmas. Suppose that during the Cold War the USA and Soviet Russia had agreed to eliminate, say, 50% of their nuclear stockpile. The world would have surely been a safer place if both parties reduced their arsenal. But arguably the best thing for the USA would be if Soviet Russia got rid of their weapons while the USA secretly held on to theirs, and the best thing for Soviet Russia would be if they held on to their weapons while the USA got rid of theirs.",
    rawPersian:
      'معاهده‌های کاهش تسلیحات هسته‌ای نیز معماهای زندانی هستند. فرض کنید در دوران جنگ سرد ایالات متحدهٔ آمریکا و روسیهٔ شوروی توافق می‌کردند که، بگوییم، ۵۰ درصد از ذخایر تسلیحات هسته‌ای خود را امحا کنند. جهان بی‌گمان جای امن‌تری می‌شد اگر هر دو طرف زرادخانهٔ خود را کاهش می‌دادند. اما چه بسا بتوان گفت بهترین چیز برای ایالات متحده این می‌بود که روسیهٔ شوروی سلاح‌های خود را کنار بگذارد در حالی که ایالات متحده پنهانی سلاح‌های خود را نگه دارد، و بهترین چیز برای روسیهٔ شوروی این می‌بود که سلاح‌های خود را نگه دارد در حالی که ایالات متحده سلاح‌هایش را کنار بگذارد.',
    editedPersian:
      'معاهده‌های کاهش تسلیحات هسته‌ای نیز معماهای زندانی هستند. فرض کنید در دوران جنگ سرد ایالات متحدهٔ آمریکا و روسیهٔ شوروی توافق می‌کردند که، بگوییم، ۵۰ درصد از ذخایر تسلیحات هسته‌ای خود را امحا کنند. جهان بی‌گمان جای امن‌تری می‌شد اگر هر دو طرف زرادخانهٔ خود را کاهش می‌دادند. اما چه بسا بتوان گفت بهترین چیز برای ایالات متحده این می‌بود که روسیهٔ شوروی سلاح‌های خود را کنار بگذارد در حالی که ایالات متحده پنهانی سلاح‌های خود را نگه دارد، و بهترین چیز برای روسیهٔ شوروی این می‌بود که سلاح‌های خود را نگه دارد در حالی که ایالات متحده سلاح‌هایش را کنار بگذارد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-23',
    enId: 'en-23',
    faId: 'fa-23',
    index: 23,
    sourcePage: 5,
    english:
      "Buying tickets for public transport is another Prisoner's Dilemma: if we all buy tickets honestly, then we have a well-funded public transport system. But the best thing for me is to secretly cheat and not buy a ticket, while you buy yours. Then, public transport is still well-funded, but as a free rider I've saved myself some money. However, the same temptation is there for everyone, and if we all free-ride in this way the system gets no funding, and we all end up with poor service as a consequence.",
    rawPersian:
      'خریدن بلیت برای حمل‌ونقل عمومی نیز یک معمای زندانی دیگر است: اگر همگی ما صادقانه بلیت بخریم، آنگاه یک سامانهٔ حمل‌ونقل عمومی با منابع مالی مناسب خواهیم داشت. اما بهترین کار برای شخص من این است که پنهانی تقلب کنم و بلیت نخرم، در حالی که شما بلیت خود را می‌خرید. در این صورت، حمل‌ونقل عمومی همچنان از بودجهٔ مناسبی برخوردار است، اما من به‌عنوان یک سواری‌مجانی‌گیرنده مقداری پول برای خودم پس‌انداز کرده‌ام. با این حال، همین وسوسه برای همه وجود دارد، و اگر همگی به این شیوه سواری مجانی بگیریم، هیچ بودجه‌ای به سامانه نمی‌رسد و در نتیجه همگی ما با خدمات بی‌کیفیت روبه‌رو می‌شویم.',
    editedPersian:
      'خریدن بلیت برای حمل‌ونقل عمومی نیز یک معمای زندانی دیگر است: اگر همگی ما صادقانه بلیت بخریم، آنگاه یک سامانهٔ حمل‌ونقل عمومی با منابع مالی مناسب خواهیم داشت. اما بهترین کار برای شخص من این است که پنهانی تقلب کنم و بلیت نخرم، در حالی که شما بلیت خود را می‌خرید. در این صورت، حمل‌ونقل عمومی همچنان از بودجهٔ مناسبی برخوردار است، اما من به‌عنوان یک سواری‌مجانی‌گیرنده مقداری پول برای خودم پس‌انداز کرده‌ام. با این حال، همین وسوسه برای همه وجود دارد، و اگر همگی به این شیوه سواری مجانی بگیریم، هیچ بودجه‌ای به سامانه نمی‌رسد و در نتیجه همگی ما با خدمات بی‌کیفیت روبه‌رو می‌شویم.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-24',
    enId: 'en-24',
    faId: 'fa-24',
    index: 24,
    sourcePage: 5,
    english:
      "The Prisoner's Dilemma also seems to explain why companies pump money into advertising. Suppose Coca-Cola and Pepsi are each deciding whether to invest in a new advertising campaign. If neither invests in a new campaign, they both maintain their current market share and save money on advertising. However, if Pepsi invest in a campaign and Coca-Cola don't, then this is bad for Coca-Cola Pepsi takes a bigger market share. Likewise, if Coca-Cola invest and Pepsi don't, then that's bad for Pepsi. But if they both invest, they will likely both end up with the same market share they would have had without advertising - except they've both spent a fortune on marketing. This seems crazy - the only people who benefit are advertising executives. But the alternative not to invest in a campaign runs the risk of the sucker's payoff.",
    rawPersian:
      'چنین به نظر می‌رسد که معمای زندانی چراییِ سرازیر کردن پول توسط شرکت‌ها به حوزهٔ تبلیغات را نیز توضیح می‌دهد. فرض کنید کوکاکولا و پپسی هر یک در حال تصمیم‌گیری دربارهٔ سرمایه‌گذاری در یک کارزار تبلیغاتی جدید هستند. اگر هیچ‌یک در کارزار جدیدی سرمایه‌گذاری نکند، هر دو سهم بازار کنونی خود را حفظ می‌کنند و در هزینهٔ تبلیغات صرفه‌جویی می‌نمایند. با این حال، اگر پپسی در کارزاری سرمایه‌گذاری کند و کوکاکولا نکند، این امر به زیان کوکاکولا تمام می‌شود – پپسی سهم بزرگ‌تری از بازار را تصاحب می‌کند. به همین سان، اگر کوکاکولا سرمایه‌گذاری کند و پپسی نکند، به زیان پپسی تمام می‌شود. اما اگر هر دو سرمایه‌گذاری کنند، به احتمال زیاد هر دو در نهایت به همان سهم بازاری می‌رسند که بدون تبلیغات نیز می‌داشتند – جز آنکه هر دو ثروت هنگفتی را خرج بازاریابی کرده‌اند. این کار جنون‌آمیز به نظر می‌رسد – تنها کسانی که سود می‌برند مدیران شرکت‌های تبلیغاتی هستند. اما گزینهٔ جایگزین – یعنی سرمایه‌گذاری نکردن در کارزار تبلیغاتی – ریسکِ گرفتار شدن به بازدهی ساده‌لوح را در پی دارد.',
    editedPersian:
      'چنین به نظر می‌رسد که معمای زندانی چراییِ سرازیر کردن پول توسط شرکت‌ها به حوزهٔ تبلیغات را نیز توضیح می‌دهد. فرض کنید کوکاکولا و پپسی هر یک در حال تصمیم‌گیری دربارهٔ سرمایه‌گذاری در یک کارزار تبلیغاتی جدید هستند. اگر هیچ‌یک در کارزار جدیدی سرمایه‌گذاری نکند، هر دو سهم بازار کنونی خود را حفظ می‌کنند و در هزینهٔ تبلیغات صرفه‌جویی می‌نمایند. با این حال، اگر پپسی در کارزاری سرمایه‌گذاری کند و کوکاکولا نکند، این امر به زیان کوکاکولا تمام می‌شود – پپسی سهم بزرگ‌تری از بازار را تصاحب می‌کند. به همین سان، اگر کوکاکولا سرمایه‌گذاری کند و پپسی نکند، به زیان پپسی تمام می‌شود. اما اگر هر دو سرمایه‌گذاری کنند، به احتمال زیاد هر دو در نهایت به همان سهم بازاری می‌رسند که بدون تبلیغات نیز می‌داشتند – جز آنکه هر دو ثروت هنگفتی را خرج بازاریابی کرده‌اند. این کار جنون‌آمیز به نظر می‌رسد – تنها کسانی که سود می‌برند مدیران شرکت‌های تبلیغاتی هستند. اما گزینهٔ جایگزین – یعنی سرمایه‌گذاری نکردن در کارزار تبلیغاتی – ریسکِ گرفتار شدن به بازدهی ساده‌لوح را در پی دارد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-25',
    enId: 'en-25',
    faId: 'fa-25',
    index: 25,
    sourcePage: 5,
    english:
      "Finally, the Prisoner's Dilemma also has something to say about climate change. Carbon dioxide emissions created by burning fossil fuels are the key driver behind climate change. If we want to prevent climate change (or at least stop it getting worse), then reducing fossil fuel consumption is the only way to do it. So, imagine every nation on our planet solemnly signing an agreement to reduce fossil fuel consumption. The problem is any individual country has a temptation to quietly cheat on the agreement. If they do this while everyone else respects the agreement, then the planet will be saved, since just one nation cheating is unlikely to make a material difference to the global climate. But every nation has the same temptation: a Prisoner's Dilemma.",
    rawPersian:
      'سرانجام، معمای زندانی حرفی نیز برای گفتن دربارهٔ تغییرات اقلیمی دارد. انتشار دی‌اکسید کربنِ ناشی از سوزاندن سوخت‌های فسیلی محرک کلیدی در پسِ تغییرات اقلیمی است. اگر بخواهیم از تغییرات اقلیمی جلوگیری کنیم (یا دست‌کم مانع بدتر شدن آن شویم)، کاهش مصرف سوخت‌های فسیلی تنها راه انجام این کار است. پس تصور کنید تمامی کشورهای سیارهٔ ما رسماً و با تشریفات کامل توافق‌نامه‌ای را برای کاهش مصرف سوخت‌های فسیلی امضا کنند. مشکل اینجاست که هر کشورِ منفرد وسوسه می‌شود که بی‌سروصدا در اجرای توافق تقلب کند. اگر آن کشور چنین کند در حالی که سایرین به توافق احترام می‌گذارند، سیارهٔ زمین نجات خواهد یافت، چراکه بعید است تقلبِ تنها یک کشور تفاوت محسوسی در اقلیم جهانی ایجاد کند. اما هر کشوری همین وسوسه را دارد: یک معمای زندانی.',
    editedPersian:
      'سرانجام، معمای زندانی حرفی نیز برای گفتن دربارهٔ تغییرات اقلیمی دارد. انتشار دی‌اکسید کربنِ ناشی از سوزاندن سوخت‌های فسیلی محرک کلیدی در پسِ تغییرات اقلیمی است. اگر بخواهیم از تغییرات اقلیمی جلوگیری کنیم (یا دست‌کم مانع بدتر شدن آن شویم)، کاهش مصرف سوخت‌های فسیلی تنها راه انجام این کار است. پس تصور کنید تمامی کشورهای سیارهٔ ما رسماً و با تشریفات کامل توافق‌نامه‌ای را برای کاهش مصرف سوخت‌های فسیلی امضا کنند. مشکل اینجاست که هر کشورِ منفرد وسوسه می‌شود که بی‌سروصدا در اجرای توافق تقلب کند. اگر آن کشور چنین کند در حالی که سایرین به توافق احترام می‌گذارند، سیارهٔ زمین نجات خواهد یافت، چراکه بعید است تقلبِ تنها یک کشور تفاوت محسوسی در اقلیم جهانی ایجاد کند. اما هر کشوری همین وسوسه را دارد: یک معمای زندانی.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-26',
    enId: 'en-26',
    faId: 'fa-26',
    index: 26,
    sourcePage: 5,
    english:
      "Look around you: now that you understand the symptoms, you will see the Prisoner's Dilemma everywhere at work, in your family, in society, the economy, and international relations.",
    rawPersian:
      'به پیرامون خود بنگرید: اکنون که نشانه‌ها را می‌شناسید، معمای زندانی را در همه‌جا خواهید دید – در محل کار، در خانواده، در جامعه، در اقتصاد، و در روابط بین‌الملل.',
    editedPersian:
      'به پیرامون خود بنگرید: اکنون که نشانه‌ها را می‌شناسید، معمای زندانی را در همه‌جا خواهید دید – در محل کار، در خانواده، در جامعه، در اقتصاد، و در روابط بین‌الملل.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-27',
    enId: 'en-27',
    faId: 'fa-27',
    index: 27,
    sourcePage: 6,
    english:
      "Because the Prisoner's Dilemma leads to such a counterintuitive outcome, and because it seems so ubiquitous, a vast literature has sprung up trying to justify why it is, in fact, rational for players to keep quiet. Part of this literature uses the game to try to discredit game theory as whole. A standard argument goes as follows: 'My alternative theory says that players should keep quiet in the Prisoner's Dilemma. If Alex and Bob used my theory, then they would both do better than with game theory. So, my theory is better.' Unfortunately, this is just wishful thinking. Alex and Bob have a choice of whose theory to follow (if they don't have a choice, then they aren't playing the Prisoner's Dilemma). And if one player were to follow the alternative theory, then the other would do better to ignore it and confess. In the Prisoner's Dilemma, remember, the players don't care about each other: they only care about minimizing their amount of time in prison. I emphasize that game theory can cope perfectly well with players that care about each other, but, if Alex and Bob are worried about how much time the other spends in prison, then they aren't playing the Prisoner's Dilemma.",
    rawPersian:
      'از آنجا که معمای زندانی به چنان پیامد خلاف شهودی می‌انجامد، و از آنجا که چنین فراگیر به نظر می‌رسد، ادبیات پژوهشیِ گسترده‌ای سر برآورده است که می‌کوشد توجیه کند چرا سکوت اختیار کردن برای بازیکنان در واقع عقلانی است. بخشی از این ادبیات از این بازی استفاده می‌کند تا بکوشد کلیتِ نظریهٔ بازی‌ها را بی‌اعتبار سازد. یک استدلال معیار به قرار زیر است: «نظریهٔ جایگزینِ من می‌گوید که بازیکنان در معمای زندانی باید سکوت اختیار کنند. اگر الکس و باب از نظریهٔ من استفاده می‌کردند، هر دو نتیجهٔ بهتری نسبت به نظریهٔ بازی‌ها می‌گرفتند. پس نظریهٔ من بهتر است.» متأسفانه این سخن صرفاً خیال‌بافیِ خوش‌بینانه است. الکس و باب حق انتخاب دارند که از نظریهٔ چه کسی پیروی کنند (اگر حق انتخاب نداشته باشند، دیگر مشغول انجام بازی معمای زندانی نیستند). و اگر یکی از بازیکنان بنا را بر پیروی از آن نظریهٔ جایگزین می‌گذاشت، آنگاه برای بازیکن دیگر بهتر می‌بود که آن را نادیده بگیرد و اعتراف کند. به یاد داشته باشید که در معمای زندانی، بازیکنان اهمیتی به یکدیگر نمی‌دهند: آن‌ها تنها به کمینه کردن مدت‌زمان حضور خودشان در زندان اهمیت می‌دهند. تأکید می‌کنم که نظریهٔ بازی‌ها به‌خوبی از پسِ بازیکنانی که به یکدیگر اهمیت می‌دهند برمی‌آید، اما اگر الکس و باب نگران آن باشند که فرد دیگر چه مدتی را در زندان سپری می‌کند، دیگر مشغول انجام بازی معمای زندانی نیستند.',
    editedPersian:
      'از آنجا که معمای زندانی به چنان پیامد خلاف شهودی می‌انجامد، و از آنجا که چنین فراگیر به نظر می‌رسد، ادبیات پژوهشیِ گسترده‌ای سر برآورده است که می‌کوشد توجیه کند چرا سکوت اختیار کردن برای بازیکنان در واقع عقلانی است. بخشی از این ادبیات از این بازی استفاده می‌کند تا بکوشد کلیتِ نظریهٔ بازی‌ها را بی‌اعتبار سازد. یک استدلال معیار به قرار زیر است: «نظریهٔ جایگزینِ من می‌گوید که بازیکنان در معمای زندانی باید سکوت اختیار کنند. اگر الکس و باب از نظریهٔ من استفاده می‌کردند، هر دو نتیجهٔ بهتری نسبت به نظریهٔ بازی‌ها می‌گرفتند. پس نظریهٔ من بهتر است.» متأسفانه این سخن صرفاً خیال‌بافیِ خوش‌بینانه است. الکس و باب حق انتخاب دارند که از نظریهٔ چه کسی پیروی کنند (اگر حق انتخاب نداشته باشند، دیگر مشغول انجام بازی معمای زندانی نیستند). و اگر یکی از بازیکنان بنا را بر پیروی از آن نظریهٔ جایگزین می‌گذاشت، آنگاه برای بازیکن دیگر بهتر می‌بود که آن را نادیده بگیرد و اعتراف کند. به یاد داشته باشید که در معمای زندانی، بازیکنان اهمیتی به یکدیگر نمی‌دهند: آن‌ها تنها به کمینه کردن مدت‌زمان حضور خودشان در زندان اهمیت می‌دهند. تأکید می‌کنم که نظریهٔ بازی‌ها به‌خوبی از پسِ بازیکنانی که به یکدیگر اهمیت می‌دهند برمی‌آید، اما اگر الکس و باب نگران آن باشند که فرد دیگر چه مدتی را در زندان سپری می‌کند، دیگر مشغول انجام بازی معمای زندانی نیستند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-28',
    enId: 'en-28',
    faId: 'fa-28',
    index: 28,
    sourcePage: 6,
    english:
      "Another argument is that both players will recognize that they are dealing with a dilemma, spot the apparent absurdity, and somehow rise above it. Unfortunately, we are again in the territory of wishful thinking: if Alex thought like that, Bob's best response would of course be to confess.",
    rawPersian:
      'استدلال دیگر این است که هر دو بازیکن تشخیص خواهند داد که با یک تنگنا روبه‌رو هستند، پوچیِ ظاهریِ ماجرا را درخواهند یافت، و به نحوی فراتر از آن خواهند رفت. متأسفانه باز هم در قلمرو خیال‌بافیِ خوش‌بینانه هستیم: اگر الکس چنین می‌اندیشید، بهترین پاسخ باب بی‌تردید اعتراف کردن می‌بود.',
    editedPersian:
      'استدلال دیگر این است که هر دو بازیکن تشخیص خواهند داد که با یک تنگنا روبه‌رو هستند، پوچیِ ظاهریِ ماجرا را درخواهند یافت، و به نحوی فراتر از آن خواهند رفت. متأسفانه باز هم در قلمرو خیال‌بافیِ خوش‌بینانه هستیم: اگر الکس چنین می‌اندیشید، بهترین پاسخ باب بی‌تردید اعتراف کردن می‌بود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-29',
    enId: 'en-29',
    faId: 'fa-29',
    index: 29,
    sourcePage: 6,
    english:
      "Yet another argument goes as follows (this is called the 'Fallacy of the Twins'): 'Alex knows that Bob will think like he does. And so, if Alex chooses to keep quiet, he knows that so will Bob.' But then Alex and Bob are not really individuals making choices, and so the game isn't the Prisoner's Dilemma. The Prisoner's Dilemma is a game in which individuals must make choices.",
    rawPersian:
      'استدلال دیگری نیز به این شرح مطرح می‌شود (که به آن «مغالطهٔ دوقلوها» می‌گویند): «الکس می‌داند که باب نیز درست مانند او فکر خواهد کرد. و بنابراین، اگر الکس سکوت اختیار کردن را برگزیند، می‌داند که باب نیز چنین خواهد کرد.» اما در این صورت الکس و باب واقعاً افراد مستقلی نیستند که دست به انتخاب می‌زنند، و بنابراین این بازی دیگر معمای زندانی نیست. معمای زندانی بازی‌ای است که در آن افراد مستقل باید دست به انتخاب بزنند.',
    editedPersian:
      'استدلال دیگری نیز به این شرح مطرح می‌شود (که به آن «مغالطهٔ دوقلوها» می‌گویند): «الکس می‌داند که باب نیز درست مانند او فکر خواهد کرد. و بنابراین، اگر الکس سکوت اختیار کردن را برگزیند، می‌داند که باب نیز چنین خواهد کرد.» اما در این صورت الکس و باب واقعاً افراد مستقلی نیستند که دست به انتخاب می‌زنند، و بنابراین این بازی دیگر معمای زندانی نیست. معمای زندانی بازی‌ای است که در آن افراد مستقل باید دست به انتخاب بزنند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-30',
    enId: 'en-30',
    faId: 'fa-30',
    index: 30,
    sourcePage: 7,
    english:
      "I think many people object to the game-theoretic analysis of the Prisoner's Dilemma simply because they find the conclusion unpalatable. They see it as promoting conflict (confessing) over cooperation (keeping quiet): telling us we should make a choice that leads to conflict when 'obviously' it makes sense to cooperate. I don't give much credence to such arguments. The Prisoner's Dilemma is a game in which rational players will not choose to cooperate. That doesn't imply that game theory is opposed to cooperation, or that if we all followed the prescriptions of game theory we would be doomed to eternal conflict. Getting upset with game theorists when they say that cooperation is not rational in the Prisoner's Dilemma makes no more sense than getting upset with Isaac Newton because an apple falls on your head when you sit under an apple tree.",
    rawPersian:
      'گمان می‌کنم بسیاری از مردم صرفاً از آن رو به تحلیلِ نظریهٔ بازی‌ها از معمای زندانی اعتراض می‌کنند که نتیجه‌گیری آن را ناخوشایند می‌یابند. آن‌ها این تحلیل را مروج تعارض (اعتراف کردن) بر همکاری (سکوت اختیار کردن) می‌بینند: گویی به ما می‌گوید باید انتخابی بکنیم که به تعارض می‌انجامد، در حالی که «به‌طور بدیهی» همکاری کردن عاقلانه است. من اعتبار چندانی برای چنین استدلال‌هایی قائل نیستم. معمای زندانی بازی‌ای است که در آن بازیکنان عقلانی همکاری کردن را برنخواهند گزید. این امر بدین معنا نیست که نظریهٔ بازی‌ها مخالف همکاری است، یا اگر همگی از نسخه‌های تجویزیِ نظریهٔ بازی‌ها پیروی می‌کردیم محکوم به تعارض ابدی می‌شدیم. دلخور شدن از نظریه‌پردازان بازی‌ها هنگامی که می‌گویند همکاری در معمای زندانی عقلانی نیست، به همان اندازه بی‌معناست که از آیزاک نیوتن دلخور شوید چون وقتی زیر درخت سیب نشسته‌اید سیبی روی سرتان می‌افتد.',
    editedPersian:
      'گمان می‌کنم بسیاری از مردم صرفاً از آن رو به تحلیلِ نظریهٔ بازی‌ها از معمای زندانی اعتراض می‌کنند که نتیجه‌گیری آن را ناخوشایند می‌یابند. آن‌ها این تحلیل را مروج تعارض (اعتراف کردن) بر همکاری (سکوت اختیار کردن) می‌بینند: گویی به ما می‌گوید باید انتخابی بکنیم که به تعارض می‌انجامد، در حالی که «به‌طور بدیهی» همکاری کردن عاقلانه است. من اعتبار چندانی برای چنین استدلال‌هایی قائل نیستم. معمای زندانی بازی‌ای است که در آن بازیکنان عقلانی همکاری کردن را برنخواهند گزید. این امر بدین معنا نیست که نظریهٔ بازی‌ها مخالف همکاری است، یا اگر همگی از نسخه‌های تجویزیِ نظریهٔ بازی‌ها پیروی می‌کردیم محکوم به تعارض ابدی می‌شدیم. دلخور شدن از نظریه‌پردازان بازی‌ها هنگامی که می‌گویند همکاری در معمای زندانی عقلانی نیست، به همان اندازه بی‌معناست که از آیزاک نیوتن دلخور شوید چون وقتی زیر درخت سیب نشسته‌اید سیبی روی سرتان می‌افتد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-31',
    enId: 'en-31',
    faId: 'fa-31',
    index: 31,
    sourcePage: 7,
    english:
      "If you are still struggling to accept that the only rational outcome in the Prisoner's Dilemma is for both players to confess, then it may help to consider this:",
    rawPersian:
      'اگر هنوز هم پذیرفتن اینکه تنها پیامد عقلانی در معمای زندانی اعتراف کردن هر دو بازیکن است برایتان دشوار است، شاید در نظر گرفتن مثال زیر راهگشا باشد:',
    editedPersian:
      'اگر هنوز هم پذیرفتن اینکه تنها پیامد عقلانی در معمای زندانی اعتراف کردن هر دو بازیکن است برایتان دشوار است، شاید در نظر گرفتن مثال زیر راهگشا باشد:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-32',
    enId: 'en-32',
    faId: 'fa-32',
    index: 32,
    sourcePage: 7,
    english: 'An eccentric but honest millionaire funds the following game:',
    rawPersian: 'میلیونری عجیب‌وغریب اما درستکار سرمایهٔ بازی زیر را تأمین می‌کند:',
    editedPersian: 'میلیونری عجیب‌وغریب اما درستکار سرمایهٔ بازی زیر را تأمین می‌کند:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-33',
    enId: 'en-33',
    faId: 'fa-33',
    index: 33,
    sourcePage: 7,
    english:
      'You and an anonymous counterpart are paired at random on the internet; neither of you knows the identity of the other. You must each decide whether to immediately take a cash prize of $1,000 or give the other player a cash prize of $3,000 (the prizes are paid by the millionaire). You and your counterpart cannot do both: you must each choose just one of these alternatives.9',
    rawPersian:
      'شما و یک طرف مقابلِ ناشناس به‌صورت تصادفی در اینترنت با یکدیگر جفت می‌شوید؛ هیچ‌یک از شما هویت دیگری را نمی‌داند. هر یک از شما باید تصمیم بگیرد که یا بی‌درنگ یک جایزهٔ نقدی ۱٬۰۰۰ دلاری را بردارد یا یک جایزهٔ نقدی ۳٬۰۰۰ دلاری به بازیکن دیگر اهدا کند (جوایز توسط میلیونر پرداخت می‌شوند). شما و طرف مقابلتان نمی‌توانید هر دو کار را انجام دهید: هر یک از شما باید تنها یکی از این دو گزینه را برگزیند.۹',
    editedPersian:
      'شما و یک طرف مقابلِ ناشناس به‌صورت تصادفی در اینترنت با یکدیگر جفت می‌شوید؛ هیچ‌یک از شما هویت دیگری را نمی‌داند. هر یک از شما باید تصمیم بگیرد که یا بی‌درنگ یک جایزهٔ نقدی ۱٬۰۰۰ دلاری را بردارد یا یک جایزهٔ نقدی ۳٬۰۰۰ دلاری به بازیکن دیگر اهدا کند (جوایز توسط میلیونر پرداخت می‌شوند). شما و طرف مقابلتان نمی‌توانید هر دو کار را انجام دهید: هر یک از شما باید تنها یکی از این دو گزینه را برگزیند.۹',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-34',
    enId: 'en-34',
    faId: 'fa-34',
    index: 34,
    sourcePage: 7,
    english:
      "Now, take a moment to convince yourself that this is nothing more than the Prisoner's Dilemma. From your point of view, if your counterpart were to give you $3,000, then your best choice would be to take the $1,000 cash prize as well, giving you a total income of $4,000; if your counterpart chose to take the $1,000 cash prize, then clearly your best choice would be to do likewise. No matter what your counterpart does, you would do better to take the $1,000 rather than donate $3,000 - even though you would both have been substantially better off if you had both donated.",
    rawPersian:
      'اکنون لحظه‌ای درنگ کنید تا خودتان را متقاعد سازید که این بازی چیزی بیش از همان معمای زندانی نیست. از دیدگاه شما، اگر قرار باشد طرف مقابلتان ۳٬۰۰۰ دلار به شما بدهد، بهترین انتخابتان این خواهد بود که جایزهٔ نقدی ۱٬۰۰۰ دلاری را نیز بردارید تا در مجموع درآمدی ۴٬۰۰۰ دلاری نصیبتان شود؛ و اگر طرف مقابلتان برداشتن جایزهٔ نقدی ۱٬۰۰۰ دلاری را برگزیند، آشکارا بهترین انتخاب شما این خواهد بود که همین کار را بکنید. صرف‌نظر از اینکه طرف مقابلتان چه کند، برای شما بهتر است که ۱٬۰۰۰ دلار را بردارید تا اینکه ۳٬۰۰۰ دلار اهدا کنید – هرچند اگر هر دو اهدا کرده بودید، وضعیت هر دویتان به‌مراتب بهتر می‌شد.',
    editedPersian:
      'اکنون لحظه‌ای درنگ کنید تا خودتان را متقاعد سازید که این بازی چیزی بیش از همان معمای زندانی نیست. از دیدگاه شما، اگر قرار باشد طرف مقابلتان ۳٬۰۰۰ دلار به شما بدهد، بهترین انتخابتان این خواهد بود که جایزهٔ نقدی ۱٬۰۰۰ دلاری را نیز بردارید تا در مجموع درآمدی ۴٬۰۰۰ دلاری نصیبتان شود؛ و اگر طرف مقابلتان برداشتن جایزهٔ نقدی ۱٬۰۰۰ دلاری را برگزیند، آشکارا بهترین انتخاب شما این خواهد بود که همین کار را بکنید. صرف‌نظر از اینکه طرف مقابلتان چه کند، برای شما بهتر است که ۱٬۰۰۰ دلار را بردارید تا اینکه ۳٬۰۰۰ دلار اهدا کنید – هرچند اگر هر دو اهدا کرده بودید، وضعیت هر دویتان به‌مراتب بهتر می‌شد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-35',
    enId: 'en-35',
    faId: 'fa-35',
    index: 35,
    sourcePage: 7,
    english:
      "Would you donate $3,000 in this game? If your answer is 'yes', then, bless you, my considered advice is that you should stay well away from the internet.",
    rawPersian:
      'آیا شما در این بازی ۳٬۰۰۰ دلار اهدا می‌کردید؟ اگر پاسختان «بله» است، خیر پیش، پند سنجیدهٔ من به شما این است که کاملاً از اینترنت دور بمانید.',
    editedPersian:
      'آیا شما در این بازی ۳٬۰۰۰ دلار اهدا می‌کردید؟ اگر پاسختان «بله» است، خیر پیش، پند سنجیدهٔ من به شما این است که کاملاً از اینترنت دور بمانید.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-36',
    enId: 'en-36',
    faId: 'fa-36',
    index: 36,
    sourcePage: 8,
    english:
      "What does all this mean in practice for nuclear arms reduction treaties, overfishing in the North Atlantic, and so on? The answer is simple: If you are playing the Prisoner's Dilemma if you are really playing the Prisoner's Dilemma then a mutually cooperative outcome cannot rationally be obtained without some help. If the mutually cooperative outcome is important to you, then you will have to look for some other way to get to that outcome to change the game, for example by introducing some mechanism that enables mutually binding cooperation. What might such a mechanism be? Legally binding contracts might work – but would it be wise to just assume that players will respect the contract? You would need to police it, and there would need to be penalties for transgression that would truly provide players with an incentive to cooperate. In the overfishing scenario, it isn't enough for the North Atlantic nations to agree not to overfish and then trust that everyone will play nice. They need to introduce enforcement mechanisms, for example, spot checks of fishing vessels and penalties for transgression that actually bite hard enough to influence behaviour.",
    rawPersian:
      'معنای همهٔ این‌ها در عمل برای معاهده‌های کاهش تسلیحات هسته‌ای، صید بی‌رویه در اقیانوس اطلس شمالی، و موارد مشابه چیست؟ پاسخ ساده است: اگر مشغول انجام بازی معمای زندانی هستید – اگر واقعاً مشغول انجام بازی معمای زندانی هستید – آنگاه دست‌یابی عقلانی به پیامدی مبتنی بر همکاری متقابل بدون دریافت کمکی از بیرون ممکن نیست. اگر پیامد مبتنی بر همکاری متقابل برایتان اهمیت دارد، باید به دنبال راه دیگری برای رسیدن به آن پیامد باشید – یعنی بازی را تغییر دهید، برای نمونه با وارد کردن سازوکاری که همکاریِ متقابلاً الزام‌آور را ممکن سازد. چنین سازوکاری چه می‌تواند باشد؟ قراردادهای الزام‌آور حقوقی ممکن است کارساز باشند – اما آیا عاقلانه است که صرفاً فرض کنیم بازیکنان به قرارداد احترام خواهند گذاشت؟ لازم است بر اجرای آن نظارت کنید، و باید جریمه‌هایی برای تخطی وجود داشته باشد که به‌راستی انگیزه‌ای برای همکاری در بازیکنان ایجاد کند. در سناریوی صید بی‌رویه، کافی نیست که کشورهای اقیانوس اطلس شمالی توافق کنند بیش از حد ماهی نگیرند و سپس اعتماد کنند که همگی خوش‌رفتار خواهند بود. آن‌ها باید سازوکارهای اجرایی برقرار کنند، برای نمونه، بازرسی‌های سرزده از شناورهای صیادی و جریمه‌هایی برای تخطی که واقعاً آن‌قدر گزنده و سنگین باشند که بر رفتار اثر بگذارند.',
    editedPersian:
      'معنای همهٔ این‌ها در عمل برای معاهده‌های کاهش تسلیحات هسته‌ای، صید بی‌رویه در اقیانوس اطلس شمالی، و موارد مشابه چیست؟ پاسخ ساده است: اگر مشغول انجام بازی معمای زندانی هستید – اگر واقعاً مشغول انجام بازی معمای زندانی هستید – آنگاه دست‌یابی عقلانی به پیامدی مبتنی بر همکاری متقابل بدون دریافت کمکی از بیرون ممکن نیست. اگر پیامد مبتنی بر همکاری متقابل برایتان اهمیت دارد، باید به دنبال راه دیگری برای رسیدن به آن پیامد باشید – یعنی بازی را تغییر دهید، برای نمونه با وارد کردن سازوکاری که همکاریِ متقابلاً الزام‌آور را ممکن سازد. چنین سازوکاری چه می‌تواند باشد؟ قراردادهای الزام‌آور حقوقی ممکن است کارساز باشند – اما آیا عاقلانه است که صرفاً فرض کنیم بازیکنان به قرارداد احترام خواهند گذاشت؟ لازم است بر اجرای آن نظارت کنید، و باید جریمه‌هایی برای تخطی وجود داشته باشد که به‌راستی انگیزه‌ای برای همکاری در بازیکنان ایجاد کند. در سناریوی صید بی‌رویه، کافی نیست که کشورهای اقیانوس اطلس شمالی توافق کنند بیش از حد ماهی نگیرند و سپس اعتماد کنند که همگی خوش‌رفتار خواهند بود. آن‌ها باید سازوکارهای اجرایی برقرار کنند، برای نمونه، بازرسی‌های سرزده از شناورهای صیادی و جریمه‌هایی برای تخطی که واقعاً آن‌قدر گزنده و سنگین باشند که بر رفتار اثر بگذارند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'seg-37',
    enId: 'en-37',
    faId: 'fa-37',
    index: 37,
    sourcePage: 8,
    english:
      "The Prisoner's Dilemma is a vivid illustration of the following fundamental truth: any social structure which requires individuals to cooperate when they have an incentive not to will be inherently unstable. We might wish this wasn't the case, but it would be hopelessly naive to build a society that assumed it wasn't. The lesson is simple: don't be a sucker, and don't assume anyone else is either.",
    rawPersian:
      'معمای زندانی نمایش زنده‌ای از حقیقت بنیادینِ زیر است: هر ساختار اجتماعی‌ای که از افراد بخواهد در شرایطی که انگیزه‌ای برای عدم همکاری دارند همکاری کنند، ذاتاً ناپایدار خواهد بود. ما شاید آرزو کنیم که ای کاش چنین نبود، اما ساختن جامعه‌ای بر پایهٔ این فرض که چنین نیست، به شکلی نومیدکننده ساده‌لوحانه خواهد بود. درسِ ماجرا ساده است: ساده‌لوح نباشید، و فرض را بر این هم نگذارید که هیچ‌کس دیگری ساده‌لوح است.',
    editedPersian:
      'معمای زندانی نمایش زنده‌ای از حقیقت بنیادینِ زیر است: هر ساختار اجتماعی‌ای که از افراد بخواهد در شرایطی که انگیزه‌ای برای عدم همکاری دارند همکاری کنند، ذاتاً ناپایدار خواهد بود. ما شاید آرزو کنیم که ای کاش چنین نبود، اما ساختن جامعه‌ای بر پایهٔ این فرض که چنین نیست، به شکلی نومیدکننده ساده‌لوحانه خواهد بود. درسِ ماجرا ساده است: ساده‌لوح نباشید، و فرض را بر این هم نگذارید که هیچ‌کس دیگری ساده‌لوح است.',
    status: 'edited',
    lastModified: 'Just now',
  },
];

const LESSON_3_SEGMENTS = [
  {
    id: 'l3-seg-1',
    enId: 'l3-en-1',
    faId: 'l3-fa-1',
    index: 1,
    sourcePage: 1,
    english: 'Lesson 3',
    rawPersian: 'درس ۳',
    editedPersian: 'درس ۳',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-2',
    enId: 'l3-en-2',
    faId: 'l3-fa-2',
    index: 2,
    sourcePage: 1,
    english: "Sometimes it's better to be chicken",
    rawPersian: 'گاهی بهتر است بزدل باشید',
    editedPersian: 'گاهی بهتر است بزدل باشید',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-3',
    enId: 'l3-en-3',
    faId: 'l3-fa-3',
    index: 3,
    sourcePage: 1,
    english:
      'Two teenagers, Jim and Buzz, are trying to prove which of them is the bravest. They do this by simultaneously driving their cars towards a cliff edge. At any point, either of them can end the game by jumping out of their car, but the first one to do this is branded a chicken, and the teenager who stays in his car the longest is proved the bravest. If neither jumps clear, then both will go over the cliff.',
    rawPersian:
      'دو نوجوان، جیم و باز، در تلاش‌اند تا ثابت کنند کدام‌یک از آن دو شجاع‌تر است. آن‌ها این کار را با راندن هم‌زمان خودروهای خود به سوی لبهٔ یک پرتگاه انجام می‌دهند. در هر لحظه، هر یک از آن دو می‌تواند با بیرون پریدن از خودروی خود به بازی پایان دهد، اما نخستین نفری که دست به این کار بزند مهر «بزدل» بر پیشانی‌اش می‌خورد، و نوجوانی که بیشترین زمان را در خودروی خود باقی بماند شجاع‌ترین شناخته می‌شود. اگر هیچ‌یک بیرون نپرد، آنگاه هر دو از لبهٔ پرتگاه سقوط خواهند کرد.',
    editedPersian:
      'دو نوجوان، جیم و باز، در تلاش‌اند تا ثابت کنند کدام‌یک از آن دو شجاع‌تر است. آن‌ها این کار را با راندن هم‌زمان خودروهای خود به سوی لبهٔ یک پرتگاه انجام می‌دهند. در هر لحظه، هر یک از آن دو می‌تواند با بیرون پریدن از خودروی خود به بازی پایان دهد، اما نخستین نفری که دست به این کار بزند مهر «بزدل» بر پیشانی‌اش می‌خورد، و نوجوانی که بیشترین زمان را در خودروی خود باقی بماند شجاع‌ترین شناخته می‌شود. اگر هیچ‌یک بیرون نپرد، آنگاه هر دو از لبهٔ پرتگاه سقوط خواهند کرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-4',
    enId: 'l3-en-4',
    faId: 'l3-fa-4',
    index: 4,
    sourcePage: 1,
    english:
      'Jim and Buzz thus both face the following choice: drive straight or jump clear.',
    rawPersian:
      'بنابراین جیم و باز هر دو با انتخاب زیر روبه‌رو هستند: مستقیم راندن یا بیرون پریدن.',
    editedPersian:
      'بنابراین جیم و باز هر دو با انتخاب زیر روبه‌رو هستند: مستقیم راندن یا بیرون پریدن.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-5',
    enId: 'l3-en-5',
    faId: 'l3-fa-5',
    index: 5,
    sourcePage: 1,
    english:
      "I've been teaching a game theory course every year for a decade. The first time I taught the course, when we reached this game - the Game of Chicken - I asked the class whether they had seen the film, taking it for granted that they would identify the cultural reference. I was met by blank looks: not a single 20-year-old in a class of 60 students had seen Rebel Without a Cause or could even recognize the reference. But more than that, only a couple of them even recognized the name of James Dean. I found this astonishing. As a teenager in the 1980s, my music scene (yes, I had a music scene) was post-punk, but even for that angry community James Dean had mythical status: he was the essence of cool, and that resonated even though it was cool at the time to reject cool.",
    rawPersian:
      'من به مدت یک دهه هر سال درس نظریهٔ بازی‌ها را تدریس کرده‌ام. نخستین باری که این درس را ارائه دادم، هنگامی که به این بازی – یعنی بازی بزدل – رسیدیم، با این پیش‌فرض بدیهی که دانشجویان این ارجاع فرهنگی را خواهند شناخت، از کلاس پرسیدم آیا آن فیلم را دیده‌اند یا نه. با نگاه‌های هاج‌وواج و بی‌خبر روبه‌رو شدم: در کلاسی ۶۰ نفره، حتی یک جوان ۲۰ ساله هم فیلم شورش بی‌دلیل را ندیده بود و حتی نمی‌توانست این ارجاع را تشخیص دهد. اما فراتر از آن، تنها یکی دو نفر از آن‌ها اصلاً نام جیمز دین به گوششان خورده بود. این موضوع برایم حیرت‌آور بود. در دوران نوجوانی‌ام در دههٔ ۱۹۸۰، گرایش و محفل موسیقایی من (بله، من هم برای خودم محفل موسیقایی داشتم) پست‌پانک بود، اما حتی برای آن جماعت خشمگین نیز جیمز دین جایگاهی اسطوره‌ای داشت: او جوهرهٔ جذابیت و خونسردی بود، و این ویژگی طنین‌انداز می‌شد هرچند در آن زمان پس زدنِ همین جذابیت و خونسردی خود نشانهٔ جذابیت به شمار می‌رفت.',
    editedPersian:
      'من به مدت یک دهه هر سال درس نظریهٔ بازی‌ها را تدریس کرده‌ام. نخستین باری که این درس را ارائه دادم، هنگامی که به این بازی – یعنی بازی بزدل – رسیدیم، با این پیش‌فرض بدیهی که دانشجویان این ارجاع فرهنگی را خواهند شناخت، از کلاس پرسیدم آیا آن فیلم را دیده‌اند یا نه. با نگاه‌های هاج‌وواج و بی‌خبر روبه‌رو شدم: در کلاسی ۶۰ نفره، حتی یک جوان ۲۰ ساله هم فیلم شورش بی‌دلیل را ندیده بود و حتی نمی‌توانست این ارجاع را تشخیص دهد. اما فراتر از آن، تنها یکی دو نفر از آن‌ها اصلاً نام جیمز دین به گوششان خورده بود. این موضوع برایم حیرت‌آور بود. در دوران نوجوانی‌ام در دههٔ ۱۹۸۰، گرایش و محفل موسیقایی من (بله، من هم برای خودم محفل موسیقایی داشتم) پست‌پانک بود، اما حتی برای آن جماعت خشمگین نیز جیمز دین جایگاهی اسطوره‌ای داشت: او جوهرهٔ جذابیت و خونسردی بود، و این ویژگی طنین‌انداز می‌شد هرچند در آن زمان پس زدنِ همین جذابیت و خونسردی خود نشانهٔ جذابیت به شمار می‌رفت.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-6',
    enId: 'l3-en-6',
    faId: 'l3-fa-6',
    index: 6,
    sourcePage: 1,
    english:
      "In a crucial scene in the iconic 1955 film, Dean's character, Jim, plays the Game of Chicken described above with local hothead Buzz. Jim leaps clear of the car as they approach the cliff edge, believing that Buzz had done the same. But Buzz catches his jacket on a door handle and he can't open the door - he plunges to his death on the rocks below. Game theory could not have saved Buzz from his accident, but suppose Jim and Buzz had attended my game theory course before they played - could I give them any useful advice?",
    rawPersian:
      'در صحنه‌ای سرنوشت‌ساز در این فیلم ماندگار محصول ۱۹۵۵، شخصیتِ دین، یعنی جیم، بازی بزدلِ توصیف‌شده در بالا را با جوان کله‌شق محلی، یعنی باز، انجام می‌دهد. جیم هم‌زمان با نزدیک شدن به لبهٔ پرتگاه از خودرو بیرون می‌پرد، با این گمان که باز نیز همین کار را کرده است. اما آستین یا لبهٔ کاپشن باز به دستگیرهٔ در گیر می‌کند و او نمی‌تواند در را باز کند – و به کام مرگ بر روی صخره‌های پایین سقوط می‌کند. نظریهٔ بازی‌ها نمی‌توانست باز را از آن سانحه نجات دهد، اما فرض کنید جیم و باز پیش از انجام بازی سر کلاس نظریهٔ بازی‌های من حاضر شده بودند – آیا می‌توانستم پند مفیدی به آن‌ها بدهم؟',
    editedPersian:
      'در صحنه‌ای سرنوشت‌ساز در این فیلم ماندگار محصول ۱۹۵۵، شخصیتِ دین، یعنی جیم، بازی بزدلِ توصیف‌شده در بالا را با جوان کله‌شق محلی، یعنی باز، انجام می‌دهد. جیم هم‌زمان با نزدیک شدن به لبهٔ پرتگاه از خودرو بیرون می‌پرد، با این گمان که باز نیز همین کار را کرده است. اما آستین یا لبهٔ کاپشن باز به دستگیرهٔ در گیر می‌کند و او نمی‌تواند در را باز کند – و به کام مرگ بر روی صخره‌های پایین سقوط می‌کند. نظریهٔ بازی‌ها نمی‌توانست باز را از آن سانحه نجات دهد، اما فرض کنید جیم و باز پیش از انجام بازی سر کلاس نظریهٔ بازی‌های من حاضر شده بودند – آیا می‌توانستم پند مفیدی به آن‌ها بدهم؟',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-7',
    enId: 'l3-en-7',
    faId: 'l3-fa-7',
    index: 7,
    sourcePage: 2,
    english:
      "First let's put ourselves in Jim's place, and analyse the game. We'll see that the analysis provided by game theory doesn't provide quite such clear-cut advice as it did for the Prisoner's Dilemma.",
    rawPersian:
      'نخست بیایید خودمان را به جای جیم بگذاریم و بازی را تحلیل کنیم. خواهیم دید که تحلیلی که نظریهٔ بازی‌ها به دست می‌دهد، پندی به آن سرراستی و قاطعیت که برای معمای زندانی داشت ارائه نمی‌کند.',
    editedPersian:
      'نخست بیایید خودمان را به جای جیم بگذاریم و بازی را تحلیل کنیم. خواهیم دید که تحلیلی که نظریهٔ بازی‌ها به دست می‌دهد، پندی به آن سرراستی و قاطعیت که برای معمای زندانی داشت ارائه نمی‌کند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-8',
    enId: 'l3-en-8',
    faId: 'l3-fa-8',
    index: 8,
    sourcePage: 2,
    english:
      '• The worst outcome for Jim (and for Buzz) would be for them both to drive straight: in this case, we imagine them looking sideways at the other car, wondering when their counterpart is going to jump - until they both unwittingly fly off the cliff to their deaths on the rocks below.',
    rawPersian:
      '• بدترین پیامد برای جیم (و برای باز) این خواهد بود که هر دوی آن‌ها مستقیم برانند: در این حالت، تصور می‌کنیم که آن‌ها زیرچشمی به خودروی دیگر نگاه می‌کنند و در عجب‌اند که طرف مقابلشان چه زمانی قصد پریدن دارد – تا آنکه هر دو ناخواسته از لبهٔ پرتگاه به پرواز درآیند و بر روی صخره‌های پایین به کام مرگ بروند.',
    editedPersian:
      '• بدترین پیامد برای جیم (و برای باز) این خواهد بود که هر دوی آن‌ها مستقیم برانند: در این حالت، تصور می‌کنیم که آن‌ها زیرچشمی به خودروی دیگر نگاه می‌کنند و در عجب‌اند که طرف مقابلشان چه زمانی قصد پریدن دارد – تا آنکه هر دو ناخواسته از لبهٔ پرتگاه به پرواز درآیند و بر روی صخره‌های پایین به کام مرگ بروند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-9',
    enId: 'l3-en-9',
    faId: 'l3-fa-9',
    index: 9,
    sourcePage: 2,
    english:
      "• The best outcome for Jim would be to drive straight until just after Buzz jumped clear. They both survive in this case, but Jim is proved brave, and Buzz is proved chicken. Looking chicken isn't great for Buzz - but it's better than going over the cliff.",
    rawPersian:
      '• بهترین پیامد برای جیم این خواهد بود که مستقیم براند تا درست پس از لحظه‌ای که باز بیرون پرید. در این حالت هر دو زنده می‌مانند، اما شجاع بودنِ جیم ثابت می‌شود و بزدل بودنِ باز به اثبات می‌رسد. بزدل به نظر رسیدن برای باز چندان خوشایند نیست – اما بهتر از سقوط کردن از لبهٔ پرتگاه است.',
    editedPersian:
      '• بهترین پیامد برای جیم این خواهد بود که مستقیم براند تا درست پس از لحظه‌ای که باز بیرون پرید. در این حالت هر دو زنده می‌مانند، اما شجاع بودنِ جیم ثابت می‌شود و بزدل بودنِ باز به اثبات می‌رسد. بزدل به نظر رسیدن برای باز چندان خوشایند نیست – اما بهتر از سقوط کردن از لبهٔ پرتگاه است.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-10',
    enId: 'l3-en-10',
    faId: 'l3-fa-10',
    index: 10,
    sourcePage: 2,
    english:
      "• If they both jump clear at the same time, then, well, it isn't the best outcome for either but nobody loses face. It's better than being dead or chicken. Neither looks brave, but this is better than being the only chicken.",
    rawPersian:
      '• اگر هر دوی آن‌ها هم‌زمان بیرون بپرند، آنگاه، خب، این بهترین پیامد برای هیچ‌کدام نیست اما آبروی هیچ‌کس هم نمی‌رود. این کار بهتر از مردن یا بزدل بودن است. هیچ‌کدام شجاع به نظر نمی‌رسد، اما این وضعیت بهتر از آن است که فرد تنها بزدلِ میدان باشد.',
    editedPersian:
      '• اگر هر دوی آن‌ها هم‌زمان بیرون بپرند، آنگاه، خب، این بهترین پیامد برای هیچ‌کدام نیست اما آبروی هیچ‌کس هم نمی‌رود. این کار بهتر از مردن یا بزدل بودن است. هیچ‌کدام شجاع به نظر نمی‌رسد، اما این وضعیت بهتر از آن است که فرد تنها بزدلِ میدان باشد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-11',
    enId: 'l3-en-11',
    faId: 'l3-fa-11',
    index: 11,
    sourcePage: 2,
    english:
      'Notice that the game is symmetric, so Buzz follows similar reasoning: the best outcome for him is driving straight for a moment longer than Jim, and so on.',
    rawPersian:
      'توجه کنید که این بازی متقارن است، بنابراین باز نیز استدلال مشابهی را دنبال می‌کند: بهترین پیامد برای او این است که یک لحظه بیشتر از جیم مستقیم براند، و قس علی هذا.',
    editedPersian:
      'توجه کنید که این بازی متقارن است، بنابراین باز نیز استدلال مشابهی را دنبال می‌کند: بهترین پیامد برای او این است که یک لحظه بیشتر از جیم مستقیم براند، و قس علی هذا.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-12',
    enId: 'l3-en-12',
    faId: 'l3-fa-12',
    index: 12,
    sourcePage: 2,
    english:
      "This game is a bit harder to analyse than the Prisoner's Dilemma. In that game, we saw that there was a choice for both players (confess) that would be the best thing for them to do no matter what their counterpart did - a dominant strategy. We can easily see that there are no dominant strategies in the Game of Chicken - there is no single choice that would be the best thing to do no matter what your counterpart does:",
    rawPersian:
      'تحلیل کردن این بازی اندکی دشوارتر از معمای زندانی است. در آن بازی دیدیم که انتخابی برای هر دو بازیکن (اعتراف کردن) وجود داشت که صرف‌نظر از اینکه طرف مقابلشان چه می‌کرد بهترین کار ممکن برایشان بود – یعنی یک راهبرد غالب. به‌آسانی می‌توانیم ببینیم که در بازی بزدل هیچ راهبرد غالبی وجود ندارد – هیچ انتخاب واحدی در کار نیست که صرف‌نظر از اینکه طرف مقابلتان چه می‌کند، بهترین کار ممکن برای انجام دادن باشد:',
    editedPersian:
      'تحلیل کردن این بازی اندکی دشوارتر از معمای زندانی است. در آن بازی دیدیم که انتخابی برای هر دو بازیکن (اعتراف کردن) وجود داشت که صرف‌نظر از اینکه طرف مقابلشان چه می‌کرد بهترین کار ممکن برایشان بود – یعنی یک راهبرد غالب. به‌آسانی می‌توانیم ببینیم که در بازی بزدل هیچ راهبرد غالبی وجود ندارد – هیچ انتخاب واحدی در کار نیست که صرف‌نظر از اینکه طرف مقابلتان چه می‌کند، بهترین کار ممکن برای انجام دادن باشد:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-13',
    enId: 'l3-en-13',
    faId: 'l3-fa-13',
    index: 13,
    sourcePage: 2,
    english:
      "• If Buzz is going to drive straight, then Jim's best choice is to jump clear. If he doesn't, then they will both drive straight and Jim will go over the cliff with Buzz.",
    rawPersian:
      '• اگر قرار باشد باز مستقیم براند، آنگاه بهترین انتخاب جیم بیرون پریدن است. اگر چنین نکند، آنگاه هر دو مستقیم خواهند راند و جیم به همراه باز از لبهٔ پرتگاه سقوط خواهد کرد.',
    editedPersian:
      '• اگر قرار باشد باز مستقیم براند، آنگاه بهترین انتخاب جیم بیرون پریدن است. اگر چنین نکند، آنگاه هر دو مستقیم خواهند راند و جیم به همراه باز از لبهٔ پرتگاه سقوط خواهد کرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-14',
    enId: 'l3-en-14',
    faId: 'l3-fa-14',
    index: 14,
    sourcePage: 2,
    english:
      "• If Buzz is going to jump clear, then Jim's best choice is to drive straight just a fraction of a second longer and come up looking brave.",
    rawPersian:
      '• اگر قرار باشد باز بیرون بپرد، آنگاه بهترین انتخاب جیم این است که تنها کسری از ثانیه بیشتر مستقیم براند و در نهایت شجاع جلوه کند.',
    editedPersian:
      '• اگر قرار باشد باز بیرون بپرد، آنگاه بهترین انتخاب جیم این است که تنها کسری از ثانیه بیشتر مستقیم براند و در نهایت شجاع جلوه کند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-15',
    enId: 'l3-en-15',
    faId: 'l3-fa-15',
    index: 15,
    sourcePage: 3,
    english:
      "We seem to have reached an impasse: how do we resolve it? To do this, we need one of the most important concepts in game theory, called Nash equilibrium. The concept was invented by Princeton mathematician John Forbes Nash Jr (1928-2015) for his 1950 PhD thesis. Nash is one of game theory's Big Names and Big Characters. He was an extraordinarily talented mathematician. When he applied to the graduate programme at Princeton University in 1948, his undergraduate advisor Richard Duffin kindly provided a reference letter. This is what he wrote: Mr. Nash is nineteen years old and is graduating from Carnegie Tech in June. He is a mathematical genius.",
    rawPersian:
      'چنین به نظر می‌رسد که به بن‌بست رسیده‌ایم: چگونه آن را حل‌وفصل کنیم؟ برای انجام این کار، به یکی از مهم‌ترین مفاهیم در نظریهٔ بازی‌ها نیاز داریم که تعادل نش نامیده می‌شود. این مفهوم توسط ریاضی‌دان دانشگاه پرینستون، جان فوربز نش جونیور (۱۹۲۸–۲۰۱۵)، برای رسالهٔ دکتری سال ۱۹۵۰ وی ابداع شد. نش یکی از «نام‌های بزرگ» و «شخصیت‌های بزرگ» نظریهٔ بازی‌هاست. او ریاضی‌دانی با استعدادی خارق‌العاده بود. هنگامی که در سال ۱۹۴۸ برای دورهٔ تحصیلات تکمیلی در دانشگاه پرینستون درخواست پذیرش داد، استاد راهنمای دورهٔ کارشناسی او، ریچارد دافین، از سر لطف توصیه‌نامه‌ای برایش نوشت. آنچه او نوشت از این قرار بود: آقای نش نوزده‌ساله است و در ماه ژوئن از مؤسسهٔ فناوری کارنگی فارغ‌التحصیل می‌شود. او یک نابغهٔ ریاضی است.',
    editedPersian:
      'چنین به نظر می‌رسد که به بن‌بست رسیده‌ایم: چگونه آن را حل‌وفصل کنیم؟ برای انجام این کار، به یکی از مهم‌ترین مفاهیم در نظریهٔ بازی‌ها نیاز داریم که تعادل نش نامیده می‌شود. این مفهوم توسط ریاضی‌دان دانشگاه پرینستون، جان فوربز نش جونیور (۱۹۲۸–۲۰۱۵)، برای رسالهٔ دکتری سال ۱۹۵۰ وی ابداع شد. نش یکی از «نام‌های بزرگ» و «شخصیت‌های بزرگ» نظریهٔ بازی‌هاست. او ریاضی‌دانی با استعدادی خارق‌العاده بود. هنگامی که در سال ۱۹۴۸ برای دورهٔ تحصیلات تکمیلی در دانشگاه پرینستون درخواست پذیرش داد، استاد راهنمای دورهٔ کارشناسی او، ریچارد دافین، از سر لطف توصیه‌نامه‌ای برایش نوشت. آنچه او نوشت از این قرار بود: آقای نش نوزده‌ساله است و در ماه ژوئن از مؤسسهٔ فناوری کارنگی فارغ‌التحصیل می‌شود. او یک نابغهٔ ریاضی است.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-16',
    enId: 'l3-en-16',
    faId: 'l3-fa-16',
    index: 16,
    sourcePage: 3,
    english:
      'Genius he certainly was, but also, it seems, self-important and painfully precocious. While at Princeton he dropped in on Albert Einstein to offer him advice about how to do physics. Einstein apparently recommended that Nash learn a little more about physics. Just two years later, Nash completed his PhD - work that would ultimately revolutionize game theory. It defined a concept that we now call Nash equilibrium, in his honour. Forty-four years later, Nash received the Nobel Prize in economics for the work presented in his 27-page thesis.',
    rawPersian:
      'او بی‌تردید نابغه بود، اما به نظر می‌رسد که خودبزرگ‌بین و به‌شکلی آزاردهنده زودرس نیز بود. زمانی که در پرینستون بود، سرزده نزد آلبرت اینشتین رفت تا به او در این باره که چگونه فیزیک کار کند مشورت بدهد. اینشتین ظاهراً به نش توصیه کرد که اندکی بیشتر دربارهٔ فیزیک بیاموزد. تنها دو سال بعد، نش دورهٔ دکتری خود را به پایان رساند – اثری که در نهایت انقلابی در نظریهٔ بازی‌ها به پا کرد. این رساله مفهومی را تعریف کرد که امروزه به افتخار او تعادل نش می‌نامیم. چهل‌وچهار سال بعد، نش به پاس پژوهشِ ارائه‌شده در رسالهٔ ۲۷ صفحه‌ای خود برندهٔ جایزهٔ نوبل اقتصاد شد.',
    editedPersian:
      'او بی‌تردید نابغه بود، اما به نظر می‌رسد که خودبزرگ‌بین و به‌شکلی آزاردهنده زودرس نیز بود. زمانی که در پرینستون بود، سرزده نزد آلبرت اینشتین رفت تا به او در این باره که چگونه فیزیک کار کند مشورت بدهد. اینشتین ظاهراً به نش توصیه کرد که اندکی بیشتر دربارهٔ فیزیک بیاموزد. تنها دو سال بعد، نش دورهٔ دکتری خود را به پایان رساند – اثری که در نهایت انقلابی در نظریهٔ بازی‌ها به پا کرد. این رساله مفهومی را تعریف کرد که امروزه به افتخار او تعادل نش می‌نامیم. چهل‌وچهار سال بعد، نش به پاس پژوهشِ ارائه‌شده در رسالهٔ ۲۷ صفحه‌ای خود برندهٔ جایزهٔ نوبل اقتصاد شد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-17',
    enId: 'l3-en-17',
    faId: 'l3-fa-17',
    index: 17,
    sourcePage: 3,
    english:
      "The Nash story ought to be one of triumph: we are often prepared to forgive scientists for being precocious and self-important if their work is good enough - and Nash's work was certainly good enough. But Nash's story took a devastating turn within a decade of him completing his ground-breaking PhD. He began to suffer from multiple episodes of paranoid schizophrenia at one time he apparently believed that people wearing red ties were part of a Communist conspiracy. He was repeatedly hospitalized, at times for periods of months on end, throughout the 1960s. In the end, remarkably, he learned to recognize his delusions, and to manage them. 'I became a person of delusionally influenced thinking but of relatively moderate behavior,' he wrote, 'and thus tended to avoid hospitalization and the direct attention of psychiatrists.'10",
    rawPersian:
      'داستان زندگی نش قاعدتاً می‌بایست داستان یک پیروزی باشکوه می‌بود: ما اغلب آماده‌ایم دانشمندان را بابت زودرس بودن و خودبزرگ‌بینی‌شان ببخشیم، به شرط آنکه کار علمی‌شان به اندازهٔ کافی خوب باشد – و کار نش بی‌تردید به اندازهٔ کافی خوب بود. اما داستان زندگی نش در کمتر از یک دهه پس از به پایان رساندن رسالهٔ دکتریِ راه‌گشایش، چرخشی ویرانگر به خود گرفت. او دچار حملات مکرر اسکیزوفرنی پارانوئید شد – در مقطعی ظاهراً بر این باور بود که افرادی که کراوات قرمز می‌زنند بخشی از یک توطئهٔ کمونیستی هستند. او در سراسر دههٔ ۱۹۶۰ بارها، و گاه برای دوره‌هایی چندماهه و پیاپی، در بیمارستان بستری شد. در نهایت، به طرز شگفت‌انگیزی آموخت که هذیان‌های خود را بشناسد و آن‌ها را مدیریت کند. خودش نوشت: «من به انسانی با تفکر متأثر از هذیان اما با رفتاری نسبتاً متعادل تبدیل شدم، و از این رو گرایش یافتم که از بستری شدن در بیمارستان و توجه مستقیم روان‌پزشکان پرهیز کنم.»۱۰',
    editedPersian:
      'داستان زندگی نش قاعدتاً می‌بایست داستان یک پیروزی باشکوه می‌بود: ما اغلب آماده‌ایم دانشمندان را بابت زودرس بودن و خودبزرگ‌بینی‌شان ببخشیم، به شرط آنکه کار علمی‌شان به اندازهٔ کافی خوب باشد – و کار نش بی‌تردید به اندازهٔ کافی خوب بود. اما داستان زندگی نش در کمتر از یک دهه پس از به پایان رساندن رسالهٔ دکتریِ راه‌گشایش، چرخشی ویرانگر به خود گرفت. او دچار حملات مکرر اسکیزوفرنی پارانوئید شد – در مقطعی ظاهراً بر این باور بود که افرادی که کراوات قرمز می‌زنند بخشی از یک توطئهٔ کمونیستی هستند. او در سراسر دههٔ ۱۹۶۰ بارها، و گاه برای دوره‌هایی چندماهه و پیاپی، در بیمارستان بستری شد. در نهایت، به طرز شگفت‌انگیزی آموخت که هذیان‌های خود را بشناسد و آن‌ها را مدیریت کند. خودش نوشت: «من به انسانی با تفکر متأثر از هذیان اما با رفتاری نسبتاً متعادل تبدیل شدم، و از این رو گرایش یافتم که از بستری شدن در بیمارستان و توجه مستقیم روان‌پزشکان پرهیز کنم.»۱۰',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-18',
    enId: 'l3-en-18',
    faId: 'l3-fa-18',
    index: 18,
    sourcePage: 3,
    english:
      "Nash's life and mental turmoil were documented in Sylvia Nasar's excellent 1998 biography A Beautiful Mind, which was improbably (to my mind, anyway) turned into a major 2001 Hollywood movie with beefy Australian actor Russell Crowe in the role of Nash. As is the case with many Hollywood movies, the film deals well with the human elements of the story and woefully with the science. The concept of Nash equilibrium is supposedly revealed to Nash when he and a group of friends are trying to decide which women to approach in a bar: the film makes some howlers when trying to convey what a Nash equilibrium is. So let me see if I can do any better.",
    rawPersian:
      'زندگی و تلاطم‌های ذهنی نش در زندگینامهٔ درخشان سیلویا نصار در سال ۱۹۹۸ با عنوان ذهن زیبا مستند شد،۱۱ کتابی که به‌طرز دور از انتظاری (دست‌کم به گمان من) در سال ۲۰۰۱ به یک فیلم سینمایی بزرگ هالیوودی با بازی راسل کرو، بازیگر تنومند استرالیایی، در نقش نش تبدیل گردید. همچون بسیاری از فیلم‌های هالیوودی، این فیلم نیز به خوبی به عناصر انسانی داستان می‌پردازد و در قبال جنبهٔ علمی آن به‌طرز رقت‌انگیزی ضعیف عمل می‌کند. در فیلم چنین وانمود می‌شود که مفهوم تعادل نش زمانی بر نش الهام می‌شود که او و گروهی از دوستانش در یک میخانه در حال تصمیم‌گیری‌اند که به کدام‌یک از زنان نزدیک شوند: فیلم هنگام تلاش برای رساندن معنای تعادل نش، گاف‌های فاحشی می‌دهد. پس بگذارید ببینم آیا من می‌توانم کار بهتری انجام دهم یا نه.',
    editedPersian:
      'زندگی و تلاطم‌های ذهنی نش در زندگینامهٔ درخشان سیلویا نصار در سال ۱۹۹۸ با عنوان ذهن زیبا مستند شد،۱۱ کتابی که به‌طرز دور از انتظاری (دست‌کم به گمان من) در سال ۲۰۰۱ به یک فیلم سینمایی بزرگ هالیوودی با بازی راسل کرو، بازیگر تنومند استرالیایی، در نقش نش تبدیل گردید. همچون بسیاری از فیلم‌های هالیوودی، این فیلم نیز به خوبی به عناصر انسانی داستان می‌پردازد و در قبال جنبهٔ علمی آن به‌طرز رقت‌انگیزی ضعیف عمل می‌کند. در فیلم چنین وانمود می‌شود که مفهوم تعادل نش زمانی بر نش الهام می‌شود که او و گروهی از دوستانش در یک میخانه در حال تصمیم‌گیری‌اند که به کدام‌یک از زنان نزدیک شوند: فیلم هنگام تلاش برای رساندن معنای تعادل نش، گاف‌های فاحشی می‌دهد. پس بگذارید ببینم آیا من می‌توانم کار بهتری انجام دهم یا نه.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-19',
    enId: 'l3-en-19',
    faId: 'l3-fa-19',
    index: 19,
    sourcePage: 4,
    english:
      "We saw that dominant strategies are a very strong solution for games. The main reason for this is that they make very few assumptions: if you have a dominant strategy, then you don't need to invest any energy in deliberating about what your counterpart will do, because you know that your strategy will be the best response no matter what course of action they take. But the power of the solution is also its weakness: situations in which you have a choice that would be the best thing for all the choices your counterpart might make are relatively rare. It's a great solution when you can apply it - but it is so demanding that you just can't apply it very often. Nash equilibrium weakens this requirement. Suppose you and I are playing a game, and we each make a choice: A is my choice and B is your choice. Then A and B form a Nash equilibrium if I don't regret my choice of A given that you chose B, while at the same time you don't regret your choice of B given that I chose A. In this case, our choices were each a best response to the choice of the other; and when we have this pattern of choices, we have a Nash equilibrium.",
    rawPersian:
      'دیدیم که راهبردهای غالب راه‌حلی بسیار نیرومند برای بازی‌ها هستند. دلیل اصلی این امر آن است که آن‌ها مفروضات بسیار اندکی را پیش می‌کشند: اگر شما یک راهبرد غالب در اختیار داشته باشید، نیازی نیست هیچ انرژی‌ای را صرف سبک‌سنگین کردن اینکه طرف مقابلتان چه خواهد کرد بکنید، زیرا می‌دانید که راهبرد شما صرف‌نظر از اینکه طرف مقابل چه شیوهٔ عملی را در پیش بگیرد، بهترین پاسخ خواهد بود. اما نقطهٔ قوت این راه‌حل، نقطهٔ ضعف آن نیز هست: موقعیت‌هایی که در آن‌ها انتخابی در اختیار دارید که در برابر تمامی انتخاب‌هایی که طرف مقابلتان ممکن است انجام دهد بهترین گزینه باشد، نسبتاً نادرند. هنگامی که بتوانید آن را به کار ببندید راه‌حل فوق‌العاده‌ای است – اما چنان شرایط سخت‌گیرانه‌ای می‌طلبد که عملاً نمی‌توانید چندان زیاد از آن استفاده کنید. تعادل نش این شرط را ملایم‌تر می‌سازد. فرض کنید من و شما مشغول انجام یک بازی هستیم و هر یک دست به انتخابی می‌زنیم: A انتخاب من است و B انتخاب شماست. آنگاه A و B یک تعادل نش را تشکیل می‌دهند اگر با فرض اینکه شما B را برگزیده‌اید، من از انتخاب A توسط خودم پشیمان نشوم، و در همان حال، با فرض اینکه من A را برگزیده‌ام، شما نیز از انتخاب B خودتان پشیمان نشوید. در این حالت، انتخاب هر یک از ما بهترین پاسخ به انتخاب دیگری بوده است؛ و هنگامی که چنین الگویی از انتخاب‌ها داشته باشیم، یک تعادل نش داریم.',
    editedPersian:
      'دیدیم که راهبردهای غالب راه‌حلی بسیار نیرومند برای بازی‌ها هستند. دلیل اصلی این امر آن است که آن‌ها مفروضات بسیار اندکی را پیش می‌کشند: اگر شما یک راهبرد غالب در اختیار داشته باشید، نیازی نیست هیچ انرژی‌ای را صرف سبک‌سنگین کردن اینکه طرف مقابلتان چه خواهد کرد بکنید، زیرا می‌دانید که راهبرد شما صرف‌نظر از اینکه طرف مقابل چه شیوهٔ عملی را در پیش بگیرد، بهترین پاسخ خواهد بود. اما نقطهٔ قوت این راه‌حل، نقطهٔ ضعف آن نیز هست: موقعیت‌هایی که در آن‌ها انتخابی در اختیار دارید که در برابر تمامی انتخاب‌هایی که طرف مقابلتان ممکن است انجام دهد بهترین گزینه باشد، نسبتاً نادرند. هنگامی که بتوانید آن را به کار ببندید راه‌حل فوق‌العاده‌ای است – اما چنان شرایط سخت‌گیرانه‌ای می‌طلبد که عملاً نمی‌توانید چندان زیاد از آن استفاده کنید. تعادل نش این شرط را ملایم‌تر می‌سازد. فرض کنید من و شما مشغول انجام یک بازی هستیم و هر یک دست به انتخابی می‌زنیم: A انتخاب من است و B انتخاب شماست. آنگاه A و B یک تعادل نش را تشکیل می‌دهند اگر با فرض اینکه شما B را برگزیده‌اید، من از انتخاب A توسط خودم پشیمان نشوم، و در همان حال، با فرض اینکه من A را برگزیده‌ام، شما نیز از انتخاب B خودتان پشیمان نشوید. در این حالت، انتخاب هر یک از ما بهترین پاسخ به انتخاب دیگری بوده است؛ و هنگامی که چنین الگویی از انتخاب‌ها داشته باشیم، یک تعادل نش داریم.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-20',
    enId: 'l3-en-20',
    faId: 'l3-fa-20',
    index: 20,
    sourcePage: 4,
    english:
      'Notice the difference with dominant strategies: for A and B to be a dominant strategy equilibrium, A would have had to be a best response to all of your possible choices, and B would have had to be a best response to all of my possible choices. In contrast, in a Nash equilibrium, they are only required to be a best response to each other. The crucial point about Nash equilibrium is that no player has any incentive to make another choice. Thus, Nash equilibria are stable points in games. If I believe that you are about to play your part of a Nash equilibrium, then I would be happy to play my part, and vice versa.',
    rawPersian:
      'به تفاوت آن با راهبردهای غالب دقت کنید: برای آنکه A و B یک تعادل راهبرد غالب باشند، A می‌بایست بهترین پاسخ به همهٔ انتخاب‌های ممکن شما می‌بود، و B نیز می‌بایست بهترین پاسخ به همهٔ انتخاب‌های ممکن من می‌بود. در مقابل، در یک تعادل نش، آن‌ها تنها لازم است که بهترین پاسخ به یکدیگر باشند. نکتهٔ کلیدی دربارهٔ تعادل نش این است که هیچ بازیکنی هیچ انگیزه‌ای برای انجام دادن انتخاب دیگری ندارد. از این رو، تعادل‌های نش نقاط پایدار در بازی‌ها هستند. اگر من باور داشته باشم که شما در آستانهٔ بازی کردن سهم خود از یک تعادل نش هستید، آنگاه من نیز با خرسندی سهم خودم را بازی خواهم کرد، و برعکس.',
    editedPersian:
      'به تفاوت آن با راهبردهای غالب دقت کنید: برای آنکه A و B یک تعادل راهبرد غالب باشند، A می‌بایست بهترین پاسخ به همهٔ انتخاب‌های ممکن شما می‌بود، و B نیز می‌بایست بهترین پاسخ به همهٔ انتخاب‌های ممکن من می‌بود. در مقابل، در یک تعادل نش، آن‌ها تنها لازم است که بهترین پاسخ به یکدیگر باشند. نکتهٔ کلیدی دربارهٔ تعادل نش این است که هیچ بازیکنی هیچ انگیزه‌ای برای انجام دادن انتخاب دیگری ندارد. از این رو، تعادل‌های نش نقاط پایدار در بازی‌ها هستند. اگر من باور داشته باشم که شما در آستانهٔ بازی کردن سهم خود از یک تعادل نش هستید، آنگاه من نیز با خرسندی سهم خودم را بازی خواهم کرد، و برعکس.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-21',
    enId: 'l3-en-21',
    faId: 'l3-fa-21',
    index: 21,
    sourcePage: 4,
    english:
      "Note that a dominant strategy equilibrium must also be a Nash equilibrium, although the reverse is of course not necessarily the case. This means that in the Prisoner's Dilemma mutual confession is a Nash equilibrium as well as a dominant strategy equilibrium.",
    rawPersian:
      'توجه داشته باشید که یک تعادل راهبرد غالب الزاماً باید یک تعادل نش نیز باشد، هرچند عکس این گزاره البته لزوماً برقرار نیست. این بدان معناست که در معمای زندانی، اعتراف متقابل هم یک تعادل نش است و هم یک تعادل راهبرد غالب.',
    editedPersian:
      'توجه داشته باشید که یک تعادل راهبرد غالب الزاماً باید یک تعادل نش نیز باشد، هرچند عکس این گزاره البته لزوماً برقرار نیست. این بدان معناست که در معمای زندانی، اعتراف متقابل هم یک تعادل نش است و هم یک تعادل راهبرد غالب.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-22',
    enId: 'l3-en-22',
    faId: 'l3-fa-22',
    index: 22,
    sourcePage: 5,
    english:
      "We will see in later lessons that Nash took the idea a stage further, and it was this that was so crucial in establishing its power as a solution concept. But for now, what we have above is enough to analyse the Game of Chicken. To check for Nash equilibria in the game, we need to consider each possible combination of choices and ask ourselves whether any player could benefit from moving away from their choice. If the answer is 'yes', then we say that player has a beneficial deviation, and we have established that this combination of choices is not a Nash equilibrium. So, let's take each collection of choices in turn:",
    rawPersian:
      'در درس‌های بعدی خواهیم دید که نش این ایده را یک گام فراتر برد، و همین گام بود که نقشی چنین حیاتی در تثبیت قدرت آن به‌عنوان یک مفهوم حل ایفا کرد. اما در حال حاضر، آنچه در بالا گفتیم برای تحلیل بازی بزدل کافی است. برای بررسی وجود تعادل‌های نش در این بازی، باید تک‌تک ترکیب‌های ممکن از انتخاب‌ها را در نظر بگیریم و از خود بپرسیم آیا هیچ‌یک از بازیکنان می‌تواند از فاصله گرفتن از انتخاب خود سودی ببرد یا نه. اگر پاسخ «بله» باشد، آنگاه می‌گوییم آن بازیکن یک انحراف سودمند دارد، و ثابت کرده‌ایم که این ترکیب از انتخاب‌ها یک تعادل نش نیست. پس بیایید هر مجموعه از انتخاب‌ها را به نوبت بررسی کنیم:',
    editedPersian:
      'در درس‌های بعدی خواهیم دید که نش این ایده را یک گام فراتر برد، و همین گام بود که نقشی چنین حیاتی در تثبیت قدرت آن به‌عنوان یک مفهوم حل ایفا کرد. اما در حال حاضر، آنچه در بالا گفتیم برای تحلیل بازی بزدل کافی است. برای بررسی وجود تعادل‌های نش در این بازی، باید تک‌تک ترکیب‌های ممکن از انتخاب‌ها را در نظر بگیریم و از خود بپرسیم آیا هیچ‌یک از بازیکنان می‌تواند از فاصله گرفتن از انتخاب خود سودی ببرد یا نه. اگر پاسخ «بله» باشد، آنگاه می‌گوییم آن بازیکن یک انحراف سودمند دارد، و ثابت کرده‌ایم که این ترکیب از انتخاب‌ها یک تعادل نش نیست. پس بیایید هر مجموعه از انتخاب‌ها را به نوبت بررسی کنیم:',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-23',
    enId: 'l3-en-23',
    faId: 'l3-fa-23',
    index: 23,
    sourcePage: 5,
    english: '• Jim drives straight; Buzz drives straight.',
    rawPersian: '• جیم مستقیم می‌راند؛ باز مستقیم می‌راند.',
    editedPersian: '• جیم مستقیم می‌راند؛ باز مستقیم می‌راند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-24',
    enId: 'l3-en-24',
    faId: 'l3-fa-24',
    index: 24,
    sourcePage: 5,
    english:
      'Both players have a beneficial deviation in this case: if Buzz were to drive straight, then Jim would do better to jump clear; and if Jim were to drive straight, Buzz would do better to jump clear. So this is not a Nash equilibrium.',
    rawPersian:
      'در این حالت هر دو بازیکن یک انحراف سودمند دارند: اگر قرار بود باز مستقیم براند، آنگاه برای جیم بهتر می‌بود که بیرون بپرد؛ و اگر قرار بود جیم مستقیم براند، برای باز بهتر می‌بود که بیرون بپرد. بنابراین این وضعیت یک تعادل نش نیست.',
    editedPersian:
      'در این حالت هر دو بازیکن یک انحراف سودمند دارند: اگر قرار بود باز مستقیم براند، آنگاه برای جیم بهتر می‌بود که بیرون بپرد؛ و اگر قرار بود جیم مستقیم براند، برای باز بهتر می‌بود که بیرون بپرد. بنابراین این وضعیت یک تعادل نش نیست.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-25',
    enId: 'l3-en-25',
    faId: 'l3-fa-25',
    index: 25,
    sourcePage: 5,
    english: '• Jim jumps clear; Buzz jumps clear.',
    rawPersian: '• جیم بیرون می‌پرد؛ باز بیرون می‌پرد.',
    editedPersian: '• جیم بیرون می‌پرد؛ باز بیرون می‌پرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-26',
    enId: 'l3-en-26',
    faId: 'l3-fa-26',
    index: 26,
    sourcePage: 5,
    english:
      'Again, both players have a beneficial deviation. If Buzz is going to be a chicken, then Jim would do better to hang on a moment longer and be proven the bravest. Similarly, if Jim is going to be a chicken, then Buzz would do better to drive straight. So this is not a Nash equilibrium.',
    rawPersian:
      'باز هم، هر دو بازیکن یک انحراف سودمند دارند. اگر قرار باشد باز بزدل از آب درآید، آنگاه برای جیم بهتر خواهد بود که یک لحظه بیشتر دوام بیاورد و شجاع‌ترین شناخته شود. به همین سان، اگر قرار باشد جیم بزدل شود، آنگاه برای باز بهتر خواهد بود که مستقیم براند. بنابراین این وضعیت نیز یک تعادل نش نیست.',
    editedPersian:
      'باز هم، هر دو بازیکن یک انحراف سودمند دارند. اگر قرار باشد باز بزدل از آب درآید، آنگاه برای جیم بهتر خواهد بود که یک لحظه بیشتر دوام بیاورد و شجاع‌ترین شناخته شود. به همین سان، اگر قرار باشد جیم بزدل شود، آنگاه برای باز بهتر خواهد بود که مستقیم براند. بنابراین این وضعیت نیز یک تعادل نش نیست.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-27',
    enId: 'l3-en-27',
    faId: 'l3-fa-27',
    index: 27,
    sourcePage: 5,
    english: '• Jim drives straight; Buzz jumps clear.',
    rawPersian: '• جیم مستقیم می‌راند؛ باز بیرون می‌پرد.',
    editedPersian: '• جیم مستقیم می‌راند؛ باز بیرون می‌پرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-28',
    enId: 'l3-en-28',
    faId: 'l3-fa-28',
    index: 28,
    sourcePage: 5,
    english:
      "We have one! Neither player can benefit from doing anything else. If Buzz were to drive straight also, then they'd both go over the cliff. If Jim were to jump clear as well, then they'd both be proved chicken.",
    rawPersian:
      'یکی پیدا کردیم! هیچ‌یک از دو بازیکن نمی‌تواند از انجام دادن کار دیگری سودی ببرد. اگر قرار بود باز هم مستقیم براند، آنگاه هر دو از لبهٔ پرتگاه سقوط می‌کردند. اگر قرار بود جیم هم بیرون بپرد، آنگاه بزدل بودنِ هر دو ثابت می‌شد.',
    editedPersian:
      'یکی پیدا کردیم! هیچ‌یک از دو بازیکن نمی‌تواند از انجام دادن کار دیگری سودی ببرد. اگر قرار بود باز هم مستقیم براند، آنگاه هر دو از لبهٔ پرتگاه سقوط می‌کردند. اگر قرار بود جیم هم بیرون بپرد، آنگاه بزدل بودنِ هر دو ثابت می‌شد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-29',
    enId: 'l3-en-29',
    faId: 'l3-fa-29',
    index: 29,
    sourcePage: 5,
    english: '• Jim jumps clear; Buzz drives straight.',
    rawPersian: '• جیم بیرون می‌پرد؛ باز مستقیم می‌راند.',
    editedPersian: '• جیم بیرون می‌پرد؛ باز مستقیم می‌راند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-30',
    enId: 'l3-en-30',
    faId: 'l3-fa-30',
    index: 30,
    sourcePage: 5,
    english: 'Again, we have a Nash equilibrium, by the same argument.',
    rawPersian: 'باز هم، بنا بر همان استدلال، یک تعادل نش داریم.',
    editedPersian: 'باز هم، بنا بر همان استدلال، یک تعادل نش داریم.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-31',
    enId: 'l3-en-31',
    faId: 'l3-fa-31',
    index: 31,
    sourcePage: 5,
    english:
      'So, in the Game of Chicken there are two Nash equilibria: in each of these, one player drives straight while the other jumps clear. In the movie, of course, fate intervenes and prevents the wisdom of Nash from helping to choose the outcome.',
    rawPersian:
      'بنابراین، در بازی بزدل دو تعادل نش وجود دارد: در هر یک از آن‌ها، یک بازیکن مستقیم می‌راند در حالی که دیگری بیرون می‌پرد. البته در فیلم، دست تقدیر مداخله می‌کند و مانع از آن می‌شود که خردِ نش به برگزیدن پیامد یاری رساند.',
    editedPersian:
      'بنابراین، در بازی بزدل دو تعادل نش وجود دارد: در هر یک از آن‌ها، یک بازیکن مستقیم می‌راند در حالی که دیگری بیرون می‌پرد. البته در فیلم، دست تقدیر مداخله می‌کند و مانع از آن می‌شود که خردِ نش به برگزیدن پیامد یاری رساند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-32',
    enId: 'l3-en-32',
    faId: 'l3-fa-32',
    index: 32,
    sourcePage: 5,
    english:
      "Observe that this means each player choosing to do the opposite of the other player's choice. So, assuming Jim is a rational player, it would pay for him to try to figure out what Buzz will do and then do the opposite of that. A rational Buzz would do likewise.",
    rawPersian:
      'دقت کنید که این امر بدین معناست که هر بازیکن انجام دادن کارِ متضاد با انتخاب بازیکن دیگر را برمی‌گزیند. بنابراین، با فرض اینکه جیم بازیکنی عقلانی است، برایش به‌صرفه خواهد بود که بکوشد سر دربیاورد باز چه خواهد کرد و سپس عکس آن را انجام دهد. یک بازِ عقلانی نیز به همین ترتیب عمل خواهد کرد.',
    editedPersian:
      'دقت کنید که این امر بدین معناست که هر بازیکن انجام دادن کارِ متضاد با انتخاب بازیکن دیگر را برمی‌گزیند. بنابراین، با فرض اینکه جیم بازیکنی عقلانی است، برایش به‌صرفه خواهد بود که بکوشد سر دربیاورد باز چه خواهد کرد و سپس عکس آن را انجام دهد. یک بازِ عقلانی نیز به همین ترتیب عمل خواهد کرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-33',
    enId: 'l3-en-33',
    faId: 'l3-fa-33',
    index: 33,
    sourcePage: 6,
    english:
      'While Nash equilibrium has helped us to isolate the possible rational outcomes of the game, it still leaves us with quite a big problem. The game has two Nash equilibria. How do the players know which one to head for? This is called an equilibrium selection problem. In the Game of Chicken, the equilibrium selection problem is particularly pernicious, because if the players assess their opponent incorrectly (if they think they are chicken when in fact they are not), then the consequences can be disastrous. If Jim mistakenly believes Buzz is a chicken and decides to drive straight, then they will both go over the cliff.',
    rawPersian:
      'اگرچه تعادل نش به ما کمک کرده است تا پیامدهای عقلانیِ ممکنِ بازی را جدا و مشخص کنیم، اما همچنان ما را با مشکل نسبتاً بزرگی تنها می‌گذارد. این بازی دارای دو تعادل نش است. بازیکنان از کجا بدانند باید به سمت کدام‌یک بروند؟ به این وضعیت مسئلهٔ انتخاب تعادل می‌گویند. در بازی بزدل، مسئلهٔ انتخاب تعادل به‌ویژه خطرناک و مهلک است، زیرا اگر بازیکنان رقیب خود را به نادرستی ارزیابی کنند (اگر گمان کنند که طرف مقابل بزدل است در حالی که در واقع چنین نیست)، آنگاه پیامدها می‌توانند فاجعه‌بار باشند. اگر جیم به اشتباه گمان کند که باز بزدل است و تصمیم بگیرد مستقیم براند، آنگاه هر دوی آن‌ها از لبهٔ پرتگاه سقوط خواهند کرد.',
    editedPersian:
      'اگرچه تعادل نش به ما کمک کرده است تا پیامدهای عقلانیِ ممکنِ بازی را جدا و مشخص کنیم، اما همچنان ما را با مشکل نسبتاً بزرگی تنها می‌گذارد. این بازی دارای دو تعادل نش است. بازیکنان از کجا بدانند باید به سمت کدام‌یک بروند؟ به این وضعیت مسئلهٔ انتخاب تعادل می‌گویند. در بازی بزدل، مسئلهٔ انتخاب تعادل به‌ویژه خطرناک و مهلک است، زیرا اگر بازیکنان رقیب خود را به نادرستی ارزیابی کنند (اگر گمان کنند که طرف مقابل بزدل است در حالی که در واقع چنین نیست)، آنگاه پیامدها می‌توانند فاجعه‌بار باشند. اگر جیم به اشتباه گمان کند که باز بزدل است و تصمیم بگیرد مستقیم براند، آنگاه هر دوی آن‌ها از لبهٔ پرتگاه سقوط خواهند کرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-34',
    enId: 'l3-en-34',
    faId: 'l3-fa-34',
    index: 34,
    sourcePage: 6,
    english:
      "When the Game of Chicken is played in real life, we see several ways in which equilibrium selection problems are resolved (we'll hear more about equilibrium selection in Lesson 7). For example, we might expect to see the players signalling to each other in advance about which Nash equilibrium they are going to head for. All the big talk that the teenagers produce about how brave and tough they are, and how much the other player is a chicken: that's signalling. Jim might choose to get hopelessly drunk, for example making sure that Buzz witnesses his recklessness: a signal to Buzz that Jim is going to drive straight.",
    rawPersian:
      'هنگامی که بازی بزدل در زندگی واقعی انجام می‌شود، شیوه‌های گوناگونی را می‌بینیم که از طریق آن‌ها مسائل انتخاب تعادل حل‌وفصل می‌شوند (در درس ۷ بیشتر دربارهٔ انتخاب تعادل خواهیم شنید). برای نمونه، ممکن است انتظار داشته باشیم ببینیم که بازیکنان از پیش دربارهٔ اینکه قصد دارند به سوی کدام تعادل نش حرکت کنند، به یکدیگر علامت‌دهی می‌کنند. تمامی رجزخوانی‌ها و لاف‌زنی‌هایی که آن نوجوانان دربارهٔ اینکه چقدر شجاع و سرسخت هستند و بازیکن دیگر چقدر بزدل است سر می‌دهند: همهٔ این‌ها علامت‌دهی است. برای مثال، جیم ممکن است تصمیم بگیرد تا حد بی‌خودی مست کند – و مطمئن شود که باز شاهد بی‌پروایی اوست: علامتی به باز مبنی بر اینکه جیم قصد دارد مستقیم براند.',
    editedPersian:
      'هنگامی که بازی بزدل در زندگی واقعی انجام می‌شود، شیوه‌های گوناگونی را می‌بینیم که از طریق آن‌ها مسائل انتخاب تعادل حل‌وفصل می‌شوند (در درس ۷ بیشتر دربارهٔ انتخاب تعادل خواهیم شنید). برای نمونه، ممکن است انتظار داشته باشیم ببینیم که بازیکنان از پیش دربارهٔ اینکه قصد دارند به سوی کدام تعادل نش حرکت کنند، به یکدیگر علامت‌دهی می‌کنند. تمامی رجزخوانی‌ها و لاف‌زنی‌هایی که آن نوجوانان دربارهٔ اینکه چقدر شجاع و سرسخت هستند و بازیکن دیگر چقدر بزدل است سر می‌دهند: همهٔ این‌ها علامت‌دهی است. برای مثال، جیم ممکن است تصمیم بگیرد تا حد بی‌خودی مست کند – و مطمئن شود که باز شاهد بی‌پروایی اوست: علامتی به باز مبنی بر اینکه جیم قصد دارد مستقیم براند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-35',
    enId: 'l3-en-35',
    faId: 'l3-fa-35',
    index: 35,
    sourcePage: 6,
    english:
      "We see signalling all the time in international relations. In the end, both parties must weigh up these signals and make a judgement call about where their counterpart is heading. The problem with signals, of course, is that they are just that: nothing more than signals. They don't force the players to make the choice they have signalled. So, another common feature of the Game of Chicken when played in the wild is that players will commit to certain choices. For example, Buzz could tear the steering wheel out of the car or put a very heavy weight on the accelerator. In so doing, Buzz is committing to a course of action; rationally, Jim should then respond by choosing to do the opposite.",
    rawPersian:
      'ما علامت‌دهی را همواره در روابط بین‌الملل می‌بینیم. در نهایت، هر دو طرف باید این علامت‌ها را سبک‌سنگین کنند و دربارهٔ اینکه طرف مقابلشان به کدام سو می‌رود دست به قضاوت بزنند. البته مشکلِ علامت‌ها این است که آن‌ها فقط همین هستند: چیزی بیش از علامت نیستند. آن‌ها بازیکنان را مجبور نمی‌کنند انتخابی را انجام دهند که علامتش را فرستاده‌اند. از این رو، یکی دیگر از ویژگی‌های رایج بازی بزدل هنگامی که در دنیای واقعی انجام می‌شود آن است که بازیکنان خود را به انتخاب‌های معینی متعهد می‌سازند. برای نمونه، باز می‌توانست فرمان خودرو را از جا بکند یا وزنهٔ بسیار سنگینی را روی پدال گاز بگذارد. با انجام این کار، باز خود را به یک شیوهٔ عمل متعهد می‌کند؛ در این صورت، جیم از سر عقلانیت باید با برگزیدنِ انجام کارِ متضاد واکنش نشان دهد.',
    editedPersian:
      'ما علامت‌دهی را همواره در روابط بین‌الملل می‌بینیم. در نهایت، هر دو طرف باید این علامت‌ها را سبک‌سنگین کنند و دربارهٔ اینکه طرف مقابلشان به کدام سو می‌رود دست به قضاوت بزنند. البته مشکلِ علامت‌ها این است که آن‌ها فقط همین هستند: چیزی بیش از علامت نیستند. آن‌ها بازیکنان را مجبور نمی‌کنند انتخابی را انجام دهند که علامتش را فرستاده‌اند. از این رو، یکی دیگر از ویژگی‌های رایج بازی بزدل هنگامی که در دنیای واقعی انجام می‌شود آن است که بازیکنان خود را به انتخاب‌های معینی متعهد می‌سازند. برای نمونه، باز می‌توانست فرمان خودرو را از جا بکند یا وزنهٔ بسیار سنگینی را روی پدال گاز بگذارد. با انجام این کار، باز خود را به یک شیوهٔ عمل متعهد می‌کند؛ در این صورت، جیم از سر عقلانیت باید با برگزیدنِ انجام کارِ متضاد واکنش نشان دهد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-36',
    enId: 'l3-en-36',
    faId: 'l3-fa-36',
    index: 36,
    sourcePage: 6,
    english:
      'The use of signalling and commitment devices highlights the second main danger with the Game of Chicken: escalation. Ultimately, to get to one of the Nash equilibria in the game, one side is going to have to blink. But if both sides progressively send out stronger signals and make stronger commitments, then there is a risk of both sides irrevocably committing to drive straight, with the result that they both go over the cliff.',
    rawPersian:
      'استفاده از ابزارهای علامت‌دهی و تعهد، دومین خطر اصلی در بازی بزدل را برجسته می‌سازد: تشدید تنش. در نهایت، برای رسیدن به یکی از تعادل‌های نش در بازی، یکی از دو طرف ناگزیر خواهد بود کوتاه بیاید و جا بزند. اما اگر هر دو طرف به‌تدریج علامت‌های قوی‌تری بفرستند و تعهدهای محکم‌تری بدهند، آنگاه این خطر وجود دارد که هر دو طرف به شکلی برگشت‌ناپذیر خود را به مستقیم راندن متعهد سازند، با این نتیجه که هر دو از لبهٔ پرتگاه سقوط کنند.',
    editedPersian:
      'استفاده از ابزارهای علامت‌دهی و تعهد، دومین خطر اصلی در بازی بزدل را برجسته می‌سازد: تشدید تنش. در نهایت، برای رسیدن به یکی از تعادل‌های نش در بازی، یکی از دو طرف ناگزیر خواهد بود کوتاه بیاید و جا بزند. اما اگر هر دو طرف به‌تدریج علامت‌های قوی‌تری بفرستند و تعهدهای محکم‌تری بدهند، آنگاه این خطر وجود دارد که هر دو طرف به شکلی برگشت‌ناپذیر خود را به مستقیم راندن متعهد سازند، با این نتیجه که هر دو از لبهٔ پرتگاه سقوط کنند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-37',
    enId: 'l3-en-37',
    faId: 'l3-fa-37',
    index: 37,
    sourcePage: 6,
    english:
      "The Game of Chicken highlights an important feature of Nash equilibrium: the concept hinges on the beliefs that you have about the other player. If Jim believes Buzz is going to drive straight, then Jim should jump clear; if Buzz believes Jim is going to jump clear, then he should drive straight. This is in sharp contrast to the dominant strategies we saw in the Prisoner's Dilemma: they made no assumptions about the beliefs of players.",
    rawPersian:
      'بازی بزدل یکی از ویژگی‌های مهم تعادل نش را برجسته می‌سازد: این مفهوم بر مدار باورهایی می‌چرخد که شما دربارهٔ بازیکن دیگر دارید. اگر جیم باور داشته باشد که باز قرار است مستقیم براند، آنگاه جیم باید بیرون بپرد؛ اگر باز باور داشته باشد که جیم قرار است بیرون بپرد، آنگاه او باید مستقیم براند. این امر در تضاد آشکار با راهبردهای غالبی است که در معمای زندانی دیدیم: آن‌ها هیچ پیش‌فرضی دربارهٔ باورهای بازیکنان نداشتند.',
    editedPersian:
      'بازی بزدل یکی از ویژگی‌های مهم تعادل نش را برجسته می‌سازد: این مفهوم بر مدار باورهایی می‌چرخد که شما دربارهٔ بازیکن دیگر دارید. اگر جیم باور داشته باشد که باز قرار است مستقیم براند، آنگاه جیم باید بیرون بپرد؛ اگر باز باور داشته باشد که جیم قرار است بیرون بپرد، آنگاه او باید مستقیم براند. این امر در تضاد آشکار با راهبردهای غالبی است که در معمای زندانی دیدیم: آن‌ها هیچ پیش‌فرضی دربارهٔ باورهای بازیکنان نداشتند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-38',
    enId: 'l3-en-38',
    faId: 'l3-fa-38',
    index: 38,
    sourcePage: 7,
    english:
      "We saw that the Prisoner's Dilemma seems to be very common in the real world, and, as you might by now have guessed, the Game of Chicken is also very common. The most terrifying Game of Chicken in recorded history played out in the Cuban Missile Crisis of October 1962. If the USA and the USSR had both chosen to drive straight during this crisis, then the result would been calamitous: nuclear war between the world's two superpowers.",
    rawPersian:
      'دیدیم که معمای زندانی در دنیای واقعی بسیار رایج به نظر می‌رسد، و همان‌طور که تاکنون شاید حدس زده باشید، بازی بزدل نیز بسیار رایج است. هولناک‌ترین بازی بزدل در تاریخ مکتوب بشر در بحران موشکی کوبا در اکتبر ۱۹۶۲ رقم خورد. اگر ایالات متحدهٔ آمریکا و اتحاد جماهیر شوروی هر دو در جریان این بحران مستقیم راندن را برگزیده بودند، آنگاه نتیجه فاجعه‌بار می‌بود: جنگ هسته‌ای میان دو ابرقدرت جهان.',
    editedPersian:
      'دیدیم که معمای زندانی در دنیای واقعی بسیار رایج به نظر می‌رسد، و همان‌طور که تاکنون شاید حدس زده باشید، بازی بزدل نیز بسیار رایج است. هولناک‌ترین بازی بزدل در تاریخ مکتوب بشر در بحران موشکی کوبا در اکتبر ۱۹۶۲ رقم خورد. اگر ایالات متحدهٔ آمریکا و اتحاد جماهیر شوروی هر دو در جریان این بحران مستقیم راندن را برگزیده بودند، آنگاه نتیجه فاجعه‌بار می‌بود: جنگ هسته‌ای میان دو ابرقدرت جهان.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-39',
    enId: 'l3-en-39',
    faId: 'l3-fa-39',
    index: 39,
    sourcePage: 7,
    english:
      'The missile crisis occurred at the peak of the Cold War, in which the USA and USSR were the chief protagonists. The crisis had its origins in two key events. First, in 1961, the USA deployed nuclear missile bases in Turkey - directly on the border with Soviet Russia. If these missiles had been used, then Russia would in effect have had no warning of an incoming nuclear attack. Second, in April 1961, alarmed by the presence of a Communist regime in Cuba, just 100 miles from the Florida coast, the CIA supported an attempt by Cuban exiles to invade Cuba and overthrow Fidel Castro. The Bay of Pigs Invasion, as it became known, was a disastrous failure and a huge source of embarrassment to the administration of John F. Kennedy. But in Cuba, it raised serious concerns that the US might follow it up with a more decisive invasion attempt.',
    rawPersian:
      'بحران موشکی در اوج دوران جنگ سرد رخ داد، دورانی که در آن ایالات متحدهٔ آمریکا و اتحاد جماهیر شوروی بازیگران اصلی صحنه بودند. ریشه‌های این بحران به دو رویداد کلیدی بازمی‌گشت. نخست آنکه در سال ۱۹۶۱، ایالات متحده پایگاه‌های موشکی هسته‌ای را در ترکیه مستقر کرد – درست در مرز با روسیهٔ شوروی. اگر این موشک‌ها به کار گرفته می‌شدند، آنگاه روسیه عملاً هیچ هشداری از یک حملهٔ هسته‌ایِ در راه دریافت نمی‌کرد. دوم آنکه در آوریل ۱۹۶۱، سازمان سیا که از حضور یک رژیم کمونیستی در کوبا، در فاصلهٔ تنها ۱۰۰ مایلی ساحل فلوریدا، به هراس افتاده بود، از تلاش تبعیدیان کوبایی برای حمله به کوبا و سرنگون ساختن فیدل کاسترو حمایت کرد. «حمله به خلیج خوک‌ها»، چنان‌که بعدها به این نام شهرت یافت، شکستی فاجعه‌بار و مایهٔ سرافکندگی بزرگی برای دولت جان اف. کندی بود. اما در کوبا، این واقعه نگرانی‌های جدی‌ای را برانگیخت مبنی بر اینکه ایالات متحده ممکن است آن را با تلاش قاطعانه‌تری برای تهاجم پی بگیرد.',
    editedPersian:
      'بحران موشکی در اوج دوران جنگ سرد رخ داد، دورانی که در آن ایالات متحدهٔ آمریکا و اتحاد جماهیر شوروی بازیگران اصلی صحنه بودند. ریشه‌های این بحران به دو رویداد کلیدی بازمی‌گشت. نخست آنکه در سال ۱۹۶۱، ایالات متحده پایگاه‌های موشکی هسته‌ای را در ترکیه مستقر کرد – درست در مرز با روسیهٔ شوروی. اگر این موشک‌ها به کار گرفته می‌شدند، آنگاه روسیه عملاً هیچ هشداری از یک حملهٔ هسته‌ایِ در راه دریافت نمی‌کرد. دوم آنکه در آوریل ۱۹۶۱، سازمان سیا که از حضور یک رژیم کمونیستی در کوبا، در فاصلهٔ تنها ۱۰۰ مایلی ساحل فلوریدا، به هراس افتاده بود، از تلاش تبعیدیان کوبایی برای حمله به کوبا و سرنگون ساختن فیدل کاسترو حمایت کرد. «حمله به خلیج خوک‌ها»، چنان‌که بعدها به این نام شهرت یافت، شکستی فاجعه‌بار و مایهٔ سرافکندگی بزرگی برای دولت جان اف. کندی بود. اما در کوبا، این واقعه نگرانی‌های جدی‌ای را برانگیخت مبنی بر اینکه ایالات متحده ممکن است آن را با تلاش قاطعانه‌تری برای تهاجم پی بگیرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-40',
    enId: 'l3-en-40',
    faId: 'l3-fa-40',
    index: 40,
    sourcePage: 7,
    english:
      'Following these two events, Soviet Premier Nikita Khrushchev became convinced that deploying Soviet nuclear missiles in Cuba would serve two roles. First, the presence of the missiles would act to deter any further invasion attempt by the US. Second, it would give the USSR a nuclear strike capability effectively on the border with the US - just as the US had with their missile bases in Turkey.',
    rawPersian:
      'به دنبال این دو رویداد، نخست‌وزیر شوروی، نیکیتا خروشچف، متقاعد شد که استقرار موشک‌های هسته‌ای شوروی در کوبا دو کارکرد خواهد داشت. نخست، حضور این موشک‌ها نقش بازدارنده‌ای در برابر هرگونه تلاش بیشتر ایالات متحده برای تهاجم ایفا می‌کرد. دوم، این کار عملاً قابلیت ضربهٔ هسته‌ای در مرز با ایالات متحده را در اختیار اتحاد جماهیر شوروی قرار می‌داد – درست همان امتیازی که ایالات متحده با پایگاه‌های موشکی خود در ترکیه از آن برخوردار بود.',
    editedPersian:
      'به دنبال این دو رویداد، نخست‌وزیر شوروی، نیکیتا خروشچف، متقاعد شد که استقرار موشک‌های هسته‌ای شوروی در کوبا دو کارکرد خواهد داشت. نخست، حضور این موشک‌ها نقش بازدارنده‌ای در برابر هرگونه تلاش بیشتر ایالات متحده برای تهاجم ایفا می‌کرد. دوم، این کار عملاً قابلیت ضربهٔ هسته‌ای در مرز با ایالات متحده را در اختیار اتحاد جماهیر شوروی قرار می‌داد – درست همان امتیازی که ایالات متحده با پایگاه‌های موشکی خود در ترکیه از آن برخوردار بود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-41',
    enId: 'l3-en-41',
    faId: 'l3-fa-41',
    index: 41,
    sourcePage: 7,
    english:
      'Deployment began in secret in the first half of 1962, with the first missiles arriving in September of that year. By this stage it seems the CIA were already suspicious that something was afoot, and their suspicions were confirmed when pictures taken by a U-2 spy plane in mid-October revealed missile bases under construction.',
    rawPersian:
      'استقرار موشک‌ها به‌طور محرمانه در نیمهٔ نخست سال ۱۹۶۲ آغاز شد و نخستین موشک‌ها در سپتامبر همان سال به کوبا رسیدند. به نظر می‌رسد که تا این مرحله سازمان سیا پیشاپیش به اینکه ماجرایی در جریان است مشکوک شده بود، و هنگامی که عکس‌های گرفته‌شده توسط یک هواپیمای جاسوسی U-2 در اواسط اکتبر پایگاه‌های موشکیِ در دست ساخت را آشکار کرد، سوءظن آن‌ها تأیید شد.',
    editedPersian:
      'استقرار موشک‌ها به‌طور محرمانه در نیمهٔ نخست سال ۱۹۶۲ آغاز شد و نخستین موشک‌ها در سپتامبر همان سال به کوبا رسیدند. به نظر می‌رسد که تا این مرحله سازمان سیا پیشاپیش به اینکه ماجرایی در جریان است مشکوک شده بود، و هنگامی که عکس‌های گرفته‌شده توسط یک هواپیمای جاسوسی U-2 در اواسط اکتبر پایگاه‌های موشکیِ در دست ساخت را آشکار کرد، سوءظن آن‌ها تأیید شد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-42',
    enId: 'l3-en-42',
    faId: 'l3-fa-42',
    index: 42,
    sourcePage: 7,
    english:
      "Alarmed by the prospect of a Soviet nuclear launch capability so close to US soil, Kennedy's team considered a range of possible responses, from 'do nothing' up to a full military intervention (invading Cuba). Opinions within the Kennedy camp seem to have been mixed there was, apparently, a vocal group in support of military action. In the event, Kennedy decided that a suitable response would be a naval blockade. In doing so, he was already treading on thin ice: a blockade can be regarded as an act of war, and so his team constructed a (rather questionable) legal argument that what they were doing was a justified 'quarantine' action, which fell short of an act of war.",
    rawPersian:
      'تیم کندی که از چشم‌اندازِ وجود قابلیت پرتاب هسته‌ای شوروی در چنین فاصلهٔ نزدیکی از خاک ایالات متحده به هراس افتاده بود، طیف گسترده‌ای از واکنش‌های ممکن را، از «انجام ندادن هیچ کاری» تا مداخلهٔ نظامی کامل (تهاجم به کوبا)، مورد بررسی قرار داد. به نظر می‌رسد دیدگاه‌ها در اردوگاه کندی یکدست نبود – ظاهراً گروه پرسرصدایی وجود داشت که از اقدام نظامی حمایت می‌کرد. سرانجام، کندی تصمیم گرفت که واکنش مناسب، محاصرهٔ دریایی خواهد بود. او با انجام این کار نیز عملاً بر روی یخ نازکی گام برمی‌داشت: محاصرهٔ دریایی می‌تواند اقدامی جنگی تلقی شود، و به همین دلیل تیم او استدلال حقوقیِ (نسبتاً محل تردیدی) سرهم کرد مبنی بر اینکه آنچه انجام می‌دهند یک اقدام موجهِ «قرنطینه» است که پایین‌تر از سطح یک اقدام جنگی قرار می‌گیرد.',
    editedPersian:
      'تیم کندی که از چشم‌اندازِ وجود قابلیت پرتاب هسته‌ای شوروی در چنین فاصلهٔ نزدیکی از خاک ایالات متحده به هراس افتاده بود، طیف گسترده‌ای از واکنش‌های ممکن را، از «انجام ندادن هیچ کاری» تا مداخلهٔ نظامی کامل (تهاجم به کوبا)، مورد بررسی قرار داد. به نظر می‌رسد دیدگاه‌ها در اردوگاه کندی یکدست نبود – ظاهراً گروه پرسرصدایی وجود داشت که از اقدام نظامی حمایت می‌کرد. سرانجام، کندی تصمیم گرفت که واکنش مناسب، محاصرهٔ دریایی خواهد بود. او با انجام این کار نیز عملاً بر روی یخ نازکی گام برمی‌داشت: محاصرهٔ دریایی می‌تواند اقدامی جنگی تلقی شود، و به همین دلیل تیم او استدلال حقوقیِ (نسبتاً محل تردیدی) سرهم کرد مبنی بر اینکه آنچه انجام می‌دهند یک اقدام موجهِ «قرنطینه» است که پایین‌تر از سطح یک اقدام جنگی قرار می‌گیرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-43',
    enId: 'l3-en-43',
    faId: 'l3-fa-43',
    index: 43,
    sourcePage: 8,
    english:
      'The crisis escalated. On 22 October, Kennedy made a speech to the American people in which he declared US commitment to prevent the deployment of the missiles. On 24 October, the USSR responded by publicly stating that the US actions would lead to war. By 25 October, for the first time ever, the US Strategic Air Command had moved to Defense Readiness Condition Two DEFCON-2 meaning that they were effectively prepared for war. B-52 bombers were in the air, ready to be deployed to their targets. On 27 October, a Soviet submarine came very close to firing a nuclear torpedo, believing that war had already started - it was only the refusal of one officer, Vasili Arkhipov, to agree to the attack that prevented the launch. 12 Elsewhere, an accidental overfly of Russian territory by a US spy plane nearly led to direct conflict between Russian and US aircraft.',
    rawPersian:
      'بحران بالا گرفت و تشدید شد. در ۲۲ اکتبر، کندی نطقی خطاب به مردم آمریکا ایراد کرد و در آن تعهد ایالات متحده را به جلوگیری از استقرار آن موشک‌ها اعلام داشت. در ۲۴ اکتبر، اتحاد جماهیر شوروی با اعلام علنیِ اینکه اقدامات ایالات متحده به جنگ خواهد انجامید، واکنش نشان داد. تا ۲۵ اکتبر، برای نخستین بار در تاریخ، فرماندهی هوایی راهبردی ایالات متحده به «وضعیت آمادگی دفاعی دو» – یعنی DEFCON-2 – منتقل شده بود، بدین معنا که آن‌ها عملاً آمادهٔ جنگ بودند. بمب‌افکن‌های B-52 در آسمان در پرواز بودند و آمادهٔ اعزام به سوی اهداف خود. در ۲۷ اکتبر، یک زیردریایی شوروی با این گمان که جنگ پیشاپیش آغاز شده است، بسیار به شلیک یک اژدر هسته‌ای نزدیک شد – و تنها خودداری یک افسر، به نام واسیلی آرخیپوف، از موافقت با حمله بود که مانع از شلیک آن شد.۱۲ در جایی دیگر، پرواز تصادفی یک هواپیمای جاسوسی ایالات متحده بر فراز قلمرو روسیه نزدیک بود به درگیری مستقیم میان هواپیماهای روسی و آمریکایی بینجامد.',
    editedPersian:
      'بحران بالا گرفت و تشدید شد. در ۲۲ اکتبر، کندی نطقی خطاب به مردم آمریکا ایراد کرد و در آن تعهد ایالات متحده را به جلوگیری از استقرار آن موشک‌ها اعلام داشت. در ۲۴ اکتبر، اتحاد جماهیر شوروی با اعلام علنیِ اینکه اقدامات ایالات متحده به جنگ خواهد انجامید، واکنش نشان داد. تا ۲۵ اکتبر، برای نخستین بار در تاریخ، فرماندهی هوایی راهبردی ایالات متحده به «وضعیت آمادگی دفاعی دو» – یعنی DEFCON-2 – منتقل شده بود، بدین معنا که آن‌ها عملاً آمادهٔ جنگ بودند. بمب‌افکن‌های B-52 در آسمان در پرواز بودند و آمادهٔ اعزام به سوی اهداف خود. در ۲۷ اکتبر، یک زیردریایی شوروی با این گمان که جنگ پیشاپیش آغاز شده است، بسیار به شلیک یک اژدر هسته‌ای نزدیک شد – و تنها خودداری یک افسر، به نام واسیلی آرخیپوف، از موافقت با حمله بود که مانع از شلیک آن شد.۱۲ در جایی دیگر، پرواز تصادفی یک هواپیمای جاسوسی ایالات متحده بر فراز قلمرو روسیه نزدیک بود به درگیری مستقیم میان هواپیماهای روسی و آمریکایی بینجامد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-44',
    enId: 'l3-en-44',
    faId: 'l3-fa-44',
    index: 44,
    sourcePage: 8,
    english:
      'There was huge international concern at the rapid escalation of events, and widespread fear that nuclear war was imminent. But behind the scenes, Kennedy and Khrushchev had exchanged a series of frank and at times emotionally charged letters stating their respective cases.13 Khrushchev then agreed to the removal of Russian missiles from Cuba. Less well publicized was the fact that Kennedy agreed to remove the US missiles from Turkey. By the end of October, the crisis had been defused.',
    rawPersian:
      'نگرانی بین‌المللیِ عظیمی از تشدید سریع رویدادها وجود داشت و ترس فراگیری حاکم بود که جنگ هسته‌ای قریب‌الوقوع است. اما در پشت صحنه، کندی و خروشچف رشته‌ای از نامه‌های صریح و گاه سرشار از بار عاطفی را ردوبدل کرده و مواضع خود را در آن‌ها شرح داده بودند.۱۳ خروشچف سپس با برچیدن موشک‌های روسی از کوبا موافقت کرد. واقعیتی که کمتر در سطح عمومی بازتاب یافت این بود که کندی نیز موافقت کرد موشک‌های ایالات متحده را از ترکیه برچیند. تا پایان ماه اکتبر، فتیلهٔ بحران کشیده و خنثی شده بود.',
    editedPersian:
      'نگرانی بین‌المللیِ عظیمی از تشدید سریع رویدادها وجود داشت و ترس فراگیری حاکم بود که جنگ هسته‌ای قریب‌الوقوع است. اما در پشت صحنه، کندی و خروشچف رشته‌ای از نامه‌های صریح و گاه سرشار از بار عاطفی را ردوبدل کرده و مواضع خود را در آن‌ها شرح داده بودند.۱۳ خروشچف سپس با برچیدن موشک‌های روسی از کوبا موافقت کرد. واقعیتی که کمتر در سطح عمومی بازتاب یافت این بود که کندی نیز موافقت کرد موشک‌های ایالات متحده را از ترکیه برچیند. تا پایان ماه اکتبر، فتیلهٔ بحران کشیده و خنثی شده بود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-45',
    enId: 'l3-en-45',
    faId: 'l3-fa-45',
    index: 45,
    sourcePage: 8,
    english:
      'You should by now see how the missile crisis can be interpreted as a Game of Chicken. For Kennedy in October 1962, driving straight meant continuing with the blockade and pursuing a military response if needed; jumping clear meant compromise. For Khrushchev, driving straight meant maintaining missiles in Cuba and defending Cuba in the case of US military intervention.',
    rawPersian:
      'اکنون دیگر باید ببینید که چگونه می‌توان بحران موشکی را به‌صورت یک بازی بزدل تفسیر کرد. برای کندی در اکتبر ۱۹۶۲، مستقیم راندن به معنای ادامه دادن محاصرهٔ دریایی و پیگیری واکنش نظامی در صورت لزوم بود؛ و بیرون پریدن به معنای مصالحه و سازش بود. برای خروشچف، مستقیم راندن به معنای نگه داشتن موشک‌ها در کوبا و دفاع از کوبا در صورت مداخلهٔ نظامی ایالات متحده بود.',
    editedPersian:
      'اکنون دیگر باید ببینید که چگونه می‌توان بحران موشکی را به‌صورت یک بازی بزدل تفسیر کرد. برای کندی در اکتبر ۱۹۶۲، مستقیم راندن به معنای ادامه دادن محاصرهٔ دریایی و پیگیری واکنش نظامی در صورت لزوم بود؛ و بیرون پریدن به معنای مصالحه و سازش بود. برای خروشچف، مستقیم راندن به معنای نگه داشتن موشک‌ها در کوبا و دفاع از کوبا در صورت مداخلهٔ نظامی ایالات متحده بود.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-46',
    enId: 'l3-en-46',
    faId: 'l3-fa-46',
    index: 46,
    sourcePage: 8,
    english:
      'The public declarations by Kennedy on 22 October, and the response by the Kremlin, were classic signalling/commitment manoeuvres. If Kennedy believed that Khrushchev would avoid the worst-case scenario, then his public statement would help him steer the outcome to the Nash equilibrium in which the US drove straight while the USSR jumped clear. And indeed, this is what the outcome appeared to be: Khrushchev, it seemed, had blinked first. But in fact, Kennedy had also made concessions, promising to remove missiles from Turkey in response to the removal of Russian missiles from Cuba. Both sides acted to de-escalate the crisis - it seems they both jumped clear.',
    rawPersian:
      'اعلامیه‌های علنی کندی در ۲۲ اکتبر و واکنش کرملین، مانورهای کلاسیکِ علامت‌دهی/تعهد بودند. اگر کندی باور داشت که خروشچف از بدترین سناریوی ممکن پرهیز خواهد کرد، آنگاه بیانیهٔ علنی‌اش به او کمک می‌کرد تا پیامد ماجرا را به سوی آن تعادل نشی هدایت کند که در آن ایالات متحده مستقیم می‌راند در حالی که اتحاد جماهیر شوروی بیرون می‌پرید. و در واقع، ظاهر امر نیز همین پیامد را نشان می‌داد: چنین به نظر می‌رسید که خروشچف اول جا زده و کوتاه آمده است. اما در حقیقت، کندی نیز امتیازهایی داده و وعده داده بود که در ازای برچیده شدن موشک‌های روسی از کوبا، موشک‌ها را از ترکیه برچیند. هر دو طرف برای تنش‌زدایی از بحران دست به عمل زدند – به نظر می‌رسد که هر دوی آن‌ها بیرون پریدند.',
    editedPersian:
      'اعلامیه‌های علنی کندی در ۲۲ اکتبر و واکنش کرملین، مانورهای کلاسیکِ علامت‌دهی/تعهد بودند. اگر کندی باور داشت که خروشچف از بدترین سناریوی ممکن پرهیز خواهد کرد، آنگاه بیانیهٔ علنی‌اش به او کمک می‌کرد تا پیامد ماجرا را به سوی آن تعادل نشی هدایت کند که در آن ایالات متحده مستقیم می‌راند در حالی که اتحاد جماهیر شوروی بیرون می‌پرید. و در واقع، ظاهر امر نیز همین پیامد را نشان می‌داد: چنین به نظر می‌رسید که خروشچف اول جا زده و کوتاه آمده است. اما در حقیقت، کندی نیز امتیازهایی داده و وعده داده بود که در ازای برچیده شدن موشک‌های روسی از کوبا، موشک‌ها را از ترکیه برچیند. هر دو طرف برای تنش‌زدایی از بحران دست به عمل زدند – به نظر می‌رسد که هر دوی آن‌ها بیرون پریدند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-47',
    enId: 'l3-en-47',
    faId: 'l3-fa-47',
    index: 47,
    sourcePage: 9,
    english:
      "Many game theorists have studied the Cuban Missile Crisis over the past six decades, and, while the account I give above is probably the simplest and most intuitive, it is by no means the only one. Although game theory requires us to abstract away irrelevant details, a common mistake in game-theoretic analysis is to oversimplify things, and one doesn't have to look very far to see some gross simplifications in the analysis here: both protagonists were playing a complex game on a global stage, with a considerable degree of uncertainty on both sides about the possible actions of the other. But nevertheless, even this simple analysis of the crisis as a Game of Chicken helps us to understand the structure of the problem that Kennedy and Khrushchev faced - and to be even more thankful that they managed to avoid a devastating escalation.",
    rawPersian:
      'بسیاری از نظریه‌پردازان بازی‌ها در طول شش دههٔ گذشته بحران موشکی کوبا را مطالعه کرده‌اند، و هرچند روایتی که من در بالا به دست دادم احتمالاً ساده‌ترین و شهودی‌ترین آن‌هاست، اما به هیچ روی تنها تحلیل موجود نیست. گرچه نظریهٔ بازی‌ها از ما می‌خواهد جزئیات بی‌ربط را کنار بگذاریم و انتزاع کنیم، اما یکی از خطاهای رایج در تحلیل‌های مبتنی بر نظریهٔ بازی‌ها ساده‌سازیِ بیش از حد امور است، و نیازی نیست راه دوری برویم تا ساده‌سازی‌های فاحشی را در تحلیل بالا ببینیم: هر دو بازیگر اصلی سرگرم انجام بازی پیچیده‌ای در صحنه‌ای جهانی بودند، همراه با درجهٔ قابل توجهی از عدم قطعیت در هر دو سو دربارهٔ اقدامات ممکنِ طرف مقابل. با وجود این، حتی همین تحلیل ساده از بحران به‌عنوان یک بازی بزدل نیز به ما کمک می‌کند تا ساختار مسئله‌ای را که کندی و خروشچف با آن روبه‌رو بودند درک کنیم – و بیش از پیش شکرگزار باشیم که آن‌ها توانستند از یک تشدید تنشِ ویرانگر پرهیز کنند.',
    editedPersian:
      'بسیاری از نظریه‌پردازان بازی‌ها در طول شش دههٔ گذشته بحران موشکی کوبا را مطالعه کرده‌اند، و هرچند روایتی که من در بالا به دست دادم احتمالاً ساده‌ترین و شهودی‌ترین آن‌هاست، اما به هیچ روی تنها تحلیل موجود نیست. گرچه نظریهٔ بازی‌ها از ما می‌خواهد جزئیات بی‌ربط را کنار بگذاریم و انتزاع کنیم، اما یکی از خطاهای رایج در تحلیل‌های مبتنی بر نظریهٔ بازی‌ها ساده‌سازیِ بیش از حد امور است، و نیازی نیست راه دوری برویم تا ساده‌سازی‌های فاحشی را در تحلیل بالا ببینیم: هر دو بازیگر اصلی سرگرم انجام بازی پیچیده‌ای در صحنه‌ای جهانی بودند، همراه با درجهٔ قابل توجهی از عدم قطعیت در هر دو سو دربارهٔ اقدامات ممکنِ طرف مقابل. با وجود این، حتی همین تحلیل ساده از بحران به‌عنوان یک بازی بزدل نیز به ما کمک می‌کند تا ساختار مسئله‌ای را که کندی و خروشچف با آن روبه‌رو بودند درک کنیم – و بیش از پیش شکرگزار باشیم که آن‌ها توانستند از یک تشدید تنشِ ویرانگر پرهیز کنند.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-48',
    enId: 'l3-en-48',
    faId: 'l3-fa-48',
    index: 48,
    sourcePage: 9,
    english:
      "History abounds with Games of Chicken: sometimes the players got to a Nash equilibrium, sometimes they didn't. In the UK, we have been living a Game of Chicken since 23 June 2016. On that day, after many years of protracted political infighting and four months of intense, bitter campaigning, the United Kingdom narrowly voted in favour of leaving the European Union: Brexit. The result caught the UK's mainstream political parties by surprise and sent shockwaves around the globe. In the UK, political turmoil followed, which continues even at the time of writing. When it ultimately became clear that the UK's ruling party was committed to respecting the outcome of the vote, attention quickly turned to what sort of relationship the UK might have with the EU after departure. The UK, it seemed, sought to be free of EU legislation (for example around the right to freedom of movement) while at the same time maintaining access to the EU's markets as before. The EU, not surprisingly, sought a very different outcome. Possibly fearful of setting a precedent for other member states who might seek to leave the EU on overly favourable terms, the political talk in Brussels was of a hardline stance: access to EU markets must be strictly on EU terms. The worst outcome, for both sides in the Brexit game, would be if neither side made concessions, with the result of no deal (or a very poor deal) for both parties. This would be a disaster for German car manufacturers, French winemakers, and Italian cheesemakers, who might lose favourable access to UK markets, while at the same time preventing the UK from selling our warm beer and umbrellas to the EU.",
    rawPersian:
      'تاریخ سرشار از بازی‌های بزدل است: گاهی بازیکنان به یک تعادل نش رسیدند و گاهی نرسیدند. در بریتانیا، ما از ۲۳ ژوئن ۲۰۱۶ در حال زیستن در یک بازی بزدل بوده‌ایم. در آن روز، پس از سال‌ها کشمکش‌های درونیِ فرسایشیِ سیاسی و چهار ماه کارزار انتخاباتیِ فشرده و تلخ، بریتانیا با اختلافی اندک به خروج از اتحادیهٔ اروپا رأی داد: برگزیت. این نتیجه احزاب سیاسیِ جریان اصلیِ بریتانیا را غافلگیر کرد و امواج شوک را به سراسر جهان فرستاد. در بریتانیا تلاطم سیاسی به دنبال آمد که حتی در زمان نگارش این کتاب نیز همچنان ادامه دارد. هنگامی که سرانجام روشن شد حزب حاکم بریتانیا به احترام گذاشتن به نتیجهٔ رأی‌گیری متعهد است، توجه‌ها به‌سرعت به این معطوف شد که بریتانیا پس از خروج چه نوع رابطه‌ای ممکن است با اتحادیهٔ اروپا داشته باشد. چنین به نظر می‌رسید که بریتانیا در پی رهایی از قوانین اتحادیهٔ اروپا (برای نمونه پیرامون حق آزادی جابه‌جایی افراد) و در همان حال حفظ دسترسی به بازارهای اتحادیهٔ اروپا همچون گذشته است. اتحادیهٔ اروپا، همان‌طور که جای تعجب نداشت، خواهان پیامد بسیار متفاوتی بود. در بروکسل، شاید از بیم ایجاد رویه‌ای برای سایر کشورهای عضو که ممکن بود بخواهند با شرایطی بیش از حد مطلوب از اتحادیهٔ اروپا خارج شوند، سخن سیاسی از موضعی سرسختانه در میان بود: دسترسی به بازارهای اتحادیهٔ اروپا باید اکیداً بر پایهٔ شروط اتحادیهٔ اروپا باشد. بدترین پیامد برای هر دو طرف در بازی برگزیت زمانی رخ می‌داد که هیچ‌یک از دو طرف امتیازی ندهد و نتیجهٔ آن خروج بدون توافق (یا توافقی بسیار ضعیف) برای هر دو طرف باشد. این امر برای خودروسازان آلمانی، شراب‌سازان فرانسوی، و پنیرسازان ایتالیایی که ممکن بود دسترسی مطلوب خود به بازارهای بریتانیا را از دست بدهند فاجعه‌ای می‌بود، و در همان حال دست بریتانیا را نیز از فروختن آبجوی گرم و چترهایمان به اتحادیهٔ اروپا کوتاه می‌کرد.',
    editedPersian:
      'تاریخ سرشار از بازی‌های بزدل است: گاهی بازیکنان به یک تعادل نش رسیدند و گاهی نرسیدند. در بریتانیا، ما از ۲۳ ژوئن ۲۰۱۶ در حال زیستن در یک بازی بزدل بوده‌ایم. در آن روز، پس از سال‌ها کشمکش‌های درونیِ فرسایشیِ سیاسی و چهار ماه کارزار انتخاباتیِ فشرده و تلخ، بریتانیا با اختلافی اندک به خروج از اتحادیهٔ اروپا رأی داد: برگزیت. این نتیجه احزاب سیاسیِ جریان اصلیِ بریتانیا را غافلگیر کرد و امواج شوک را به سراسر جهان فرستاد. در بریتانیا تلاطم سیاسی به دنبال آمد که حتی در زمان نگارش این کتاب نیز همچنان ادامه دارد. هنگامی که سرانجام روشن شد حزب حاکم بریتانیا به احترام گذاشتن به نتیجهٔ رأی‌گیری متعهد است، توجه‌ها به‌سرعت به این معطوف شد که بریتانیا پس از خروج چه نوع رابطه‌ای ممکن است با اتحادیهٔ اروپا داشته باشد. چنین به نظر می‌رسید که بریتانیا در پی رهایی از قوانین اتحادیهٔ اروپا (برای نمونه پیرامون حق آزادی جابه‌جایی افراد) و در همان حال حفظ دسترسی به بازارهای اتحادیهٔ اروپا همچون گذشته است. اتحادیهٔ اروپا، همان‌طور که جای تعجب نداشت، خواهان پیامد بسیار متفاوتی بود. در بروکسل، شاید از بیم ایجاد رویه‌ای برای سایر کشورهای عضو که ممکن بود بخواهند با شرایطی بیش از حد مطلوب از اتحادیهٔ اروپا خارج شوند، سخن سیاسی از موضعی سرسختانه در میان بود: دسترسی به بازارهای اتحادیهٔ اروپا باید اکیداً بر پایهٔ شروط اتحادیهٔ اروپا باشد. بدترین پیامد برای هر دو طرف در بازی برگزیت زمانی رخ می‌داد که هیچ‌یک از دو طرف امتیازی ندهد و نتیجهٔ آن خروج بدون توافق (یا توافقی بسیار ضعیف) برای هر دو طرف باشد. این امر برای خودروسازان آلمانی، شراب‌سازان فرانسوی، و پنیرسازان ایتالیایی که ممکن بود دسترسی مطلوب خود به بازارهای بریتانیا را از دست بدهند فاجعه‌ای می‌بود، و در همان حال دست بریتانیا را نیز از فروختن آبجوی گرم و چترهایمان به اتحادیهٔ اروپا کوتاه می‌کرد.',
    status: 'edited',
    lastModified: 'Just now',
  },
  {
    id: 'l3-seg-49',
    enId: 'l3-en-49',
    faId: 'l3-fa-49',
    index: 49,
    sourcePage: 10,
    english:
      "The key game theory concept we've seen in this lesson is Nash equilibrium (although we haven't yet seen its full power: that will come in Lesson 5). Nash equilibrium is in many respects the baseline for rational choice in strategic settings. If a game has any Nash equilibria, then the rational outcome of the game must be one of these. For if the outcome was not a Nash equilibrium, then at least one player would regret their choice, and wish they had done something else. The choice that player made could hardly be counted as rational. If we have no 'obvious' choices available to us (dominant strategies, for example), then the next step is to look for Nash equilibria. But, as the Game of Chicken demonstrates, the presence of Nash equilibria may not solve your problem. If there is more than one, then you face an equilibrium selection problem, and if you resolve such a problem incorrectly, then you may follow poor Buzz over the metaphorical cliff.",
    rawPersian:
      'مفهوم کلیدیِ نظریهٔ بازی‌ها که در این درس دیدیم تعادل نش است (هرچند هنوز قدرت کامل آن را ندیده‌ایم: این موضوع در درس ۵ خواهد آمد). تعادل نش از بسیاری جهات نقطهٔ مبنا برای انتخاب عقلانی در بسترهای راهبردی است. اگر یک بازی دارای هرگونه تعادل نش باشد، آنگاه پیامد عقلانیِ بازی باید یکی از آن‌ها باشد. زیرا اگر پیامدْ یک تعادل نش نمی‌بود، آنگاه دست‌کم یکی از بازیکنان از انتخاب خود پشیمان می‌شد و آرزو می‌کرد که ای کاش کار دیگری انجام داده بود. انتخابی که آن بازیکن انجام داده به‌دشواری می‌توانست عقلانی به شمار آید. اگر هیچ انتخاب «بدیهی»ای در دسترس ما نباشد (برای نمونه، راهبردهای غالب)، آنگاه گام بعدی جست‌وجو به دنبال تعادل‌های نش است. اما، همان‌طور که بازی بزدل نشان می‌دهد، وجود تعادل‌های نش ممکن است مشکل شما را حل نکند. اگر بیش از یک تعادل نش وجود داشته باشد، آنگاه با مسئلهٔ انتخاب تعادل روبه‌رو هستید، و اگر چنین مسئله‌ای را به نادرستی حل‌وفصل کنید، آنگاه چه‌بسا به سرنوشت بازِ بیچاره دچار شوید و به دنبال او از لبهٔ پرتگاه استعاری سقوط کنید.',
    editedPersian:
      'مفهوم کلیدیِ نظریهٔ بازی‌ها که در این درس دیدیم تعادل نش است (هرچند هنوز قدرت کامل آن را ندیده‌ایم: این موضوع در درس ۵ خواهد آمد). تعادل نش از بسیاری جهات نقطهٔ مبنا برای انتخاب عقلانی در بسترهای راهبردی است. اگر یک بازی دارای هرگونه تعادل نش باشد، آنگاه پیامد عقلانیِ بازی باید یکی از آن‌ها باشد. زیرا اگر پیامدْ یک تعادل نش نمی‌بود، آنگاه دست‌کم یکی از بازیکنان از انتخاب خود پشیمان می‌شد و آرزو می‌کرد که ای کاش کار دیگری انجام داده بود. انتخابی که آن بازیکن انجام داده به‌دشواری می‌توانست عقلانی به شمار آید. اگر هیچ انتخاب «بدیهی»ای در دسترس ما نباشد (برای نمونه، راهبردهای غالب)، آنگاه گام بعدی جست‌وجو به دنبال تعادل‌های نش است. اما، همان‌طور که بازی بزدل نشان می‌دهد، وجود تعادل‌های نش ممکن است مشکل شما را حل نکند. اگر بیش از یک تعادل نش وجود داشته باشد، آنگاه با مسئلهٔ انتخاب تعادل روبه‌رو هستید، و اگر چنین مسئله‌ای را به نادرستی حل‌وفصل کنید، آنگاه چه‌بسا به سرنوشت بازِ بیچاره دچار شوید و به دنبال او از لبهٔ پرتگاه استعاری سقوط کنید.',
    status: 'edited',
    lastModified: 'Just now',
  },
];

export const INITIAL_SEGMENTS = LESSON_2_SEGMENTS;
export { LESSON_2_SEGMENTS, LESSON_3_SEGMENTS };

export const INITIAL_GLOSSARY = [
  { id: 'g-1', en: "Prisoner's Dilemma", fa: 'معمای زندانی', category: 'Game Theory' },
  { id: 'g-2', en: 'game theory', fa: 'نظریهٔ بازی‌ها', category: 'Core' },
  { id: 'g-3', en: 'dominant strategy', fa: 'راهبرد غالب', category: 'Core' },
  { id: 'g-4', en: 'Nash equilibrium', fa: 'تعادل نش', category: 'Lesson 3' },
  { id: 'g-5', en: 'Game of Chicken', fa: 'بازی بزدل', category: 'Lesson 3' },
  { id: 'g-6', en: 'beneficial deviation', fa: 'انحراف سودمند', category: 'Lesson 3' },
  { id: 'g-7', en: 'Tragedy of the Commons', fa: 'تراژدی منابع مشترک', category: 'Environment' },
  { id: 'g-8', en: "sucker's payoff", fa: 'بازدهی ساده‌لوح', category: 'Idiom' },
];

export const INITIAL_COMMENTS = [
  {
    id: 'c-1',
    segmentId: 'seg-10',
    author: 'Re',
    authorFull: 'Reviewer',
    avatarBg: '#2e5b4f',
    text: 'Both Lesson 2 (37 segments) and Lesson 3 (Game of Chicken & Nash Equilibrium) are supported with 1-to-1 PDF/Word paragraph & bullet alignment.',
    timestamp: '13ms ago',
    statusTag: null,
    replies: [],
  },
  {
    id: 'c-2',
    segmentId: 'seg-12',
    author: 'MJ',
    authorFull: 'Reviewer',
    avatarBg: '#5e3a4e',
    text: 'Edited',
    timestamp: '13ms ago',
    statusTag: 'Active discussion',
    replies: [],
  },
];

