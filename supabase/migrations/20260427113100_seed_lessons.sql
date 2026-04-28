insert into public.lessons (
  id,
  chapter_number,
  title,
  slug,
  description,
  goal,
  content,
  key_takeaways,
  real_life_example,
  estimated_minutes,
  points_reward,
  is_active
)
values
  ('ch1', 1, 'Understanding Money and Financial Discipline', 'money-mindset', 'Money mindset and discipline fundamentals.', 'Understand that money is a tool for planning and growth.', 'Money is a tool. Financial discipline starts with spending less than you earn.', array['Money must be managed.', 'Discipline beats high income.'], 'Saver behavior outperforms overspending.', 12, 20, true),
  ('ch2', 2, 'The Power of Saving', 'saving-basics', 'Build savings-first habits.', 'Learn how regular saving creates security and opportunity.', 'Save first and spend later. Income - Saving = Expense.', array['Save first.', 'Small savings compound.'], 'Monthly savings create long-term security.', 10, 20, true),
  ('ch3', 3, 'How to Make a Monthly Budget', 'budgeting', 'Practical monthly budgeting rules.', 'Control spending with a simple plan.', 'Use a 50/30/20 guideline for needs, wants, and savings.', array['Budgeting gives control.', 'Plan savings intentionally.'], 'Budget splits improve consistency.', 11, 20, true),
  ('ch4', 4, 'Understanding Good Debt and Bad Debt', 'debt-loans', 'Use credit productively.', 'Differentiate productive debt from harmful debt.', 'Borrow for value creation, not status consumption.', array['Not all debt is bad.', 'Check affordability and interest.'], 'Productive loans can improve income.', 12, 20, true),
  ('ch5', 5, 'Using Banks and Financial Institutions Safely', 'banking', 'Banking and digital safety essentials.', 'Use institutions responsibly and securely.', 'Protect OTP and PIN, keep records, review statements.', array['Records build trust.', 'Protect account credentials.'], 'Documented history supports future eligibility.', 10, 20, true),
  ('ch6', 6, 'Mobile Banking, Wallets, and Digital Payments', 'digital-finance', 'Safe digital transaction habits.', 'Use digital finance safely and efficiently.', 'Verify recipient and avoid unknown links.', array['Verify before sending.', 'Keep digital receipts.'], 'Receiver verification prevents transfer errors.', 11, 20, true),
  ('ch7', 7, 'What is Investment?', 'investment-basics', 'Foundations of risk-aware investing.', 'Distinguish saving from investing.', 'Every investment has risk; understand before committing.', array['Investing grows money.', 'Avoid blind quick-profit promises.'], 'Learning first improves long-term outcomes.', 12, 20, true),
  ('ch8', 8, 'Protecting Yourself from Financial Scams', 'risk-scams', 'Fraud recognition and prevention.', 'Recognize common scam patterns.', 'High guaranteed returns and urgency are major red flags.', array['No investment is risk-free.', 'Verify before action.'], 'Registration checks prevent avoidable losses.', 11, 20, true),
  ('ch9', 9, 'How to Think Like a Small Business Owner', 'business-thinking', 'Business fundamentals for members.', 'Use basic profit thinking and tracking.', 'Profit equals revenue minus cost; track spending.', array['Solve customer problems.', 'Track costs and reinvest.'], 'Expense control improves business margins.', 10, 20, true),
  ('ch10', 10, 'Building Long-Term Financial Strength', 'wealth-building', 'Long-term wealth system design.', 'Follow a disciplined wealth-building path.', 'Earn, save, invest, insure, and think long-term.', array['Wealth takes patience.', 'Skills are investable assets.'], 'Consistency beats short-term excitement.', 12, 20, true)
on conflict (id) do update set
  chapter_number = excluded.chapter_number,
  title = excluded.title,
  slug = excluded.slug,
  description = excluded.description,
  goal = excluded.goal,
  content = excluded.content,
  key_takeaways = excluded.key_takeaways,
  real_life_example = excluded.real_life_example,
  estimated_minutes = excluded.estimated_minutes,
  points_reward = excluded.points_reward,
  is_active = excluded.is_active;
